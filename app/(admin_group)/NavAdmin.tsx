'use client';
import { COLORS } from '@/asset/style';
import { List, ListItemButton, Box, Collapse, SxProps } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { BiSolidFoodMenu } from 'react-icons/bi';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const navMenuData = [
  {
    label: '영업시작',
    url: null,
    icon: <PlayCircleFilledWhiteIcon />,
    sub: [
      { subLabel: 'ㄴ 주문받기', url: '/admin' },
      { subLabel: 'ㄴ 주문내역', url: '/admin/start/order_list' },
      { subLabel: 'ㄴ 통계', url: '/admin/start/analysis' },
    ],
  },
  {
    label: '상품등록',
    icon: <LibraryAddIcon />,
    sub: [],
    url: '/admin/product_write',
  },
  {
    label: '메뉴판',
    icon: <SummarizeIcon />,
    sub: [],
    url: '/admin/menu_write',
  },
  {
    label: '내 취향 찾기',
    icon: <SavedSearchIcon />,
    url: null,
    sub: [
      { subLabel: 'ㄴ 초심자', url: '/admin/find/beginner' },
      { subLabel: 'ㄴ 탐험가', url: '/admin/find/explorer' },
      { subLabel: 'ㄴ 고인물', url: '/admin/find/old_water' },
    ],
  },
  {
    label: '술에 대하여',
    icon: <LocalBarIcon />,
    url: null,
    sub: [
      { subLabel: 'ㄴ 아이콘 등록', url: '/admin/about/icon_write' },
      { subLabel: 'ㄴ 설명작성', url: '/admin/about/about_write' },
    ],
  },
];

export const NavAdmin = () => {
  const [show, setShow] = useState<Boolean>(false);

  return (
    <Box
      component="nav"
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: { xs: !show ? '0px' : '200px', sm: '200px' },
        height: '100%',
        bgcolor: 'background.paper',
        transition: '1s width ease',
        borderColor: 'background.default',
        borderStyle: 'solid',
        borderWidth: '1px 1px 1px 0px',
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
        }}
        data={navMenuData}
      />
    </Box>
  );
};

const MenuListUp = React.memo(
  ({
    data = [
      {
        label: '영업시작',
        icon: <div></div>,
        url: null,
        sub: [
          { subLabel: 'ㄴ 주문받기', url: '/admin' },
          { subLabel: 'ㄴ 주문내역', url: '/admin' },
          { subLabel: 'ㄴ 통계', url: '/admin' },
        ],
      },
    ],
    sx,
  }: {
    data?: {
      label: string;
      icon: ReactNode;
      url: string | null;
      sub: { subLabel: string; url: string }[];
    }[];
    sx?: SxProps;
  }) => {
    const router = useRouter();

    const [openValues, setOpenValues] = useState<Array<boolean>>(
      Array(data?.length || 0)
        .fill(false)
        .map((_, index) => index === 0),
    );

    const [selectIndex, setSelectIndex] = useState<number | string>('0-0');

    const collapseHandler = (index: number) => {
      setOpenValues((cur) => {
        const copy = [...cur];
        copy[index] = !copy[index];
        return copy;
      });
    };

    return (
      <List component="ul" sx={{ fontSize: '16px', padding: '20px 0', ...sx }}>
        {data?.map((el, index) => (
          <Box component="li" sx={{ marginBottom: '10px' }} key={index}>
            <ListItemButton
              sx={{ gap: '10px', fontWeight: '600', whiteSpace: 'nowrap' }}
              onClick={(e) => {
                if (el.sub?.length !== 0) {
                  collapseHandler(index);
                } else {
                  setSelectIndex(index);
                  el.url !== null && router.push(el.url);
                }
              }}
              selected={selectIndex === index}
            >
              {el.icon}
              {el.label}
              {el.sub?.length !== 0 && (openValues[index] ? <ExpandLess /> : <ExpandMore />)}
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
                        setSelectIndex(`${index}-${subIndex}`);
                        router.push(sub.url);
                      }}
                      selected={selectIndex === `${index}-${subIndex}`}
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
