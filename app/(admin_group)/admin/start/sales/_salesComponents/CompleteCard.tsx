import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';
import { After } from '@/asset/After';
import { Before } from '@/asset/Before';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BiReset } from 'react-icons/bi';
import { convertUtcToKst } from '@/utils/mometDayAndTime';

const generateMenuList = (
  orderData: OrderCardProps[],
  tableData: TableDataProps,
): { menuList: MenuType[]; orderDate: string } => {
  const orderFilter = orderData.filter(
    (el) => el.tb_idx === tableData.tb_idx && el.complete && !el.pay,
  );

  const menuArrange = orderFilter
    .map((el) => el.menu)
    .flat()
    .reduce((acc: { [key: string]: MenuType }, item: MenuType) => {
      if (!acc[item._id]) {
        acc[item._id] = { ...item, ea: 0 };
      }
      acc[item._id].ea += item.ea; // ea 합산
      return acc;
    }, {});

  const orderDate = orderFilter[0]?.created_at
    ? convertUtcToKst({ utcTime: orderFilter[0]?.created_at, format: 'YYYY-MM-DD HH:mm' })
    : 'Error';

  const menuList = Object.values(menuArrange);

  return { menuList, orderDate };
};

const generateTotalPrice = (menuList: MenuType[]): number => {
  return menuList.reduce((acc, menu) => (acc += menu.price * menu.ea), 0);
};

const CompleteCard = ({
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
  const [orderDate, setOrderDate] = useState<string>('');

  //데이터 셋
  useEffect(() => {
    if (orderData && tableData) {
      const { menuList, orderDate } = generateMenuList(orderData, tableData);
      setMenuList(menuList);
      setOrderDate(orderDate);
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
        height: '320px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <span style={{ fontWeight: '700', fontSize: '20px' }}>{tableData.tb_idx}</span> 번 테이블
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
      {menuList?.length !== 0 && (
        <Typography color={COLORS.divider} textAlign="right" sx={{ fontSize: '14px' }}>
          {orderDate}
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(CompleteCard);
