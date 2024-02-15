'use client';
import { COLORS } from '@/asset/style';
import Selector from '@/components/Selector';
import ButtonBack from '@/components/buttons/ButtonBack';
import ButtonNomal from '@/components/buttons/ButtonNomal';
import InputText from '@/components/inputs/InputText';
import ImageLayout from '@/components/layout/ImageLayout';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { MEGA_BYTE } from '@/constant/NUMBER';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { IMAGE_TYPE } from '@/constant/TYPE';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { commaInput, resultCommaRemove } from '@/utils/numberComma';
import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

type CacheListType = InfinityFetchingType | { message: string; data: ProductNewListType[] };

const compareValue = (pre: { [key: string]: any }[], post: { [key: string]: any }[]): boolean => {
  if (pre.length !== post.length + 1) return false;

  for (const [index, preObj] of pre.entries()) {
    if (index !== 0) {
      const postObj = post[index - 1];

      for (const key in preObj) {
        if (key !== 'value' && key !== '_id') {
          if (preObj[key] !== postObj[key]) return false;
        }
      }
    }
  }
  return true;
};

const ProductEdit = ({ params }: { params: { id: string } }) => {
  const { openPopup } = usePopup();
  const queryClient = useQueryClient();
  const router = useRouter();
  const search = useSearchParams();
  const { id } = params;
  const category_idx = Number(search.get('category_idx'));
  const type = Number(search.get('type'));

  // 메뉴리스트 패칭
  const {
    data: menuList,
    isError,
    isLoading,
  } = useQueryInstance<{ data: MenuCategoryType[] }, { label: string; value: number }[]>({
    queryKey: [QUERY_KEY.MENU_LIST],
    apiEndPoint: USE_QUERY_POINT.MENU,
    apiMethod: 'get',
    selectFn: (data) => {
      // 셀렉터에 맞게 변형
      return data.data?.map(({ category_idx, ...rest }) => ({
        ...rest,
        value: category_idx,
      }));
    },
  });

  // 사용자입력데이터 저장 ----------
  // 카테고리 핸들러
  const [menuCategoryValue, setMenuCategoryValue] = useState<string | number | undefined>(0);

  const menuCategorySelectorHandler = (e: SelectChangeEvent<string | number>) => {
    const value = e.target.value;
    setMenuCategoryValue(value);
  };

  // 인풋 값
  const [blobURL, setBlobURL] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [pdName, setPdName] = useState<string>('');
  const priceRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  // 수정 비교용 데이터 저장
  const [preData, setPreData] = useState<ProductNewListType | null>(null);

  // 상품이름 핸들러
  const pdNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value?.length <= 24) {
      setPdName(value);
    }
  };

  // 인풋 제어용
  const inputFileRef = useRef<HTMLInputElement>(null);

  // 상품수정 API
  const { mutate: editProductAPI } = useMutationInstance<undefined, undefined, FormData>({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.PRODUCT_EDIT,
    apiMultipartPost: true,
    onErrorFn: (err: any) => {
      console.error(err);
      if (err.response.status === 400)
        return openPopup({ title: '오류', content: err.response.data.message });
      openPopup({ title: '오류', content: '다시 시도해주세요.' });
    },
    onSuccessFn: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.PRODUCT_LIST] });
      queryClient.removeQueries({ queryKey: [QUERY_KEY.MENU_PRODUCT_LIST] });
      return router.back();
    },
  });

  // 이미지 관련 ---
  const inputClickHandler = () => {
    inputFileRef.current?.click();
  };

  const inputFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!Object.values(IMAGE_TYPE).some((el) => el === file.type)) {
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
          setBlobURL(null);
          return openPopup({ title: '파일 오류', content: '사진 파일 형식이 맞지 않습니다.' });
        }
      }

      if (file.size > MEGA_BYTE.THREE) {
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
          setBlobURL(null);
          return openPopup({ title: '파일 오류', content: '사진 크기 3MB 이하로 등록해주세요.' });
        }
      }

      const blob = URL.createObjectURL(file);
      setImgFile(file);
      setBlobURL(blob);
    }
  };

  // 옵션항목 ----------
  const [option, setOption] = useState<Array<{ label: string; value: number; price: string }>>([]);

  // 옵션추가핸들
  const optionAddHandler = () => {
    setOption((cur) => {
      let copy = [...cur];
      copy.push({ label: '', value: cur.length + 1, price: '' });
      return copy;
    });
  };

  // 옵션제거핸들
  const optionRemoveHandler = (index: number) => {
    setOption((cur) => {
      if (cur.length === 0) return cur;

      let copy = [...cur];
      copy.splice(index, 1);
      return copy.map((el, index) => ({ ...el, value: index + 1 }));
    });
  };

  // 옵션 값 각 필드로 입력
  // 옵션명-
  const optionNameIntoKey = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value?.length <= 14) {
      setOption((cur) => {
        let copy = [...cur];
        copy[index] = { ...cur[index], label: value };
        return copy;
      });
    }
  };
  // 추가가격-
  const optionPriceRef = useRef<HTMLInputElement>(null);
  const optionPriceIntoKey = (value: string, index: number) => {
    setOption((cur) => {
      let copy = [...cur];
      copy[index] = { ...cur[index], price: value };
      return copy;
    });
  };

  // 캐쉬에서 데이터가져오기
  const cacheList: CacheListType | undefined = queryClient.getQueryData(
    !category_idx ? [QUERY_KEY.PRODUCT_LIST] : [QUERY_KEY.MENU_PRODUCT_LIST, String(category_idx)],
  );

  // 수정용 세팅 -----------
  useEffect(() => {
    if (!category_idx && cacheList && 'pageParams' in cacheList) {
      const list =
        cacheList && cacheList?.pageParams?.length === 1 && menuList && menuList?.length > 0
          ? cacheList.pages[0].data.data
          : cacheList?.pages.map((el) => [...el.data.data]).flat();
      const findProduct: ProductNewListType | undefined = list?.find((el) => el._id === id);

      // 가격은 String으로 변환이 필요
      if (findProduct && priceRef.current && descRef.current) {
        setPreData(findProduct);
        setBlobURL(findProduct?.img_url);
        setPdName(findProduct?.pd_name);
        priceRef.current.value = String(findProduct?.price);
        descRef.current.value = findProduct?.desc;
        setMenuCategoryValue(findProduct?.category_idx);
        setOption((cur: { label: string; value: number; price: string }[]) => {
          let copy = [...cur];
          copy = findProduct?.option_arr
            .map((el) => ({ ...el, price: String(el.price) }))
            .filter((_, index) => index !== 0);
          return copy;
        });
      }
    }

    // 메뉴판에서 수정 넘어올 때
    if (category_idx && cacheList && 'data' in cacheList) {
      const findProduct = cacheList.data.find((el) => el._id === id);
      if (findProduct && priceRef.current && descRef.current) {
        setPreData(findProduct);
        setBlobURL(findProduct?.img_url);
        setPdName(findProduct?.pd_name);
        priceRef.current.value = String(findProduct?.price);
        descRef.current.value = findProduct?.desc;
        setMenuCategoryValue(findProduct?.category_idx);
        setOption((cur: { label: string; value: number; price: string }[]) => {
          let copy = [...cur];
          copy = findProduct?.option_arr
            .map((el) => ({ ...el, price: String(el.price) }))
            .filter((_, index) => index !== 0);
          return copy;
        });
      }
    }
  }, [menuList, cacheList, category_idx]);

  // 최종 등록 ---
  const submitHandler = async () => {
    if (!blobURL && !imgFile)
      return openPopup({ title: '오류', content: '대표사진을 업로드해주세요.' });

    if (!pdName) return openPopup({ title: '오류', content: '상품명을 입력해주세요.' });

    if (!priceRef.current?.value)
      return openPopup({ title: '오류', content: '가격을 입력해주세요.' });

    if (!descRef.current?.value)
      return openPopup({ title: '오류', content: '상품설명을 입력해주세요.' });

    if (!menuCategoryValue)
      return openPopup({ title: '오류', content: '메뉴판 카테고리를 선택해주세요.' });

    // 서버 전송을 위한 가공
    const price = resultCommaRemove(priceRef.current?.value);
    const desc = descRef.current?.value;
    const replacePrice = option.map((el) => ({
      ...el,
      price: !el.price ? 0 : resultCommaRemove(el.price),
    }));
    // 옵션변경사항체크
    const compare = compareValue(preData?.option_arr ? preData?.option_arr : [], replacePrice);

    if (
      preData?.pd_name === pdName &&
      preData?.price === price &&
      preData?.category_idx === menuCategoryValue &&
      !imgFile &&
      compare &&
      preData?.desc === desc
    )
      return openPopup({ title: '오류', content: '변경사항이 없습니다.' });

    if (option.length !== 0) {
      // 옵션 검증
      const searchFalse = option.some((el) => !el.label);

      if (searchFalse)
        return openPopup({
          title: '오류',
          content: `옵션명을 모두 입력해주세요.`,
        });

      const formData = new FormData();
      formData.append('img_file', imgFile ? imgFile : '');
      formData.append('pd_name', pdName !== preData?.pd_name ? pdName : '');
      formData.append('price', price !== preData?.price ? String(price) : '');
      formData.append('desc', desc !== preData?.desc ? desc : '');
      formData.append(
        'category_idx',
        menuCategoryValue !== preData?.category_idx ? String(menuCategoryValue) : '',
      );
      formData.append('option_arr', !compare ? JSON.stringify(replacePrice) : '');
      formData.append('id', preData?._id ? preData?._id : '');
      formData.append('pre_img_url', preData?.img_url && imgFile ? preData?.img_url : '');
      formData.append('pre_pd_name', preData?.pd_name && imgFile ? preData?.pd_name : '');

      return editProductAPI({ apiBody: formData });
    }

    const formData = new FormData();
    formData.append('img_file', imgFile ? imgFile : '');
    formData.append('pd_name', pdName !== preData?.pd_name ? pdName : '');
    formData.append('price', price !== preData?.price ? String(price) : '');
    formData.append('desc', desc !== preData?.desc ? desc : '');
    formData.append(
      'category_idx',
      menuCategoryValue !== preData?.category_idx ? String(menuCategoryValue) : '',
    );
    formData.append('id', preData?._id ? preData?._id : '');
    formData.append('option_arr', !compare ? JSON.stringify(replacePrice) : '');
    formData.append('pre_img_url', preData?.img_url && imgFile ? preData?.img_url : '');
    formData.append('pre_pd_name', preData?.pd_name && imgFile ? preData?.pd_name : '');

    return editProductAPI({ apiBody: formData });
  };

  if (isError)
    return (
      <Typography textAlign="center" color="text.secondary">
        Fetching Error
      </Typography>
    );

  if (isLoading)
    return (
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', padding: '100px 20px' }}>
        Loading ...
      </Typography>
    );

  if (!cacheList)
    return (
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', padding: '100px 20px' }}>
        - 상품정보 없음 -<br />
        상품목록에서 상품을 선택해주세요.
      </Typography>
    );

  if (menuList && menuList?.length <= 0 && !isLoading)
    return (
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', padding: '100px 20px' }}>
        - 메뉴 카테고리 오류 -<br />
        메뉴판 카테고리를 등록해주세요.
      </Typography>
    );

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        top: '50%',
        transform: 'translateY(-50%)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '25px',
        color: 'white',
        maxWidth: '700px',
        padding: { xs: '30px', sm: '0 50px' },
        margin: 'auto',
      }}
    >
      {/* // ------ 이미지 라인 ----- */}
      <Box sx={{ width: { xs: '70%', sm: '50%' }, cursor: 'pointer' }} onClick={inputClickHandler}>
        <ImageLayout
          priority={true}
          src={!blobURL ? '/img/ready_file.png' : blobURL}
          innerWidth={!blobURL ? '50%' : '100%'}
          innerLeft={!blobURL ? '50%' : '0'}
          innerTranslate={!blobURL ? 'translate(-50%, -50%)' : 'translate(0, -50%)'}
          alt="등록상품이미지"
        />
        <Typography color="text.disabled" fontSize="15px" textAlign="center" marginTop={1}>
          1:1 비율 <br />
          <span style={{ fontSize: '13px', fontWeight: '600' }}>jpg, jpeg, png, gif, webp</span>
        </Typography>
      </Box>

      <InputText
        ref={inputFileRef}
        type="file"
        conSx={{ display: 'none' }}
        onChangeEvent={inputFileHandler}
      />
      {/* // ------- 이미지 끝 --- */}

      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Selector
          optionArr={menuList || []}
          value={menuCategoryValue}
          width="110%"
          textAlign="center"
          xsFontSize="14px"
          mdFontSize="18px"
          padding="0"
          boxPadding="0"
          subText="메뉴판 카테고리 선택"
          subSx={{ textAlign: 'center', color: 'text.disabled' }}
          onChangeEvent={menuCategorySelectorHandler}
        />
      )}

      <InputText
        value={pdName}
        placeholderText="띄어쓰기 포함 최대 24자"
        title="상품명"
        textSx={{ fontSize: '20px', color: 'text.secondary' }}
        labelSx={{ fontSize: '18px' }}
        onChangeEvent={pdNameHandler}
      />

      <InputText
        ref={priceRef}
        title="가격"
        textSx={{ fontSize: '20px', color: 'text.secondary' }}
        labelSx={{ fontSize: '18px' }}
        onChangeEvent={(e) =>
          commaInput(
            e,
            (newValue: string) => {
              priceRef.current ? (priceRef.current.value = newValue) : null;
            },
            priceRef,
          )
        }
      />

      <InputText
        ref={descRef}
        multiline={true}
        title="설명"
        textSx={{ fontSize: '18px', color: 'text.secondary' }}
        labelSx={{ fontSize: '18px' }}
      />

      {/* 옵션 박스 */}
      <Typography sx={{ width: '100%' }}>옵션추가 -</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex_start',
          gap: '10px',
        }}
      >
        <Box sx={{ flex: '0.5' }}>
          <FaPlus size={25} style={{ cursor: 'pointer' }} onClick={optionAddHandler} />
        </Box>
        <Box sx={{ flex: '9.5' }}>
          {option?.map((el, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                gap: '10px',
                marginBottom: '20px',
                paddingBottom: '30px',
                borderBottom: '2px solid' + COLORS.divider,
              }}
            >
              <Box sx={{ flex: '0.25', display: 'flex', alignItems: 'center' }}>
                <FaMinus
                  size={20}
                  style={{ cursor: 'pointer' }}
                  onClick={() => optionRemoveHandler(index)}
                />
              </Box>
              <Box sx={{ flex: '0.25', display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>{el.value}</Typography>
              </Box>
              <Box sx={{ flex: '9.5' }}>
                <InputText
                  title="옵션명"
                  placeholderText="띄어쓰기 포함 최대 14자"
                  value={el.label}
                  textSx={{ fontSize: '18px', color: 'text.secondary' }}
                  labelSx={{ fontSize: '18px' }}
                  conSx={{ marginBottom: '10px' }}
                  onChangeEvent={(e) => optionNameIntoKey(e, index)}
                />
                <InputText
                  ref={optionPriceRef}
                  title="추가가격"
                  placeholderText="숫자만 가능"
                  value={el.price}
                  textSx={{ fontSize: '18px', color: 'text.secondary' }}
                  labelSx={{ fontSize: '18px' }}
                  onChangeEvent={(e) =>
                    commaInput(
                      e,
                      (newValue: string) => {
                        optionPriceIntoKey(newValue, index);
                      },
                      optionPriceRef,
                    )
                  }
                />
                <Typography sx={{ marginTop: '5px', color: 'text.disabled', fontSize: '14px' }}>
                  *가격 미입력시 추가금 0원으로 등록 됨
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right', gap: '10px' }}>
        <Box>
          <ButtonBack />
        </Box>
        <ButtonNomal
          sx={{ fontSize: '15px', fontWeight: '600', padding: '5px' }}
          onClickEvent={submitHandler}
        >
          등록
        </ButtonNomal>
      </Box>
    </Box>
  );
};

export default ProductEdit;
