import { Skeleton } from "./ui/skeleton";
export  function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  );
}
