export const getImageSrc = (location: number, id: number) =>
    `${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${location}/${id}.jpg`;
