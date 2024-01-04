'use client';
import { usePopup } from '@/hook/usePopup/usePopup';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminHome = () => {
  const search = useSearchParams();
  const isLogin = search.get('isLogin');
  const { openPopup } = usePopup();

  useEffect(() => {
    if (isLogin) {
      openPopup({ title: '안내', content: '로그인 상태입니다.' });
    }
  }, [isLogin]);

  return <div style={{ color: 'white', padding: '50px' }}>시작</div>;
};

export default AdminHome;
