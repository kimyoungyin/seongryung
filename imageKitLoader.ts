import type { ImageLoaderProps } from "next/image";

const IK_HOST = "ik.imagekit.io";
console.log("imageKitLoader");
/**
 * 전역 커스텀 로더 — ImageKit만 `tr` 적용.
 * 로컬·Supabase 등은 `<Image>`가 `src` 그대로 쓰므로 여기로 오지 않거나,
 * 오더라도 원본 URL을 반환합니다 (`loader: custom`일 때 `/_next/image`는 사용 불가).
 */
export default function imageKitLoader({
    src,
    width,
    quality,
}: ImageLoaderProps): string {
    const q = quality ?? 75;

    if (src.startsWith("/")) {
        return src;
    }

    try {
        const url = new URL(src);
        if (url.hostname === IK_HOST) {
            url.searchParams.set("tr", `w-${width},q-${q},f-auto`);
            return url.toString();
        }
    } catch {
        /* not a valid absolute URL */
    }

    return src;
}
