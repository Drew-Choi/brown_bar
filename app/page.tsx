import BoxCustom from '@/components/layout/BoxCustom';
import ContainerCustom from '@/components/layout/ContainerCustom';
import React from 'react';

export default function Home() {
  return (
    <main>
      <ContainerCustom maxWidth="xs" sx={{ bgcolor: 'red' }}>
        <BoxCustom>zz</BoxCustom>
      </ContainerCustom>
    </main>
  );
}
