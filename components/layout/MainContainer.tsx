// import React, { ReactNode } from 'react';
// import { styled } from '@mui/material';

// type StyleTypes = {
//   position?: string;
//   width?: string;
//   top?: string;
//   transform?: string;
// };

// interface MainProps extends StyleTypes {
//   children: ReactNode;
// }

// const Main = styled('main')<StyleTypes>(({ position, width, top, transform }) => ({
//   position,
//   width,
//   top,
//   transform,
// }));

// const MainContainer = ({
//   children,
//   position = 'relative',
//   width = '100%',
//   top = '50%',
//   transform = 'translateY(-50%)',
// }: MainProps) => {
//   return (
//     <Main position={position} width={width} top={top} transform={transform}>
//       {children}
//     </Main>
//   );
// };

// export default React.memo(MainContainer);
