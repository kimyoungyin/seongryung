export const LOCATION_IMAGE_SIZE = {
    width: 2667,
    height: 2125,
};

/** 위치 지도: `fill` + ImageKit loader용 — 실제 렌더 슬롯 너비(sm:max-w-3xl, px-4) 기준 */
export const LOCATION_MAP_IMAGE_SIZES =
    "(max-width: 639px) calc(100vw - 2rem), (min-width: 640px) min(736px, calc(100vw - 2rem))";
