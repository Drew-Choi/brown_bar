import InputPassword from '@/components/inputs/InputPassword';
import SectionContainer from '@/components/layout/SectionContainer';
import React from 'react';

const Join = () => {
  return (
    <SectionContainer sx={{ padding: '10px 30px' }}>
      <InputPassword
        textSx={{
          color: 'text.secondary',
          fontSize: { xs: '6vw', md: '52px' },
          padding: '2% 0 0 0',
        }}
        iconSx={{ fontSize: { xs: '6vw', md: '52px' } }}
        labelSx={{ fontSize: { xs: '6vw', md: '52px' } }}
      />
    </SectionContainer>
  );
};

export default Join;
