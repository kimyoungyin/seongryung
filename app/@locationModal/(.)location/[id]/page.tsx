import GobackButton from "@/app/components/GoBackButton";
import { getBookLocation } from "@/app/utils/actions";
import Image from "next/image";
import { LOCATION_IMAGE_SIZE } from "@/app/utils/constants";
interface PageProps {
    params: Promise<{ id: number }>;
}
// mt-3(0.75rem)을 빼기
const LOCATION_IMAGE_RATIO_CLASSNAME = "pt-[calc(79.67754031%-0.75rem)]";

export default async function Page(props: PageProps) {
    const params = await props.params;
    const bookId = Number(await params.id);
    const bookInfo = await getBookLocation(bookId);

    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-base-bg/75 transition-opacity overflow-hidden"
                aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl px-4 pb-3 flex flex-col items-center">
                        {bookInfo.location ? (
                            <Image
                                src={`/location${bookInfo.location}.jpg`}
                                alt={bookInfo.location + `번 책장 위치`}
                                width={LOCATION_IMAGE_SIZE.width}
                                height={LOCATION_IMAGE_SIZE.height}
                                className="w-full"
                            />
                        ) : (
                            <div
                                className={
                                    LOCATION_IMAGE_RATIO_CLASSNAME +
                                    " mt-3 w-full bg-card-bg rounded-xl animate-pulse"
                                }
                            />
                        )}
                        <div className="px-4 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <GobackButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
