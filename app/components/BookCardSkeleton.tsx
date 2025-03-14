export default function BookCardSkeleton() {
    return (
        <div className="bg-card-bg rounded-xl p-6 shadow-md animate-pulse">
            <div className="flex gap-6 items-stretch">
                <div className="w-16 h-24 sm:w-24 sm:h-36 rounded-lg bg-skeleton/50" />
                <div className="flex-1 space-y-4 flex flex-col justify-between sm:flex-row">
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="h-6 bg-skeleton/50 rounded w-3/4" />
                        <div className="space-y-3 h-5 bg-skeleton/30 rounded w-2/5" />
                    </div>
                    <div className="self-end sm:self-center">
                        <div className="bg-skeleton/50 rounded-md w-20 h-6 sm:w-24 sm:h-8" />
                    </div>
                </div>
            </div>
        </div>
    );
}
