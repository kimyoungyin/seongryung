import { Book } from "@/app/utils/db";
import { getImageSrc } from "@/app/utils/util";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({
    bookObj,
    isAboutLocation,
}: {
    bookObj: Book;
    isAboutLocation: boolean;
}) {
    return (
        <div
            key={bookObj.id}
            className={
                (isAboutLocation
                    ? "bg-white"
                    : "bg-card-bg rounded-xl shadow-md") + " p-6"
            }
        >
            <div className="flex gap-6">
                <div className="relative sm:w-24 sm:h-36 w-16 h-24 self-center">
                    <Image
                        src={getImageSrc(bookObj.location, bookObj.id)}
                        alt={bookObj.title}
                        fill
                        sizes="(min-width: 640px) 6rem, 4rem" // w-24, w-16
                        className="object-cover rounded-lg"
                        quality={80}
                    />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-text-primary">
                            {bookObj.title}
                        </h2>
                        <div className="space-y-1 flex flex-col gap-1 text-text-secondary text-md md:text-lg lg:text-xl">
                            {bookObj.author && <p>작가: {bookObj.author}</p>}
                            {bookObj.season && <p>시즌: {bookObj.season}기</p>}
                            {bookObj.total_num && (
                                <p>총 권수: {bookObj.total_num}권</p>
                            )}
                            {bookObj.comment && (
                                <p className="mt-3 text-text-primary">
                                    {bookObj.comment}
                                </p>
                            )}
                        </div>
                    </div>
                    {!isAboutLocation && (
                        <div className="self-end sm:self-center text-xs md:text-sm lg:text-md">
                            <Link
                                href={`/location/${bookObj.id}`}
                                className="bg-skeleton text-text-primary px-4 py-2 rounded-md hover:bg-skeleton-hover transition-colors whitespace-nowrap"
                            >
                                위치 보기 →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
