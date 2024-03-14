'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonBack from '@/components/buttons/ButtonBack';
import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation';
import { SxProps } from '@mui/material';

type TbDataTpye = {
  tb: string;
  expire: string;
};

const Tag = ({
  children,
  skeleton,
  sx,
  onClick,
}: {
  children: ReactNode;
  skeleton?: boolean;
  sx?: SxProps;
  onClick?: () => void;
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        bgcolor: skeleton ? 'background.default' : 'background.paper',
        width: '100%',
        height: 'auto',
        padding: '5px 0',
        borderRadius: '0 10px 10px 0',
        color: skeleton ? 'background.default' : 'text.secondary',
        fontSize: { xs: '8vw', md: '72px' },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

const SubText = ({
  children,
  sx,
  fontSize = '6vw',
  mdFontSize = '54px',
}: {
  children: ReactNode;
  sx?: SxProps;
  fontSize?: string;
  mdFontSize?: string;
}) => {
  return (
    <Box component="span" sx={{ fontSize: { xs: fontSize, md: mdFontSize }, ...sx }}>
      {children}
    </Box>
  );
};

export const Header = ({ flex = '1' }: { flex?: string }) => {
  const router = useRouter();
  const pathName = usePathname();
  const search = useSearchParams();
  const useClass = search.get('class');
  const choice = search.get('choice');
  const sectionName = search.get('section_name');
  const eng = search.get('eng');
  const kor = search.get('kor');
  const { id, about_idx } = useParams();

  const [tb, setTb] = useState<string | null>(null);

  useEffect(() => {
    if (
      pathName === '/main' ||
      pathName === '/main/menu' ||
      pathName === '/main/menu/order' ||
      pathName === '/main/menu/order/final'
    ) {
      const tbData = sessionStorage.getItem('tb');

      if (!tbData) {
        setTb(null);
        return router.push('/not_tb');
      }

      const tbParse: TbDataTpye = JSON.parse(tbData);
      const now = new Date().toISOString();

      if (now < tbParse.expire) return setTb(tbParse.tb);

      sessionStorage.removeItem('tb');
      setTb(null);
      return router.push('/not_tb');
    }
  }, [pathName]);

  if (pathName === '/' || pathName === '/not-found' || pathName === '/not_tb') return;

  if (pathName.startsWith('/admin'))
    return (
      <Container
        component="header"
        disableGutters={true}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          height: 'fit-content',
        }}
      >
        <Tag
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '250px',
            height: '72px',
            fontSize: '24px',
            borderRadius: '0 0 10px 0',
            cursor: 'pointer',
          }}
        >
          <Typography
            fontSize="inherit"
            color="text.primary"
            fontWeight={700}
            onClick={() => router.push('/admin')}
          >
            Admin
          </Typography>
          <Typography fontSize="15px" color="text.primary" fontWeight={600}>
            {pathName === '/admin/login'
              ? '로그인'
              : pathName === '/admin/product/product_write'
                ? '상품 / 상품등록'
                : pathName === '/admin/product/product_list'
                  ? '상품 / 상품목록'
                  : pathName.includes('/admin/product/product_list/edit/')
                    ? '상품 / 상품수정'
                    : pathName === '/admin/menu_write'
                      ? '메뉴판'
                      : pathName === '/admin/start/sales'
                        ? '영업 / 주문받기'
                        : pathName === '/admin/start/order_history'
                          ? '영업 / 주문내역'
                          : pathName === '/admin/start/analysis'
                            ? '영업 / 통계'
                            : pathName === '/admin/finding/10'
                              ? '내 취향 찾기 / 초심자'
                              : pathName === '/admin/finding/20'
                                ? '내 취향 찾기 / 탐험가'
                                : pathName === '/admin/finding/30'
                                  ? '내 취향 찾기 / 고인물'
                                  : pathName === '/admin/tasting'
                                    ? '시음회'
                                    : pathName === '/admin/settings'
                                      ? '관리자 설정'
                                      : ''}
          </Typography>
        </Tag>
        <Box sx={{ width: '150px', height: 'fit-content' }}>
          <Image
            priority
            src="/img/header_logo.png"
            style={{ width: '100%', height: 'fit-content', objectFit: 'contain' }}
            width={150}
            height={60}
            alt="대표로고"
          />
        </Box>
      </Container>
    );

  return (
    <Container
      component="header"
      disableGutters={true}
      sx={{
        flex: flex,
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px',
        color: 'text.secondary',
      }}
    >
      <Box sx={{ position: 'relative', flex: '1.5', padding: '10px 0' }}>
        {pathName !== '/main' && pathName !== '/' ? <ButtonBack /> : <ButtonBack skeleton={true} />}
        {pathName === '/main/find' ||
        pathName === '/main' ||
        pathName === '/' ||
        pathName === '/main/about' ? (
          <Tag skeleton={true}>
            <Box fontSize="inherit">tag</Box>
          </Tag>
        ) : (
          <Tag skeleton={false} sx={{ justifyContent: useClass && !choice ? 'center' : 'left' }}>
            {pathName === '/main/menu' ? (
              <Box
                fontSize="inherit"
                fontWeight={700}
                sx={{
                  width: '100%',
                  display: 'block',
                  color: 'text.primary',
                  padding: '0 10px',
                }}
              >
                Menu | T {tb === null ? '' : tb}
              </Box>
            ) : pathName === '/main/menu/order' || pathName === '/main/menu/order/final' ? (
              <Box fontSize="inherit" color="text.primary" fontWeight={700} padding="0 10px">
                Order |{' '}
                <SubText fontSize="8vw" mdFontSize="72px">{`T ${tb === null ? '' : tb}`}</SubText>
              </Box>
            ) : pathName === '/main/find/category' ||
              pathName === '/main/find/category/recommend' ||
              pathName === '/main/find/category/recommend/section' ||
              pathName === `/main/menu/detail/${id}` ||
              pathName === `/main/about/detail/${about_idx}` ? (
              <Box
                sx={{ fontSize: eng && kor ? { xs: '6vw', md: '54px' } : 'inherit' }}
                color="text.primary"
                fontWeight={700}
                padding="0 5px"
                lineHeight={
                  choice && !sectionName
                    ? '0.8'
                    : choice && sectionName
                      ? '0.6'
                      : eng && kor
                        ? '1'
                        : '1.5'
                }
                paddingLeft={choice ? '10%' : eng ? '5%' : '0'}
              >
                {useClass &&
                  (useClass === 'OldWater'
                    ? `${useClass.slice(0, 3)} ${useClass.slice(3)}`
                    : useClass)}

                {choice && (
                  <>
                    <br />
                    <SubText fontSize="3.5vw" mdFontSize="31px">
                      {choice === '브랜디 꼬냑 류'
                        ? `${choice.slice(0, 3)} & ${choice.slice(3)}`
                        : choice}
                    </SubText>
                  </>
                )}

                {sectionName && (
                  <>
                    <br />
                    <SubText sx={{ fontWeight: '600' }} fontSize="3vw" mdFontSize="27px">
                      : {sectionName}
                    </SubText>
                  </>
                )}

                {eng && kor && (
                  <>
                    {eng === 'BrandyCognac' ? `${eng.slice(0, 5)} & ${eng.slice(5)}` : eng}
                    <br />
                    <SubText fontSize="3.5vw" mdFontSize="31px">
                      {kor === '브랜디꼬냑' ? `${kor.slice(0, 3)} & ${kor.slice(3)}` : kor}
                    </SubText>
                  </>
                )}
              </Box>
            ) : (
              <Box fontSize="inherit" color="text.primary" fontWeight={700} padding="0 10px">
                | <SubText>{``}</SubText>
              </Box>
            )}
          </Tag>
        )}
      </Box>
      <Box sx={{ flex: '1', position: 'relative', width: '45%', height: 'fit-content' }}>
        <Image
          priority
          src="/img/header_logo.png"
          style={{ width: '100%', height: 'fit-content', objectFit: 'contain' }}
          width={150}
          height={60}
          alt="대표로고"
        />
      </Box>
    </Container>
  );
};

export default React.memo(Header);
