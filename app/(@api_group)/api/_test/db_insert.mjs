// import connectDB from './mongodbcopy.mjs';
// import Product from './Productcopy.mjs';

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
//         'https://fovvimage.s3.ap-northeast-2.amazonaws.com/brown_products/코일레, 싱글 빈야드 까르메네르 2018_20240105181735',
//     });

//     await newProduct.save();

//     // 다음 반복 전에 1초 기다림
//     await delay(1000);
//   }

//   console.log('완료');
// };

// insertToDB();
