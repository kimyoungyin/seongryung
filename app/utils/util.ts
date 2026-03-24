/** ImageKit URL 엔드포인트(끝 슬래시 없음). 배포 환경에서는 env로 덮어쓰기 권장. */
// "/locations"까지임
const imageKitBase = (
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ??
    "https://ik.imagekit.io/27af9kigq"
).replace(/\/$/, "");

export const getImageSrc = (location: number, id: number) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE}/${location}/${id}.jpg`;

export const getLocationImageSrc = (location: number) =>
    `${imageKitBase}/location${location}.jpg`;
