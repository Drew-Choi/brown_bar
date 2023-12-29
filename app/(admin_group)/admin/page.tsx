'use client';
import { USE_MUTATE_POINT } from '@/constant/END_POINT';
import { useIsLogin } from '@/hook/useIsLogin/useIsLogin';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useMutationInstance } from '@/react-query/useMutationInstance';
import React, { useEffect } from 'react';

const StartAdmin = () => {
  const { data } = useIsLogin();
  const { openPopup } = usePopup();

  const { mutate: getRtApi } = useMutationInstance({
    apiMethod: 'post',
    apiEndPoint: USE_MUTATE_POINT.RE,
    onErrorFn: () => {
      openPopup({ title: '오류', content: '다시 로그인해주세요.' });
      console.log('로그아웃 넣어야함');
      return;
    },
    onSuccessFn() {
      console.log('성공');
    },
  });

  useEffect(() => {
    if (data?.user) {
      getRtApi({ apiBody: { id: data?.user.id }, apiQueryParams: { type: 'co' } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user]);

  return <div style={{ color: 'white', padding: '50px' }}>StartAdmin</div>;
};

export default StartAdmin;
