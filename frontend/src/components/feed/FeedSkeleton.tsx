export const FeedSkeleton = () => {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="bg-[#183D3D] rounded-xl h-52 w-64 animate-pulse"
                />
            ))}
        </div>
    );
};