'use client';
import ContentBox from '@/components/layout/ContentBox';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import { COLORS } from '@/asset/style';
import Typography from '@mui/material/Typography';

//패칭해야함
const data = [
  { label: '와인', category_idx: 1, total: 10 },
  { label: '안주', category_idx: 2, total: 10 },
  { label: '위스키위스키위스키위스키위스키위스키위스키위스키', category_idx: 3, total: 10 },
  { label: '데킬라', category_idx: 4, total: 10 },
  { label: '와인', category_idx: 5, total: 10 },
];

//패칭해야함
const pdData = [
  {
    category_idx: 1,
    pd_datas: [
      {
        _id: 1,
        pd_name: '상품이름상품이름상품이름상품이름상품이름상품이름',
        price: 30000,
        desc: '하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
      {
        _id: 2,
        pd_name: '상품이름1',
        price: 30000,
        desc: '하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
      {
        _id: 3,
        pd_name: '상품이름2',
        price: 30000,
        desc: '하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
      {
        _id: 4,
        pd_name: '상품이름3',
        price: 30000,
        desc: '하하하하하',
        optio_arr: [{ lable: '- 옵션추가 -', value: 0, price: 0 }],
      },
    ],
  },
];
const MenuWrite = () => {
  const [openValues, setOpenValues] = useState<Record<number, boolean>>({});

  const oneDepthHandler = (index: number) => {
    setOpenValues((cur) => ({ ...cur, [index]: cur[index] ? !cur[index] : true }));
  };

  return (
    <Box sx={{ width: '100%', padding: { xs: '40px 20px', sm: '40px 50px' } }}>
      <ContentBox sx={{ padding: '20px' }}>
        {data.map((el, index) => (
          <List
            key={el.category_idx}
            component="ul"
            sx={{
              fontSize: '16px',
              padding: '10px 0',
              marginBottom: '0px',
            }}
          >
            <Box component="li" sx={{ marginBottom: '10px' }}>
              <ListItemButton
                sx={{
                  gap: '10px',
                  justifyContent: 'space-between',
                  fontWeight: '600',
                  bgcolor: COLORS.primary,
                  borderRadius: '10px',
                }}
                onClick={() => oneDepthHandler(index)}
              >
                <Typography
                  sx={{ flex: '9', fontWeight: '600', fontSize: '16px', color: 'text.secondary' }}
                >
                  {el.label}
                </Typography>
                {openValues[index] ? (
                  <ExpandLess sx={{ flex: '1', justifySelf: 'right' }} />
                ) : (
                  <ExpandMore sx={{ flex: '1', justifySelf: 'right' }} />
                )}
              </ListItemButton>
              <Collapse
                sx={{
                  bgcolor: COLORS.info,
                  width: '95%',
                  margin: 'auto',
                  borderRadius: '0 0 10px 10px',
                }}
                in={openValues[index] || false}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component="ul"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                  }}
                >
                  {pdData?.map((object, index) =>
                    object.pd_datas.length !== 0 && object.category_idx === el.category_idx ? (
                      object.pd_datas.map((pd, index) => (
                        <ListItemButton
                          key={pd._id}
                          dense
                          component="li"
                          sx={{
                            width: '100%',
                            bgcolor: COLORS.info,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '15px',
                            paddingBottom: '20px',
                            marginBottom: '20px',
                            borderBottom: '1px solid #7d7d7d',
                            borderRadius: '10px',
                          }}
                        >
                          <Typography sx={{ flex: '1' }}>{pd.pd_name}</Typography>
                          <Typography sx={{ flex: '0.5', textAlign: 'center' }}>
                            {pd.price.toLocaleString('ko-KR')} ₩
                          </Typography>
                        </ListItemButton>
                      ))
                    ) : (
                      <ListItemButton
                        key={index}
                        dense
                        component="li"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        등록된 상품이 없습니다.
                      </ListItemButton>
                    ),
                  )}
                </List>
              </Collapse>
            </Box>
          </List>
        ))}
      </ContentBox>
    </Box>
  );
};

export default MenuWrite;
