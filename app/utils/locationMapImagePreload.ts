import { getLocationImageSrc } from "@/app/utils/util";
import { buildImageKitUrl } from "@/imageKitLoader";

/**
 * `next/dist/shared/lib/image-config` 기본값과 동기화 (next.config에서 덮어쓰지 않은 경우).
 * `sizes`에 리터럴 `Nvw`가 없으면 `getWidths`는 전체 합집합을 srcset 후보로 씁니다.
 */
const NEXT_IMAGE_SIZES = [
    16, 32, 48, 64, 96, 128, 256, 384,
] as const;
const NEXT_DEVICE_SIZES = [
    640, 750, 828, 1080, 1200, 1920, 2048, 3840,
] as const;

const ALL_WIDTH_CANDIDATES: readonly number[] = [
    ...NEXT_IMAGE_SIZES,
    ...NEXT_DEVICE_SIZES,
].sort((a, b) => a - b);

const TWO_REM_PX = 32;

/** `LOCATION_MAP_IMAGE_SIZES`와 동일한 가정: 좌우 `px-4`(2rem)만큼 제외, 데스크톱 슬롯 상한 736px */
export function getLocationMapSlotWidthCssPx(viewportWidth: number): number {
    const inner = viewportWidth - TWO_REM_PX;
    if (viewportWidth <= 639) {
        return Math.max(1, inner);
    }
    return Math.max(1, Math.min(736, inner));
}

/**
 * 브라우저가 `w` 서술자 srcset에서 고를 법한 너비(가장 작은 `allSizes` 중 필요 픽셀 이상).
 */
export function pickNextImageSrcsetWidth(
    slotCssPx: number,
    devicePixelRatio: number,
    candidates: readonly number[] = ALL_WIDTH_CANDIDATES,
): number {
    const dpr = Number.isFinite(devicePixelRatio)
        ? Math.min(Math.max(devicePixelRatio, 1), 3)
        : 1;
    const need = Math.ceil(slotCssPx * dpr);
    for (const w of candidates) {
        if (w >= need) return w;
    }
    return candidates[candidates.length - 1]!;
}

/** 위치 지도 `<Image>`(품질 미지정)와 동일한 q=75 */
const LOCATION_MAP_IMAGE_QUALITY = 75;

export function getLocationMapPreloadUrl(
    location: number,
    viewportWidth: number,
    devicePixelRatio: number,
): string {
    const src = getLocationImageSrc(location);
    const slot = getLocationMapSlotWidthCssPx(viewportWidth);
    const width = pickNextImageSrcsetWidth(slot, devicePixelRatio);
    return buildImageKitUrl(src, width, LOCATION_MAP_IMAGE_QUALITY);
}
