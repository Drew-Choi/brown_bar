if(!self.define){let e,i={};const a=(a,t)=>(a=new URL(a+".js",t).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let s={};const o=e=>a(e,c),r={module:{uri:c},exports:s,require:o};i[c]=Promise.all(t.map((e=>r[e]||o(e)))).then((e=>(n(...e),s)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"11103c6e23094f1023de346a28049128"},{url:"/_next/static/chunks/00cbbcb7-869843d0c3b95ad1.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/1276-88a6e4ff3109b8c8.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/1330-b773e3a3d94d6524.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/13b76428-e036841de728ca8b.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/212-88a57853d38dc238.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/2626716e-ea5c2b3ba241c149.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/2846-b6209532ccb2e051.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/358ff52d-7aa56beb9f35d499.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/39209d7c-5252af8304434207.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/3952-b534f69cc85a5b48.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/4326-72541048c84dc996.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/4716-5e0329136b03554f.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/4740-abeb48357bbd6eeb.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/48507feb-2fea908ce0c805cc.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/4938-a810aeeb5d2b54ec.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/4f9d9cd8-cfe6b89986fab499.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/5230-7cdfdfe921fe9067.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/5269-3aadefdc0ae6bfe5.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/5295-5cbc4ba258817674.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/5346-cc2d5d8e83530bfd.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/5500-522d2f24f3c5f32c.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/5754-ca2f4879356ae4ee.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/6300-a4df32060ac196fa.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/6691-aacfd168287535ab.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/6951-d52d3fb3f7291c9c.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/7090-1b8f33a7e4ab4fa2.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/7589-d873cb8c6f70f280.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/7653-bba3baa37fe6b45d.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/8123-20378e541c9bcabd.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/8721-15eee3868535b5fc.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/8dc5345f-7a7a5d7d0b2e8ceb.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/9000-f4ca73f2c9ec3783.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/9081a741-4ab3afaf1a4c1899.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/9116-f350349e3a0e9a4e.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/9896-e8374d4ce67219c5.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/finding/%5Bfinding_idx%5D/page-041862cabd893c5c.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/login/page-70ce8da29b9ca9d4.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/menu_write/loading-5cdb6e0819bdae82.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/menu_write/page-3b83bd06f35c13eb.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/page-b39ce33dd460e168.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/product/product_list/edit/%5Bid%5D/page-4058c620a74dfdb3.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/product/product_list/page-d566090f73901303.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/product/product_write/page-e1fbee6386e4a3cd.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/settings/page-e90d26f594c9c8c5.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/start/analysis/page-d462e59ba98cecb8.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/start/order_history/page-95612afbeaf7e05d.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/start/sales/page-24a19f493c1d5296.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/admin/tasting/page-f037830a6a6c70db.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(admin_group)/layout-98c0ace97190de31.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/about/detail/%5Babout_idx%5D/page-e11b75e7413a7696.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/about/page-13ab464b673c01ac.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/category/page-e9749d4081cb487f.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/category/recommend/page-3f2c5dc71a3094d4.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/category/recommend/section/page-ecc7ede1f0da1d5d.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/find/page-ca2304350e2774ee.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/detail/%5Bid%5D/page-488e1493a8832f78.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/order/final/page-6f168077c6aa264b.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/order/page-86d6444c681b5994.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/menu/page-7577822a20001850.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/page-76367130a64c8f8f.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/main/party/page-d9f5d0e6dbb919c4.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/(client_page_group)/not_tb/page-b58ee4f8b8385864.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/layout-daf178117b9aaab5.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/not-found-75fd2b951a5e54f6.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/app/page-ae5056890e6d6d29.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/e37a0b60-b436cec589ebdecd.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/e416a3ff-ad2f4cf3609912f7.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/ec3863c0-88470702c9e7ccf2.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/f4e5f4e1-5b1c28ba886ba3c3.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/fd9d1056-25eab9de154f9f0e.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/framework-964c2d6016b0d731.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/main-3ccbf3d873c83b1d.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/main-app-20c338838cf46ba4.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/pages/_app-11c09b1e93f7270c.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/pages/_error-7ae0e5d1f9ec0862.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-723a2c3684a491a5.js",revision:"vE3qLQky1YculDJZqeCLL"},{url:"/_next/static/css/47bf0e664f10b2a3.css",revision:"47bf0e664f10b2a3"},{url:"/_next/static/media/0147480388d288b9-s.woff2",revision:"e35020e0e8798b03e6ef15c5c577d036"},{url:"/_next/static/media/1bf9d3bd15ef878b-s.woff2",revision:"79ce84d79cba998890d4c42c7289f9d1"},{url:"/_next/static/media/2488b73fbbda06e9-s.woff2",revision:"903f0935ff8385a69eae3ea5769d39fb"},{url:"/_next/static/media/34aa362d39abe17a-s.woff2",revision:"a676f45a60ad9efe35ead739bee46fe5"},{url:"/_next/static/media/38f1353136457b55-s.woff2",revision:"8541392276db00ce3929cc4811147008"},{url:"/_next/static/media/52c4e967c8df92fc-s.woff2",revision:"1a6fe4d7f79a508869b9a52fbd2c681a"},{url:"/_next/static/media/72b894ddc38a7cc1-s.p.woff2",revision:"177443ecf5f4345be565642313677c86"},{url:"/_next/static/media/7342cddaba95545d-s.woff2",revision:"a19fa579264c33a36b7af8c86a4f7f5e"},{url:"/_next/static/media/9cb252b81356e010-s.woff2",revision:"33f07da91237cb596755b7f2110890a0"},{url:"/_next/static/media/b0a67f1572332d7a-s.p.woff2",revision:"891e6d88e31e2e256633850ce196a15f"},{url:"/_next/static/media/b23db1c6f4ff0acf-s.woff2",revision:"ce6b39999e10093f0b81f0b8bbf23e6f"},{url:"/_next/static/media/c794bebaf209f9fb-s.woff2",revision:"bcb98d901fdd508c8a8908a3c3b188d6"},{url:"/_next/static/media/c7b4fd33734710f7-s.p.woff2",revision:"a638dbdfbdd1933145497484477f802a"},{url:"/_next/static/media/e400baae650c21fc-s.p.woff2",revision:"e48b2c54027e1b42db8984c832cada02"},{url:"/_next/static/media/f388ce6667079c43-s.p.woff2",revision:"fa2b35db2074c8b35e4c96aac6bce1e5"},{url:"/_next/static/media/f9c175e84c2746b9-s.woff2",revision:"578e01ef538af3fcb273b176c4ddc33c"},{url:"/_next/static/media/fbb17e27025aba06-s.woff2",revision:"6a5b1e1f06d95b436f25b4c9b94fe26d"},{url:"/_next/static/media/fc624604eae89eb3-s.p.woff2",revision:"5cf1ccd8e72429f26e691240da14cbf4"},{url:"/_next/static/media/roboto-cyrillic-300-normal.17dc3449.woff",revision:"17dc3449"},{url:"/_next/static/media/roboto-cyrillic-300-normal.88798412.woff2",revision:"88798412"},{url:"/_next/static/media/roboto-cyrillic-400-normal.19f93502.woff",revision:"19f93502"},{url:"/_next/static/media/roboto-cyrillic-400-normal.2d9c9d60.woff2",revision:"2d9c9d60"},{url:"/_next/static/media/roboto-cyrillic-500-normal.6e4060e5.woff",revision:"6e4060e5"},{url:"/_next/static/media/roboto-cyrillic-500-normal.aa68ea54.woff2",revision:"aa68ea54"},{url:"/_next/static/media/roboto-cyrillic-700-normal.1ea775f3.woff",revision:"1ea775f3"},{url:"/_next/static/media/roboto-cyrillic-700-normal.258a358e.woff2",revision:"258a358e"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.cd7c5715.woff2",revision:"cd7c5715"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.de365ce5.woff",revision:"de365ce5"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.02e18372.woff",revision:"02e18372"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.d7827ae3.woff2",revision:"d7827ae3"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a05054d8.woff",revision:"a05054d8"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a1b5c90d.woff2",revision:"a1b5c90d"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.46ca43b3.woff",revision:"46ca43b3"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.dd3651fb.woff2",revision:"dd3651fb"},{url:"/_next/static/media/roboto-greek-300-normal.122e04f2.woff",revision:"122e04f2"},{url:"/_next/static/media/roboto-greek-300-normal.25dc89b0.woff2",revision:"25dc89b0"},{url:"/_next/static/media/roboto-greek-400-normal.63e6dc18.woff2",revision:"63e6dc18"},{url:"/_next/static/media/roboto-greek-400-normal.e3b5876b.woff",revision:"e3b5876b"},{url:"/_next/static/media/roboto-greek-500-normal.533b03d2.woff2",revision:"533b03d2"},{url:"/_next/static/media/roboto-greek-500-normal.55bbf615.woff",revision:"55bbf615"},{url:"/_next/static/media/roboto-greek-700-normal.432b858b.woff2",revision:"432b858b"},{url:"/_next/static/media/roboto-greek-700-normal.b3d9786c.woff",revision:"b3d9786c"},{url:"/_next/static/media/roboto-greek-ext-300-normal.69dd9b06.woff",revision:"69dd9b06"},{url:"/_next/static/media/roboto-greek-ext-300-normal.bc5ce703.woff2",revision:"bc5ce703"},{url:"/_next/static/media/roboto-greek-ext-400-normal.2b547ded.woff2",revision:"2b547ded"},{url:"/_next/static/media/roboto-greek-ext-400-normal.d17f5f2b.woff",revision:"d17f5f2b"},{url:"/_next/static/media/roboto-greek-ext-500-normal.7ea6cffa.woff2",revision:"7ea6cffa"},{url:"/_next/static/media/roboto-greek-ext-500-normal.fcc37f63.woff",revision:"fcc37f63"},{url:"/_next/static/media/roboto-greek-ext-700-normal.950178dd.woff",revision:"950178dd"},{url:"/_next/static/media/roboto-greek-ext-700-normal.a8d16efd.woff2",revision:"a8d16efd"},{url:"/_next/static/media/roboto-latin-300-normal.73b81266.woff",revision:"73b81266"},{url:"/_next/static/media/roboto-latin-300-normal.a4eae32d.woff2",revision:"a4eae32d"},{url:"/_next/static/media/roboto-latin-400-normal.d6d4cf7b.woff",revision:"d6d4cf7b"},{url:"/_next/static/media/roboto-latin-400-normal.f2894edc.woff2",revision:"f2894edc"},{url:"/_next/static/media/roboto-latin-500-normal.3170fd9a.woff2",revision:"3170fd9a"},{url:"/_next/static/media/roboto-latin-500-normal.cdad2023.woff",revision:"cdad2023"},{url:"/_next/static/media/roboto-latin-700-normal.71b2beb8.woff2",revision:"71b2beb8"},{url:"/_next/static/media/roboto-latin-700-normal.f3ddaf9d.woff",revision:"f3ddaf9d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.37d4965d.woff2",revision:"37d4965d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.b9b4688a.woff",revision:"b9b4688a"},{url:"/_next/static/media/roboto-latin-ext-400-normal.21abc8c8.woff2",revision:"21abc8c8"},{url:"/_next/static/media/roboto-latin-ext-400-normal.9600b4a6.woff",revision:"9600b4a6"},{url:"/_next/static/media/roboto-latin-ext-500-normal.41845160.woff",revision:"41845160"},{url:"/_next/static/media/roboto-latin-ext-500-normal.85ebfb55.woff2",revision:"85ebfb55"},{url:"/_next/static/media/roboto-latin-ext-700-normal.6af98c24.woff2",revision:"6af98c24"},{url:"/_next/static/media/roboto-latin-ext-700-normal.b6be88e2.woff",revision:"b6be88e2"},{url:"/_next/static/media/roboto-vietnamese-300-normal.44e9a722.woff",revision:"44e9a722"},{url:"/_next/static/media/roboto-vietnamese-300-normal.b3d3e960.woff2",revision:"b3d3e960"},{url:"/_next/static/media/roboto-vietnamese-400-normal.b339d926.woff",revision:"b339d926"},{url:"/_next/static/media/roboto-vietnamese-400-normal.c95fc061.woff2",revision:"c95fc061"},{url:"/_next/static/media/roboto-vietnamese-500-normal.65b57a7f.woff",revision:"65b57a7f"},{url:"/_next/static/media/roboto-vietnamese-500-normal.7f8c0554.woff2",revision:"7f8c0554"},{url:"/_next/static/media/roboto-vietnamese-700-normal.72bf832f.woff2",revision:"72bf832f"},{url:"/_next/static/media/roboto-vietnamese-700-normal.82ca662a.woff",revision:"82ca662a"},{url:"/_next/static/vE3qLQky1YculDJZqeCLL/_buildManifest.js",revision:"e7423757b55eb94c89ccbae327ff7e9e"},{url:"/_next/static/vE3qLQky1YculDJZqeCLL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/firebase-messaging-sw.js",revision:"3170fac24fe853de6fb75b96e9f704da"},{url:"/img/beginner_icon.png",revision:"3c6e9e0a8804ea8385378701da79b77b"},{url:"/img/bottom_icon.png",revision:"aca24994d52b16e493ec7bf396d63e81"},{url:"/img/explorer_icon.png",revision:"094901a6620da12a9c13642a73b8dd1d"},{url:"/img/header_logo.png",revision:"802adc34e59cfe1d880f83c0223c7010"},{url:"/img/icon/american_whiskey.png",revision:"34549772a22630413eee20b49b61c368"},{url:"/img/icon/brandy.png",revision:"e0e2e77f34d7bce1b893ca1c173a0919"},{url:"/img/icon/cocktail.png",revision:"2857823ddecc52fd3665b09afafd2e29"},{url:"/img/icon/malt_whiskey.png",revision:"1f2d527da1bb2fa9c683050709ed7119"},{url:"/img/icon/origin/wheat_origin.png",revision:"55a2dc0fe31e7312f18e80eac06af1c3"},{url:"/img/icon/rum.png",revision:"e19508f43a41ad053a8d60beba83c7ab"},{url:"/img/icon/scotch.png",revision:"1045aa03b326c5a79019dcf5102a56dc"},{url:"/img/icon/tequila.png",revision:"a5abd5e6636542b68ae1ffe02c5f26b8"},{url:"/img/icon/wine.png",revision:"8e48ceefbff3dde5c6d2ea69307b17ac"},{url:"/img/kakao_login_img.png",revision:"b6ebaffbd18f82df9635f2cd95b093ef"},{url:"/img/lightHead.png",revision:"c7017f2319ae5a19bed48997ff45dbf2"},{url:"/img/old_water_icon.png",revision:"10a3c02250d4cb6ad1e075499cae8d5f"},{url:"/img/ready_file.png",revision:"2ea98bd31141b19edcc31da067066506"},{url:"/img/test/test_image.jpeg",revision:"781bc5e2c28a9fa904cb4c3f4efe0c55"},{url:"/pwa_icon/icon-192x192.png",revision:"d563ed5d717ad5f85881b766898a8c54"},{url:"/pwa_icon/icon-256x256.png",revision:"c62fffe2abf62f3c1082d1b65aa731de"},{url:"/pwa_icon/icon-384x384.png",revision:"cd51e58843a3eb5e76c187cc4f59a326"},{url:"/pwa_icon/icon-512x512.png",revision:"191ddbbe8a9b32ece4b4b0f8075fa12c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:a,state:t})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
