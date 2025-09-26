
export function configureLeafletIcons() {
  // 브라우저 환경에서만 실행
  if (typeof window === 'undefined') return;
  
  // Dynamic import로 SSR 문제 해결
  import('leaflet').then((L) => {
    // 아이콘 이미지들도 dynamic import
    Promise.all([
      import('leaflet/dist/images/marker-icon-2x.png'),
      import('leaflet/dist/images/marker-icon.png'),
      import('leaflet/dist/images/marker-shadow.png')
    ]).then(([iconRetinaUrl, iconUrl, shadowUrl]) => {
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.default.src,
        iconUrl: iconUrl.default.src,
        shadowUrl: shadowUrl.default.src,
      });
    });
  });
}
