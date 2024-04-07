'use client';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ContentBox from '@/components/layout/ContentBox';
import { COLORS } from '@/asset/style';
import Box from '@mui/material/Box';
import ToTopButton from '@/components/buttons/ToTopButton';
import { useQueryInstance } from '@/react-query/useQueryInstance';
import { USE_MUTATE_POINT, USE_QUERY_POINT } from '@/constant/END_POINT';
import { QUERY_KEY } from '@/constant/QUERY_KEY';
import { GC_TIME } from '@/constant/NUMBER';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import { usePopup } from '@/hook/usePopup/usePopup';
import OrderCard from './_salesComponents/OrderCard';
import CompleteCard from './_salesComponents/CompleteCard';
import { tableData } from './_salesConstant/TABLE_DATA';
import { NotificationPayload, getMessaging, onMessage } from 'firebase/messaging';
import { OrderPupup } from './_salesComponents/OrderPupup';

const Sales = () => {
  const { openPopup } = usePopup();
  // 주문 알러트용
  const [orderAlert, setOrderAlert] = useState<NotificationPayload | null>(null);
  // 오디오 세팅
  const soundRef = useRef<HTMLAudioElement>(null);
  const soundBtnRef = useRef<HTMLButtonElement>(null);

  // 영업상태 초기설정
  const {
    data: { data: isStart } = { data: false },
    isError: isStartError,
    isLoading: startLoading,
  } = useQueryInstance<{ data: boolean }>({
    queryKey: [QUERY_KEY.IS_START],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.START,
  });

  // 주문내역 부르기
  const {
    data: { data: orderListData } = { data: [] },
    isError,
    refetch,
  } = useQueryInstance<{ data: OrderCardProps[] }>({
    queryKey: [QUERY_KEY.ORDER_LIST],
    apiMethod: 'get',
    apiEndPoint: USE_QUERY_POINT.ORDER_LIST,
    staleTime: 0,
    gcTime: GC_TIME.DEFAULT,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  // 서빙완료
  const { mutate: completeAPI } = useMutationInstance<undefined, undefined, { order_idx: string }>({
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

  // 서빙된거 롤백
  const { mutate: rollbackAPI } = useMutationInstance<
    undefined,
    undefined,
    {
      tb_idx: number;
    }
  >({
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

  // 결제완료
  const { mutate: payAPI } = useMutationInstance<
    { message: string },
    undefined,
    {
      tb_idx: number;
      menu: MenuType[];
    }
  >({
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

  // 주문 삭제
  const { mutate: orderDeleteAPI } = useMutationInstance({
    apiMethod: 'delete',
    apiEndPoint: USE_MUTATE_POINT.ORDER_DELETE,
    onErrorFn: (err: any) => {
      if (err.response.status === 400) {
        openPopup({ title: '오류', content: err.response.data.message });
      } else {
        openPopup({ title: '오류', content: '다시 시도해주세요.' });
      }
    },
    onSuccessFn: () => {
      openPopup({ title: '안내', content: '삭제 성공' });
      refetch();
    },
  });

  // 실시간 주문 인식
  useEffect(() => {
    const messaging = getMessaging();
    // 수신 받을 리스너 등록
    onMessage(messaging, (payload) => {
      const { notification } = payload;

      if (notification?.title && notification?.body && soundBtnRef.current) {
        refetch(); // 주문리스트 리패칭
        soundBtnRef.current?.click(); // 주문알림음 플레이
        setOrderAlert(notification); // 주문팝업 On
        return;
      }
    });
  }, []);

  const soundHandler = () => {
    soundRef.current?.play();
  };

  //메뉴 탑으로 이동용
  const navTopRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (navTopRef.current) {
      navTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (startLoading) return;

  if (isError || isStartError) return <Box color="text.secondary">Fetching Error</Box>;

  if (!isStart && !startLoading)
    return (
      <Box color="text.secondary" padding="20px">
        영업시작 상태가 아닙니다.
      </Box>
    );

  return (
    <>
      <button ref={soundBtnRef} onClick={soundHandler} style={{ display: 'none' }} />
      <audio ref={soundRef} src="/ping.mp3" style={{ display: 'none' }} />
      {orderAlert && (
        <OrderPupup orderMessage={orderAlert} onCloseEvent={() => setOrderAlert(null)} />
      )}
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
              {orderListData?.map(
                (el: OrderCardProps) =>
                  !el.complete && (
                    <OrderCard
                      key={el.order_idx}
                      orderInfo={el}
                      completeOnClick={() => completeAPI({ apiBody: { order_idx: el.order_idx } })}
                      deleteOnClick={() =>
                        openPopup({
                          title: '안내',
                          content: (
                            <>
                              <span style={{ fontSize: '16px' }}>주문번호: {el.order_idx}</span>
                              <br />
                              <span style={{ fontSize: '16px' }}>테이블번호: {el.tb_idx}</span>
                              <br />
                              <span>정말 주문을 취소하시겠습니까?</span>
                            </>
                          ),
                          onConfirm: () => {
                            orderDeleteAPI({ apiPathParams: el.order_idx });
                          },
                        })
                      }
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
                orderData={orderListData}
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
    </>
  );
};
export default Sales;
