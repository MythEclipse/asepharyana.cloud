if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),o={module:{uri:c},exports:t,require:r};a[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/ASEPHARYANA.png",revision:"ec67d5018d8aee5630d3d44d206b8266"},{url:"/ASEPHARYANA.svg",revision:"ac20bf06531b42db185748a06558881f"},{url:"/Logo.svg",revision:"ad6b0125b587ca1898b7a734724389c1"},{url:"/Project1.png",revision:"d066a1fffcde8d5ee7335023db7e90e2"},{url:"/Project2.png",revision:"7253c5c8bbd8f5bda8bdb0dcfa8f78e9"},{url:"/_next/static/5m5HS5CaEALMq3L5WJHzD/_buildManifest.js",revision:"3371b9bf37c707257c01603fb111292c"},{url:"/_next/static/5m5HS5CaEALMq3L5WJHzD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1168-c156ad6028f68a5d.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/12514cef-111e565a50346ed9.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/1513-74e0b057b08409ca.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/2093-0464403a57e4efcb.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/2423-e1350f71429aee26.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/4120-200a140b76af78c2.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/4387-62522a1be648ce45.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/44c83eb9-ce151c489c618c82.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/4748-b6822d6158b99601.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/570-4ea3d335a015599d.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/6853-d47a67db052ed09d.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/8357-726be70090d5013d.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/8564-cce5f8d39547258f.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/8f130de0-86ba453085e377a8.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/9730-409a94bec4083ca3.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/9f4925d7-1247c8145a5f1159.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/a8c0fcec-4bbb28ce5455be75.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(auth)/login/page-7f17796b2ffc13e1.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(auth)/register/page-e7298c9608b4f111.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/complete-anime/%5Bslug%5D/loading-a8295115edbf4273.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/complete-anime/%5Bslug%5D/page-dc033a54af520b25.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/detail/%5Bslug%5D/loading-f829311834b8ad65.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/detail/%5Bslug%5D/page-0a5f368f289df0c1.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/full/%5Bslug%5D/loading-7912ba71e7c7c36e.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/full/%5Bslug%5D/page-6eaa46684b26fda8.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/genre/%5B%5B...slug%5D%5D/loading-6150aef2f3a56912.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/genre/%5B%5B...slug%5D%5D/page-5a1d82f939e1375e.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/layout-fda8871418f5b0f7.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/ongoing-anime/%5Bslug%5D/loading-b5d6cdda00023d5d.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/ongoing-anime/%5Bslug%5D/page-154be291b98c9e43.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/page-81619a3159f534ec.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/search/%5Bslug%5D/loading-2753201c12b256b4.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/(anime)/anime/search/%5Bslug%5D/page-3441ffb5b1eaf94b.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/chapter/%5BchapterId%5D/loading-69ad2effac180a90.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/chapter/%5BchapterId%5D/page-cd3685b268ebea17.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/detail/%5BkomikId%5D/loading-488543ea0f6d81ab.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/detail/%5BkomikId%5D/page-33166c6c5d6ce0ea.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/layout-53dec12c86295cc1.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/loading-d363bcaa9750dcab.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/manga/page/%5BpageNumber%5D/loading-7daaf88db62c8e24.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/manga/page/%5BpageNumber%5D/page-5b3b65d77cf6ec20.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/manhua/page/%5BpageNumber%5D/loading-070d801b2e8ae496.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/manhua/page/%5BpageNumber%5D/page-8dcd581de5fa2fc7.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/manhwa/page/%5BpageNumber%5D/loading-c21749004d24b852.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/manhwa/page/%5BpageNumber%5D/page-a2c607282765f14e.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/page-81c2bd2a9b7002e4.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/search/%5Bslug%5D/%5Bpage%5D/loading-e0be7b218c030626.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/komik/search/%5Bslug%5D/%5Bpage%5D/page-dcea1221d86cb87e.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/(project)/sosmed/page-e691cc20412d0ae1.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/_not-found/page-beafe419c4b32ae4.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/docs/page-c02121e9eba98256.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/layout-0faad038c3b1999c.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/not-found-f814daea49f66f02.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/page-6d26200f12c426a0.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/project/page-278da6780e36454f.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/app/test/page-628a81c206aafc9e.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/b59efc48-ed7449fb473f7f6b.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/da31e3a9-94995cf3dfdafbe2.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/e1bbbf97-e0bd128d3eb58b81.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/fe6a3f1d-f09c03019740d408.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/framework-20afca218c33ed8b.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/main-1856467c46b9b04d.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/main-app-f1f0c14213bb94c1.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/pages/_app-bdf7cf8e887cac7b.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/pages/_error-b3cdf457cddaef11.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-9d5ac6a9aa5bd146.js",revision:"5m5HS5CaEALMq3L5WJHzD"},{url:"/_next/static/css/41d74562ce66740e.css",revision:"41d74562ce66740e"},{url:"/_next/static/css/8465f1863f8148f4.css",revision:"8465f1863f8148f4"},{url:"/_next/static/css/ca9d1a9410f9e1e4.css",revision:"ca9d1a9410f9e1e4"},{url:"/_next/static/css/ea28d5ec38f86019.css",revision:"ea28d5ec38f86019"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_offline.html",revision:"a90fde6309934e886f11c152fd02dd39"},{url:"/carousel-1.svg",revision:"7ad2f7114a8c7148a1763d1b38d87bb8"},{url:"/carousel-2.svg",revision:"f4c28c56559343cca570d6a9d2537a16"},{url:"/carousel-3.svg",revision:"84a379f04c07c56183d8c88ff1c624ee"},{url:"/favicon.png",revision:"b8135d43bae74dc57e76c11602ebdeb8"},{url:"/github.svg",revision:"d2a06b01602201a2f33c6c0f399cc936"},{url:"/image-1.jpg",revision:"c228c5e4232b2d9fd851e46270087924"},{url:"/loading.gif",revision:"2e61942c4b2871d61c27e15f4082deee"},{url:"/logo.png",revision:"01881d1e4a7e01d6222e9521f7384740"},{url:"/manifest.json",revision:"4620bf6a57423b60856e39333c8bd5ee"},{url:"/profil.jpg",revision:"9aa216f68361aee8996a37994f22f270"},{url:"/profil.png",revision:"4673a4234e3a259a7a48fa118486a34b"},{url:"/profil.svg",revision:"89a65c68a7cec92d977c68c346c4a287"},{url:"/profile-circle-svgrepo-com.svg",revision:"44e09c0b5876b2a6a0c1921ccc2fe2e4"},{url:"/profile-picture-5.jpg",revision:"9ad4a42c97ad2a496d34fbd95223d654"},{url:"/sitemap-0.xml",revision:"41843d418a12b2c92e218dc63533de96"},{url:"/sitemap.xml",revision:"655e149841578e53ded350f3162949d5"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"12854fc11fdc3d498acbb4892fc90fbb"},{url:"/webAnime.png",revision:"ba0dbfede69cbdfbe86f915853056900"},{url:"/webKomik.png",revision:"6cc728418dc2ec0aa53037d856852f51"},{url:"/websosmed.png",revision:"4d327490a2ff93927c7b912f8cc67448"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
