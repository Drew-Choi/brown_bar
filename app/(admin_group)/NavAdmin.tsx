'use client';
import { COLORS } from '@/asset/style';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Switch from '@mui/material/Switch';
import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { BiSolidFoodMenu } from 'react-icons/bi';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { IoSettings } from 'react-icons/io5';
import { useIsError } from '@/hook/useIsLogin/useIsError';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useRecoilState } from 'recoil';
import { isStart } from '@/recoil/isStart';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import Cork from '@/components/svg/Cork';

const navMenuData = [
  {
    label: '영업시작',
    url: null,
    icon: <PlayCircleFilledWhiteIcon />,
    urlGroupName: 'start',
    sub: [
      { subLabel: 'ㄴ 주문받기', url: '/admin/start/sales' },
      { subLabel: 'ㄴ 주문내역', url: '/admin/start/order_list' },
      { subLabel: 'ㄴ 통계', url: '/admin/start/analysis' },
    ],
  },
  {
    label: '상품',
    url: null,
    icon: <LibraryAddIcon />,
    urlGroupName: 'product',
    sub: [
      { subLabel: 'ㄴ 상품등록', url: '/admin/product/product_write' },
      { subLabel: 'ㄴ 상품목록', url: '/admin/product/product_list' },
    ],
  },
  {
    label: '메뉴판',
    icon: <SummarizeIcon />,
    sub: [],
    urlGroupName: null,
    url: '/admin/menu_write',
  },
  {
    label: '내 취향 찾기',
    icon: <SavedSearchIcon />,
    url: null,
    urlGroupName: 'find',
    sub: [
      { subLabel: 'ㄴ 초심자', url: '/admin/find/beginner' },
      { subLabel: 'ㄴ 탐험가', url: '/admin/find/explorer' },
      { subLabel: 'ㄴ 고인물', url: '/admin/find/old_water' },
    ],
  },
  {
    label: '시음회',
    icon: <LocalBarIcon />,
    url: null,
    urlGroupName: 'tasting',
    sub: [
      { subLabel: 'ㄴ 일정등록', url: '/admin/tasting/write' },
      { subLabel: 'ㄴ 오픈카톡등록', url: '/admin/tasting/chat' },
    ],
  },
  {
    label: '관리자 설정',
    icon: <IoSettings size={20} />,
    sub: [],
    urlGroupName: null,
    url: '/admin/settings',
  },
];

export const NavAdmin = () => {
  useIsError();
  const { openPopup } = usePopup();
  const [show, setShow] = useState<Boolean>(false);
  const pathName = usePathname();
  // 영업시작 확인
  const [startSwitchValue, setStartSwitchValue] = useRecoilState(isStart);

  // 영업상태 초기설정
  const { isError } = useQueryInstance({
    queryKey: [QUERY_KEY.IS_START],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.START,
    staleTime: 0,
    gcTime: 0,
    queryEnable: pathName !== '/admin/login',
    onSuccess: (res) => {
      setStartSwitchValue(() => res.data);
    },
  });

  // 영업상태변경 요청
  const { mutate: isStartApi } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.START,
    onErrorFn: (err: any) => {
      console.error(err);
      return openPopup({ title: '오류', content: err.response.data.message });
    },
    onSuccessFn: (res) => {
      setStartSwitchValue(() => res.data);
    },
  });

  const startSwitchHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    isStartApi({ apiBody: { is_start: value } });
  };

  //메뉴 탑으로 이동용
  const navTopRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (navTopRef.current) {
      navTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (pathName === '/admin/login') return;

  if (isError) return <Box color="text.secondary">ERROR</Box>;

  return (
    <>
      <div style={{ visibility: 'hidden' }} ref={navTopRef} />
      <Box
        component="nav"
        sx={{
          position: 'relative',
          width: { xs: !show ? '0' : '200px', sm: '200px' },
          height: '100%',
          bgcolor: 'background.paper',
          transition: '1s width ease',
          borderColor: 'background.default',
          borderStyle: 'solid',
          borderWidth: '1px 1px 1px 0px',
          borderRadius: '0 0 10px 0',
          zIndex: '9',
        }}
      >
        {/* 메뉴토글버튼 */}
        <Box
          sx={{
            position: 'absolute',
            display: { xs: 'block', sm: 'none' },
            width: 'fit-content',
            top: '0',
            right: '-31px',
            zIndex: '10',
            cursor: 'pointer',
          }}
          onClick={() => {
            setShow((cur) => !cur);
          }}
        >
          <BiSolidFoodMenu size={35} color={COLORS.secondary} />
        </Box>
        {/* ------ */}

        <MenuListUp
          sx={{
            opacity: { xs: !show ? '0' : '1', sm: '1' },
            transition: '1s opacity ease',
            padding: '10px 0 150px 0',
          }}
          data={navMenuData}
          logOutOnClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
          switchChecked={startSwitchValue || false}
          switchOnChange={startSwitchHandler}
        />

        {/* 스크롤 탑을로 이동 버튼 */}
        <Box
          onClick={scrollToTarget}
          sx={{
            position: 'absolute',
            display: 'flex',
            bottom: '50px',
            flexDirection: 'column',
            alignItems: 'center',
            transform: {
              xs: !show ? 'rotate(180deg) translateX(110%)' : 'rotate(180deg) translateX(50%)',
              sm: 'rotate(180deg) translateX(50%)',
            },
            opacity: {
              xs: !show ? '0' : '1',
              sm: '1',
            },
            left: { xs: !show ? '0%' : '50%', sm: '50%' },
            transition: '1s ease',
            overflow: 'hidden',
            zIndex: '15',
            cursor: 'pointer',
          }}
        >
          <Cork
            pointerColor={COLORS.primary}
            sx={{
              position: 'relative',
              display: 'block',
            }}
          />
          <Typography sx={{ transform: 'rotate(180deg)' }}>to Top</Typography>
        </Box>
      </Box>
    </>
  );
};

//-----------------------------------------

interface MenuListUpProps {
  data?: {
    label: string;
    icon: ReactNode;
    url: string | null;
    urlGroupName: string | null;
    sub: { subLabel: string; url: string }[];
  }[];
  sx?: SxProps;
  logOutOnClick?: () => void;
  switchOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  switchChecked?: boolean;
}

const MenuListUp = React.memo(
  ({
    data = [
      {
        label: '영업시작',
        icon: <div></div>,
        url: null,
        urlGroupName: null,
        sub: [
          { subLabel: 'ㄴ 주문받기', url: '/admin' },
          { subLabel: 'ㄴ 주문내역', url: '/admin' },
          { subLabel: 'ㄴ 통계', url: '/admin' },
        ],
      },
    ],
    sx,
    logOutOnClick,
    switchOnChange,
    switchChecked,
  }: MenuListUpProps) => {
    const router = useRouter();
    const pathName = usePathname();

    const [openValues, setOpenValues] = useState<Array<boolean>>(
      Array(data?.length || 0).fill(false),
    );

    const collapseHandler = (index: number) => {
      setOpenValues((cur) => {
        const copy = [...cur];
        copy[index] = !copy[index];
        return copy;
      });
    };

    return (
      <List component="ul" sx={{ fontSize: '16px', padding: '10px 0', ...sx }}>
        <Box
          component="li"
          sx={{
            position: 'relative',
            width: '80%',
            display: 'flex',
            boxSizing: 'border-box',
            borderWidth: '0 0 2px 0',
            borderColor: COLORS.divider,
            borderStyle: 'solid',
            margin: 'auto',
            overflow: 'hidden',
          }}
        >
          <RiLogoutBoxLine
            size={35}
            style={{
              cursor: 'pointer',
              alignSelf: 'center',
            }}
            onClick={logOutOnClick}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              paddingTop: '7px',
            }}
          >
            <Typography
              noWrap={true}
              sx={{ fontSize: '15px', fontWeight: '600', overflow: 'hidden' }}
            >
              영업시작
            </Typography>
            <Switch
              checked={switchChecked}
              inputProps={{ 'aria-label': 'controlled' }}
              onChange={switchOnChange}
              color="secondary"
            />
          </Box>
        </Box>
        {data?.map((el, index) => (
          <Box component="li" sx={{ marginBottom: '10px' }} key={index}>
            <ListItemButton
              sx={{
                gap: '10px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
              }}
              onClick={(e) => {
                if (el.sub?.length !== 0) {
                  collapseHandler(index);
                } else {
                  el?.url !== null && router.push(el.url);
                }
              }}
              selected={
                el?.url
                  ? pathName === el.url
                  : el?.urlGroupName
                    ? pathName.includes(el.urlGroupName)
                    : false
              }
            >
              <div style={{ flex: '0.5' }}>{el.icon}</div>
              <p style={{ flex: '1' }}>{el.label}</p>
              {el.sub?.length !== 0 ? (
                openValues[index] ? (
                  <ExpandLess sx={{ flex: '0.5', justifySelf: 'right' }} />
                ) : (
                  <ExpandMore sx={{ flex: '0.5', justifySelf: 'right' }} />
                )
              ) : (
                <ExpandLess sx={{ flex: '0.5', visibility: 'hidden' }} />
              )}
            </ListItemButton>
            {el.sub?.length !== 0 && (
              <Collapse in={openValues[index] || false} timeout="auto" unmountOnExit>
                <List
                  component="ul"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    margin: 'auto',
                    padding: '0 0 20px 25px',
                  }}
                >
                  {el.sub.map((sub, subIndex) => (
                    <ListItemButton
                      dense
                      component="li"
                      key={`${index}-${subIndex}`}
                      sx={{ whiteSpace: 'nowrap' }}
                      onClick={() => {
                        router.push(sub.url);
                      }}
                      selected={pathName === sub?.url}
                    >
                      {sub.subLabel}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    );
  },
);
MenuListUp.displayName = 'MenuListUp';
