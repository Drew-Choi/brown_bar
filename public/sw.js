if(!self.define){let e,i={};const s=(s,t)=>(s=new URL(s+".js",t).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let o={};const c=e=>s(e,n),r={module:{uri:n},exports:o,require:c};i[n]=Promise.all(t.map((e=>r[e]||c(e)))).then((e=>(a(...e),o)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0dfe2dfce02d36739ad5ee2e078b944b"},{url:"/_next/static/4qqp9tV8YA3svLspV3VCK/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/4qqp9tV8YA3svLspV3VCK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/00cbbcb7-afc136727b747173.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/127-9d3201a9346792eb.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/1276-17acc57d877c29ed.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/13b76428-ccac6b34b8b9518b.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/173-a8cf35b3f1ff01ba.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/2626716e-6c540bfda92f7674.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/2846-2fc192935ea1757e.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/3155-ecdedbf557253055.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/358ff52d-8dbd9b616e0eef47.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/39209d7c-fc345e13b87c95ef.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/4088-f47deb204955d2d3.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/4326-14f8694c2f8b7b99.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/4716-a1626d73f90903fa.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/4740-f377ba6064241645.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/48507feb-e4d306d94f26a359.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/4938-2d1bd9f8bdf7baa5.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/4f9d9cd8-ce66bf65452a4290.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/5165-050671c2a6866b00.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/5269-af3ecd3482b707a2.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/5295-c6a22cbb524cf2f7.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/5365-6d4bb4c0f12aa4c2.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/5488-76f384aa9b41ea5d.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/5500-0bad32bc715221bf.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/6188-ef5dfc8c106a33a3.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/6300-0f1b35f4a9beb0ce.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/6691-d3c418e937e9668a.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/6748-dcc5886bbe386333.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/6778-c5075249ec44c205.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/6951-093ab77e4dc666ec.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/714-d387e63650faa855.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/7996-b4da5ef25ed4433b.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/8151-786715f80dca2295.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/8822-72a441c812e20be3.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/8dc5345f-54e3e38ed304d15d.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/9081a741-90de42de06322d56.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/finding/%5Bfinding_idx%5D/page-af95e80de65c3ce7.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/login/page-37d3c46963ca1e43.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/menu_write/loading-9f2e4b68fbff7e85.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/menu_write/page-7754a93c7fe16de6.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/page-52863d6887b7d152.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/product/product_list/edit/%5Bid%5D/page-99708cf02ed29045.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/product/product_list/page-23d5ff231e4cae87.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/product/product_write/page-6efb0eb23dfd2a48.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/settings/page-bb0bd8d0eb85c06b.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/start/analysis/page-e046205e0ea6f688.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/start/order_history/page-d718b6e27c95eb77.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/start/sales/page-1e858047157d559e.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/admin/tasting/page-c9491b79fed48e99.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(admin_group)/layout-9f3b0b33ca7ee757.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/about/detail/%5Babout_idx%5D/page-2752d3e8228460c3.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/about/page-7b1ba9e14c313dea.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/category/page-a9ee5e1de78ee9ed.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/category/recommend/page-7d569dc16454143d.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/category/recommend/section/page-402cfa183e5c1d39.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/page-64aa5852ebb7bcec.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/detail/%5Bid%5D/page-f5bbb04def855faf.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/order/final/page-2fd939ad75544a4f.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/order/page-148ae6a19fc14c2c.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/page-6ba980cef949bee3.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/page-8ba9a1bd9fdab306.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/main/party/page-99bff88d35001791.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/(client_page_group)/not_tb/page-1054241533a1e58b.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/layout-a8d3a83202bd225e.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/not-found-da0969a792b3a7b7.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/app/page-0f80c8096a690b83.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/e37a0b60-b436cec589ebdecd.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/e416a3ff-a29f1bbd53572359.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/ec3863c0-a2605f5544452e60.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/f4e5f4e1-82d94840285ea01a.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/fd9d1056-83cb199ebc01cd83.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/main-8a49e1579d4a4fdf.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/main-app-fa0b8a31c736ae42.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-723a2c3684a491a5.js",revision:"4qqp9tV8YA3svLspV3VCK"},{url:"/_next/static/css/47bf0e664f10b2a3.css",revision:"47bf0e664f10b2a3"},{url:"/_next/static/media/0147480388d288b9-s.woff2",revision:"e35020e0e8798b03e6ef15c5c577d036"},{url:"/_next/static/media/1bf9d3bd15ef878b-s.woff2",revision:"79ce84d79cba998890d4c42c7289f9d1"},{url:"/_next/static/media/2488b73fbbda06e9-s.woff2",revision:"903f0935ff8385a69eae3ea5769d39fb"},{url:"/_next/static/media/34aa362d39abe17a-s.woff2",revision:"a676f45a60ad9efe35ead739bee46fe5"},{url:"/_next/static/media/38f1353136457b55-s.woff2",revision:"8541392276db00ce3929cc4811147008"},{url:"/_next/static/media/52c4e967c8df92fc-s.woff2",revision:"1a6fe4d7f79a508869b9a52fbd2c681a"},{url:"/_next/static/media/72b894ddc38a7cc1-s.p.woff2",revision:"177443ecf5f4345be565642313677c86"},{url:"/_next/static/media/7342cddaba95545d-s.woff2",revision:"a19fa579264c33a36b7af8c86a4f7f5e"},{url:"/_next/static/media/9cb252b81356e010-s.woff2",revision:"33f07da91237cb596755b7f2110890a0"},{url:"/_next/static/media/b0a67f1572332d7a-s.p.woff2",revision:"891e6d88e31e2e256633850ce196a15f"},{url:"/_next/static/media/b23db1c6f4ff0acf-s.woff2",revision:"ce6b39999e10093f0b81f0b8bbf23e6f"},{url:"/_next/static/media/c794bebaf209f9fb-s.woff2",revision:"bcb98d901fdd508c8a8908a3c3b188d6"},{url:"/_next/static/media/c7b4fd33734710f7-s.p.woff2",revision:"a638dbdfbdd1933145497484477f802a"},{url:"/_next/static/media/e400baae650c21fc-s.p.woff2",revision:"e48b2c54027e1b42db8984c832cada02"},{url:"/_next/static/media/f388ce6667079c43-s.p.woff2",revision:"fa2b35db2074c8b35e4c96aac6bce1e5"},{url:"/_next/static/media/f9c175e84c2746b9-s.woff2",revision:"578e01ef538af3fcb273b176c4ddc33c"},{url:"/_next/static/media/fbb17e27025aba06-s.woff2",revision:"6a5b1e1f06d95b436f25b4c9b94fe26d"},{url:"/_next/static/media/fc624604eae89eb3-s.p.woff2",revision:"5cf1ccd8e72429f26e691240da14cbf4"},{url:"/_next/static/media/roboto-cyrillic-300-normal.17dc3449.woff",revision:"17dc3449"},{url:"/_next/static/media/roboto-cyrillic-300-normal.88798412.woff2",revision:"88798412"},{url:"/_next/static/media/roboto-cyrillic-400-normal.19f93502.woff",revision:"19f93502"},{url:"/_next/static/media/roboto-cyrillic-400-normal.2d9c9d60.woff2",revision:"2d9c9d60"},{url:"/_next/static/media/roboto-cyrillic-500-normal.6e4060e5.woff",revision:"6e4060e5"},{url:"/_next/static/media/roboto-cyrillic-500-normal.aa68ea54.woff2",revision:"aa68ea54"},{url:"/_next/static/media/roboto-cyrillic-700-normal.1ea775f3.woff",revision:"1ea775f3"},{url:"/_next/static/media/roboto-cyrillic-700-normal.258a358e.woff2",revision:"258a358e"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.cd7c5715.woff2",revision:"cd7c5715"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.de365ce5.woff",revision:"de365ce5"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.02e18372.woff",revision:"02e18372"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.d7827ae3.woff2",revision:"d7827ae3"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a05054d8.woff",revision:"a05054d8"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a1b5c90d.woff2",revision:"a1b5c90d"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.46ca43b3.woff",revision:"46ca43b3"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.dd3651fb.woff2",revision:"dd3651fb"},{url:"/_next/static/media/roboto-greek-300-normal.122e04f2.woff",revision:"122e04f2"},{url:"/_next/static/media/roboto-greek-300-normal.25dc89b0.woff2",revision:"25dc89b0"},{url:"/_next/static/media/roboto-greek-400-normal.63e6dc18.woff2",revision:"63e6dc18"},{url:"/_next/static/media/roboto-greek-400-normal.e3b5876b.woff",revision:"e3b5876b"},{url:"/_next/static/media/roboto-greek-500-normal.533b03d2.woff2",revision:"533b03d2"},{url:"/_next/static/media/roboto-greek-500-normal.55bbf615.woff",revision:"55bbf615"},{url:"/_next/static/media/roboto-greek-700-normal.432b858b.woff2",revision:"432b858b"},{url:"/_next/static/media/roboto-greek-700-normal.b3d9786c.woff",revision:"b3d9786c"},{url:"/_next/static/media/roboto-greek-ext-300-normal.69dd9b06.woff",revision:"69dd9b06"},{url:"/_next/static/media/roboto-greek-ext-300-normal.bc5ce703.woff2",revision:"bc5ce703"},{url:"/_next/static/media/roboto-greek-ext-400-normal.2b547ded.woff2",revision:"2b547ded"},{url:"/_next/static/media/roboto-greek-ext-400-normal.d17f5f2b.woff",revision:"d17f5f2b"},{url:"/_next/static/media/roboto-greek-ext-500-normal.7ea6cffa.woff2",revision:"7ea6cffa"},{url:"/_next/static/media/roboto-greek-ext-500-normal.fcc37f63.woff",revision:"fcc37f63"},{url:"/_next/static/media/roboto-greek-ext-700-normal.950178dd.woff",revision:"950178dd"},{url:"/_next/static/media/roboto-greek-ext-700-normal.a8d16efd.woff2",revision:"a8d16efd"},{url:"/_next/static/media/roboto-latin-300-normal.73b81266.woff",revision:"73b81266"},{url:"/_next/static/media/roboto-latin-300-normal.a4eae32d.woff2",revision:"a4eae32d"},{url:"/_next/static/media/roboto-latin-400-normal.d6d4cf7b.woff",revision:"d6d4cf7b"},{url:"/_next/static/media/roboto-latin-400-normal.f2894edc.woff2",revision:"f2894edc"},{url:"/_next/static/media/roboto-latin-500-normal.3170fd9a.woff2",revision:"3170fd9a"},{url:"/_next/static/media/roboto-latin-500-normal.cdad2023.woff",revision:"cdad2023"},{url:"/_next/static/media/roboto-latin-700-normal.71b2beb8.woff2",revision:"71b2beb8"},{url:"/_next/static/media/roboto-latin-700-normal.f3ddaf9d.woff",revision:"f3ddaf9d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.37d4965d.woff2",revision:"37d4965d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.b9b4688a.woff",revision:"b9b4688a"},{url:"/_next/static/media/roboto-latin-ext-400-normal.21abc8c8.woff2",revision:"21abc8c8"},{url:"/_next/static/media/roboto-latin-ext-400-normal.9600b4a6.woff",revision:"9600b4a6"},{url:"/_next/static/media/roboto-latin-ext-500-normal.41845160.woff",revision:"41845160"},{url:"/_next/static/media/roboto-latin-ext-500-normal.85ebfb55.woff2",revision:"85ebfb55"},{url:"/_next/static/media/roboto-latin-ext-700-normal.6af98c24.woff2",revision:"6af98c24"},{url:"/_next/static/media/roboto-latin-ext-700-normal.b6be88e2.woff",revision:"b6be88e2"},{url:"/_next/static/media/roboto-vietnamese-300-normal.44e9a722.woff",revision:"44e9a722"},{url:"/_next/static/media/roboto-vietnamese-300-normal.b3d3e960.woff2",revision:"b3d3e960"},{url:"/_next/static/media/roboto-vietnamese-400-normal.b339d926.woff",revision:"b339d926"},{url:"/_next/static/media/roboto-vietnamese-400-normal.c95fc061.woff2",revision:"c95fc061"},{url:"/_next/static/media/roboto-vietnamese-500-normal.65b57a7f.woff",revision:"65b57a7f"},{url:"/_next/static/media/roboto-vietnamese-500-normal.7f8c0554.woff2",revision:"7f8c0554"},{url:"/_next/static/media/roboto-vietnamese-700-normal.72bf832f.woff2",revision:"72bf832f"},{url:"/_next/static/media/roboto-vietnamese-700-normal.82ca662a.woff",revision:"82ca662a"},{url:"/firebase-messaging-sw.js",revision:"9fbc691eeb55843152de1c385186e5cf"},{url:"/img/beginner_icon.png",revision:"3c6e9e0a8804ea8385378701da79b77b"},{url:"/img/bottom_icon.png",revision:"aca24994d52b16e493ec7bf396d63e81"},{url:"/img/explorer_icon.png",revision:"094901a6620da12a9c13642a73b8dd1d"},{url:"/img/header_logo.png",revision:"802adc34e59cfe1d880f83c0223c7010"},{url:"/img/icon/american_whiskey.png",revision:"34549772a22630413eee20b49b61c368"},{url:"/img/icon/brandy.png",revision:"e0e2e77f34d7bce1b893ca1c173a0919"},{url:"/img/icon/cocktail.png",revision:"2857823ddecc52fd3665b09afafd2e29"},{url:"/img/icon/malt_whiskey.png",revision:"1f2d527da1bb2fa9c683050709ed7119"},{url:"/img/icon/origin/wheat_origin.png",revision:"55a2dc0fe31e7312f18e80eac06af1c3"},{url:"/img/icon/rum.png",revision:"e19508f43a41ad053a8d60beba83c7ab"},{url:"/img/icon/scotch.png",revision:"1045aa03b326c5a79019dcf5102a56dc"},{url:"/img/icon/tequila.png",revision:"a5abd5e6636542b68ae1ffe02c5f26b8"},{url:"/img/icon/wine.png",revision:"8e48ceefbff3dde5c6d2ea69307b17ac"},{url:"/img/kakao_login_img.png",revision:"b6ebaffbd18f82df9635f2cd95b093ef"},{url:"/img/lightHead.png",revision:"c7017f2319ae5a19bed48997ff45dbf2"},{url:"/img/old_water_icon.png",revision:"10a3c02250d4cb6ad1e075499cae8d5f"},{url:"/img/ready_file.png",revision:"2ea98bd31141b19edcc31da067066506"},{url:"/img/test/test_image.jpeg",revision:"781bc5e2c28a9fa904cb4c3f4efe0c55"},{url:"/pwa_icon/icon-192x192.png",revision:"d563ed5d717ad5f85881b766898a8c54"},{url:"/pwa_icon/icon-256x256.png",revision:"c62fffe2abf62f3c1082d1b65aa731de"},{url:"/pwa_icon/icon-384x384.png",revision:"cd51e58843a3eb5e76c187cc4f59a326"},{url:"/pwa_icon/icon-512x512.png",revision:"191ddbbe8a9b32ece4b4b0f8075fa12c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:t})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
