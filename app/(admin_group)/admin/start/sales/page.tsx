'use client';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ContentBox from '@/components/layout/ContentBox';
import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';
import { After } from '@/asset/After';
import ToTopButton from '@/components/buttons/ToTopButton';
import { Before } from '@/asset/Before';
import { FaRegCheckCircle } from 'react-icons/fa';
import { TbLocationCheck } from 'react-icons/tb';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { GC_TIME } from '@/constant/NUMBER';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { usePopup } from '@/hook/usePopup/usePopup';
import { BiReset } from 'react-icons/bi';

const tableData = [
  { tb_idx: 1, bar: false },
  { tb_idx: 2, bar: false },
  { tb_idx: 3, bar: true },
  { tb_idx: 4, bar: true },
  { tb_idx: 5, bar: true },
];

const generateMenuList = (
  orderData: OrderCardProps[],
  tableData: TableDataProps,
): { menuList: MenuType[] } => {
  const menuFilter = orderData
    .filter((el) => el.tb_idx === tableData.tb_idx && el.complete && !el.pay)
    .map((el) => el.menu)
    .flat()
    .reduce((acc: { [key: string]: MenuType }, item: MenuType) => {
      if (!acc[item._id]) {
        acc[item._id] = { ...item, ea: 0 };
      }
      acc[item._id].ea += item.ea; // ea 합산
      return acc;
    }, {});

  const menuList = Object.values(menuFilter);

  return { menuList };
};

const generateTotalPrice = (menuList: MenuType[]): number => {
  return menuList.reduce((acc, menu) => (acc += menu.price * menu.ea), 0);
};

const Sales = () => {
  const { openPopup } = usePopup();

  // 영업상태 초기설정
  const {
    data: isStart,
    isError: isStartError,
    isLoading: startLoading,
  } = useQueryInstance({
    queryKey: [QUERY_KEY.IS_START],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.START,
  });

  const {
    data: orderListData,
    isError,
    refetch,
  } = useQueryInstance({
    queryKey: [QUERY_KEY.ORDER_LIST],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.ORDER_LIST,
    staleTime: 0,
    gcTime: GC_TIME.DEFAULT,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const { mutate: completeAPI } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.ORDER_COMPLETE,
    onErrorFn: (err: any) => {
      console.error(err);
      if (err.response.status === 400)
        return openPopup({ title: '오류', content: err.response.data.message });
      openPopup({ title: '오류', content: '다시 시도해주세요.' });
    },
    onSuccessFn: () => {
      refetch();
    },
  });

  const { mutate: rollbackAPI } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.ORDER_ROLLBACK,
    onErrorFn: (err: any) => {
      console.error(err);
      if (err.response.status === 400)
        return openPopup({ title: '오류', content: err.response.data.message });
      openPopup({ title: '오류', content: '다시 시도해주세요.' });
    },
    onSuccessFn: () => {
      refetch();
    },
  });

  const { mutate: payAPI } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.ORDER_PAY,
    onErrorFn: (err: any) => {
      console.error(err);
      if (err.response.status === 400)
        return openPopup({ title: '오류', content: err.response.data.message });
      openPopup({ title: '오류', content: '다시 시도해주세요.' });
    },
    onSuccessFn: (response) => {
      openPopup({ title: 'Success', content: response.message });
      refetch();
    },
  });

  //메뉴 탑으로 이동용
  const navTopRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (navTopRef.current) {
      navTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (startLoading) return;

  if (isError || isStartError) return <Box color="text.secondary">Fetching Error</Box>;

  if (!isStart.data && !startLoading)
    return <Box color="text.secondary">영업시작 상태가 아닙니다.</Box>;

  return (
    <Grid
      container
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '30px',
        minHeight: '1650px',
      }}
    >
      <div ref={navTopRef} />
      <Grid xs={12} md={6}>
        <ContentBox
          sx={{
            borderRadius: { xs: '10px', md: '10px 0 0 0' },
            padding: 0,
            bgcolor: '#cba77950',
            border: '1px solid' + COLORS.info,
            marginBottom: { xs: '50px', md: '0' },
            height: '100%',
          }}
        >
          <Typography
            color="text.primary"
            fontWeight={700}
            sx={{
              textAlign: 'center',
              fontSize: '24px',
              bgcolor: COLORS.info,
              borderRadius: { xs: '10px 10px 0 0', md: '10px 0 0 0' },
            }}
          >
            Order
          </Typography>

          <Box
            sx={{ height: { xs: '1000px', md: '100%' }, overflowY: { xs: 'scroll', md: 'auto' } }}
          >
            {orderListData.data?.map(
              (el: OrderCardProps) =>
                !el.complete && (
                  <OrderCard
                    key={el.order_idx}
                    el={el}
                    onClickEvent={() => completeAPI({ apiBody: { order_idx: el.order_idx } })}
                  />
                ),
            )}
          </Box>
        </ContentBox>
      </Grid>
      <Grid xs={12} md={6}>
        <ContentBox
          sx={{
            borderRadius: { xs: '10px', md: '0 10px 0 0' },
            padding: '0',
            height: '100%',
          }}
        >
          <Typography
            fontWeight={700}
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontSize: '24px',
              borderRadius: { xs: '10px 10px 0 0', md: '0 10px 0 0' },
              bgcolor: COLORS.primary,
            }}
          >
            Complete
          </Typography>
          {tableData?.map((el) => (
            <CompleteCard
              key={el.tb_idx}
              tableData={el}
              orderData={orderListData.data}
              onClickReset={() =>
                rollbackAPI({
                  apiBody: {
                    tb_idx: el.tb_idx,
                  },
                })
              }
              onClickPay={(menuList) =>
                openPopup({
                  title: `${el.tb_idx}번 테이블`,
                  content: '정말 결제하시겠습니까?',
                  onConfirm: () => {
                    payAPI({
                      apiBody: {
                        tb_idx: el.tb_idx,
                        menu: menuList,
                      },
                    });
                  },
                })
              }
            />
          ))}
        </ContentBox>
      </Grid>
      <ToTopButton onClickEvent={scrollToTarget} />
    </Grid>
  );
};
export default Sales;

const OrderCard = React.memo(
  ({ el, onClickEvent }: { el: OrderCardProps; onClickEvent?: () => void }) => {
    return (
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '80%',
          padding: '20px',
          bgcolor: COLORS.background.paper,
          margin: '20px auto',
          borderRadius: '10px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            <span style={{ fontWeight: '700', fontSize: '20px' }}>{el.tb_idx}</span> 번 테이블 {'>'}{' '}
            <span style={{ fontWeight: '700', fontSize: '16px' }}>주문</span>
          </Typography>
          <TbLocationCheck size={25} style={{ cursor: 'pointer' }} onClick={onClickEvent} />
        </Box>

        <Grid container rowGap={1}>
          <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
            <After height="15px">
              <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
                메뉴
              </Typography>
            </After>
          </Grid>
          <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
            <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
              총가격
            </Typography>
          </Grid>
          <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
            <Before height="15px">
              <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
                수량
              </Typography>
            </Before>
          </Grid>
          {el.menu?.map((menu, index) => (
            <React.Fragment key={index}>
              <Grid xs={4}>
                <Typography>{menu.pd_name}</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography textAlign="center" lineHeight="1">
                  {(menu.price * menu.ea).toLocaleString('ko-KR')} ₩ <br />
                  <span style={{ fontSize: '12px' }}>({menu.price.toLocaleString('ko-KR')})</span>
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography textAlign="center">{menu.ea.toLocaleString('ko-KR')} 개</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    );
  },
);
OrderCard.displayName = 'OrderCard';

const CompleteCard = React.memo(
  ({
    tableData,
    orderData,
    onClickPay,
    onClickReset,
  }: {
    tableData: TableDataProps;
    orderData: OrderCardProps[];
    onClickPay?: (menuList: MenuType[]) => void;
    onClickReset?: () => void;
  }) => {
    const [menuList, setMenuList] = useState<MenuType[]>([]);

    //데이터 셋
    useEffect(() => {
      if (orderData && tableData) {
        const { menuList } = generateMenuList(orderData, tableData);
        setMenuList(menuList);
      }
    }, [orderData, tableData]);

    return (
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '80%',
          padding: '20px',
          bgcolor: COLORS.background.paper,
          margin: '20px auto',
          borderRadius: '10px',
          height: '300px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            <span style={{ fontWeight: '700', fontSize: '20px' }}>{tableData.tb_idx}</span> 번
            테이블
            {tableData.bar && <span style={{ fontWeight: '700', fontSize: '16px' }}> (바)</span>}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {menuList?.length !== 0 && (
              <>
                <BiReset size={25} style={{ cursor: 'pointer' }} onClick={onClickReset} />
                <FaRegCheckCircle
                  size={25}
                  style={{ cursor: 'pointer' }}
                  onClick={() => (onClickPay ? onClickPay(menuList) : null)}
                />
              </>
            )}
          </Box>
        </Box>

        <Typography>Total: {generateTotalPrice(menuList).toLocaleString('ko-KR')} ₩</Typography>

        <Grid container rowGap={1}>
          <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
            <After height="15px">
              <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
                메뉴
              </Typography>
            </After>
          </Grid>
          <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
            <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
              총가격
            </Typography>
          </Grid>
          <Grid xs={4} sx={{ borderBottom: '0.5px solid' + COLORS.text.disabled, padding: '5px' }}>
            <Before height="15px">
              <Typography textAlign="center" sx={{ fontSize: '15px', fontWeight: '600' }}>
                수량
              </Typography>
            </Before>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%', height: '180px', overflowY: 'scroll' }}>
          {menuList?.map((menu, menuIndex) => (
            <Grid container key={`complete_menu_${menuIndex}`}>
              <Grid xs={4}>
                <Typography>{menu.pd_name}</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography textAlign="center" lineHeight="1">
                  {(menu.price * menu.ea).toLocaleString('ko-KR')} ₩ <br />
                  <span style={{ fontSize: '12px' }}>({menu.price.toLocaleString('ko-KR')})</span>
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography textAlign="center">{menu.ea.toLocaleString('ko-KR')} 개</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    );
  },
);

CompleteCard.displayName = 'CompleteCard';
