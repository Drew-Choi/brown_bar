// import connectDB from './mongodbcopy.mjs';
// import Product from './Productcopy.mjs';
// // import Order from './Order.mjs';

// // 1초 지연을 위한 함수
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const insertToDB = async () => {
//   await connectDB();

//   for (let i = 0; i < 50; i++) {
//     const newProduct = new Product({
//       pd_name: `코일레, 싱글 빈야드 까르메네르 201${i}`,
//       price: 59000,
//       desc: `맛이 아주 좋습니다. 따봉${i}개`,
//       img_url:
//         'https://fovvimage.s3.ap-northeast-2.amazonaws.com/brown_products/테스트_20240130234141',
//       option_arr: [
//         {
//           label: '- 옵션선택 -',
//           value: 0,
//           price: 0,
//           _id: '65b90afb7b4780bbf8ed0bf0',
//         },
//         {
//           label: '콜킺지',
//           value: 1,
//           price: 1000,
//           _id: '65b90afb7b4780bbf8ed0bf1',
//         },
//         {
//           label: '1L',
//           value: 2,
//           price: 10000,
//           _id: '65b90afb7b4780bbf8ed0bf2',
//         },
//       ],
//       finding_section: [],
//       category_idx: 2,
//     });

//     await newProduct.save();

//     // for (let i = 0; i < 50; i++) {
//     //   const newOrder = new Order({
//     //     tb_idx: 2,
//     //     menu: [
//     //       {
//     //         _id: '111',
//     //         pd_name: '테스트2',
//     //         price: 30000,
//     //         ea: 7,
//     //       },
//     //       {
//     //         _id: '122',
//     //         pd_name: '테스트31',
//     //         price: 13000,
//     //         ea: 2,
//     //       },
//     //     ],
//     //     complete: true,
//     //     pay: true,
//     //   });

//     //   await newOrder.save();

//     // 다음 반복 전에 1초 기다림
//     await delay(1000);
//   }

//   console.log('완료');
// };

// insertToDB();
