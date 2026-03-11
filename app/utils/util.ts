export const getImageSrc = (location: number, id: number) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE}/${location}/${id}.jpg`;
