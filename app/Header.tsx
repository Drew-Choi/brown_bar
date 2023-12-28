'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonBack from '@/components/buttons/ButtonBack';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Selector from '@/components/Selector';
import { SxProps } from '@mui/material';

const Tag = ({
  children,
  skeleton,
  sx,
}: {
  children: ReactNode;
  skeleton?: boolean;
  sx?: SxProps;
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
  const pathName = usePathname();
  const search = useSearchParams();
  const useClass = search.get('class');
  const choice = search.get('choice');
  const sectionName = search.get('section_name');
  const eng = search.get('eng');
  const kor = search.get('kor');
  const { idx, about_idx } = useParams();

  if (pathName === '/') return;

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
          }}
        >
          <Typography fontSize="inherit" color="text.primary" fontWeight={700}>
            Admin
          </Typography>
          <Typography fontSize="15px" color="text.primary" fontWeight={600}>
            {pathName === '/admin/join' ? '회원가입' : ''}
          </Typography>
        </Tag>
        <Box sx={{ width: '150px', height: 'auto' }}>
          <Image
            priority
            src="/img/header_logo.png"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
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
            <Typography fontSize="inherit">tag</Typography>
          </Tag>
        ) : (
          <Tag skeleton={false} sx={{ justifyContent: useClass && !choice ? 'center' : 'left' }}>
            {pathName === '/main/menu' ? (
              <Typography
                fontSize="inherit"
                color="text.primary"
                fontWeight={700}
                padding="0 10px"
                sx={{ display: 'flex', alignItems: 'center' }}
                width="100%"
                gap="10px"
              >
                Menu |{' '}
                <Selector
                  optionArr={[
                    { label: '위스키', value: 'wh' },
                    { label: '버번', value: 'a' },
                    { label: '브랜디', value: 'b' },
                    { label: '와인', value: 'w' },
                    { label: '칵테일', value: 'c' },
                    { label: '데킬라', value: 't' },
                    { label: '럼', value: 'r' },
                  ]}
                  fontWeight="600"
                  width="45%"
                  height="70%"
                  padding="5px"
                  fontSize="4.5vw"
                  mdFontSize="35px"
                />
              </Typography>
            ) : pathName === '/main/menu/order' || pathName === '/main/menu/order/final' ? (
              <Typography fontSize="inherit" color="text.primary" fontWeight={700} padding="0 10px">
                Order | <SubText fontSize="8vw" mdFontSize="72px">{`T 5`}</SubText>
              </Typography>
            ) : pathName === '/main/find/category' ||
              pathName === '/main/find/category/recommend' ||
              pathName === '/main/find/category/recommend/section' ||
              pathName === `/main/menu/detail/${idx}` ||
              pathName === `/main/about/detail/${about_idx}` ? (
              <Typography
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
              </Typography>
            ) : (
              <Typography fontSize="inherit" color="text.primary" fontWeight={700} padding="0 10px">
                | <SubText>{``}</SubText>
              </Typography>
            )}
          </Tag>
        )}
      </Box>
      <Box sx={{ flex: '1', position: 'relative', width: '45%' }}>
        <Image
          priority
          src="/img/header_logo.png"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          width={150}
          height={60}
          alt="대표로고"
        />
      </Box>
    </Container>
  );
};

export default React.memo(Header);
