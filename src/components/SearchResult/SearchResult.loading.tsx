import { Skeleton } from '@nextui-org/react'

export const SearchResultLoadingFiles = () => {
  return (
    <div className="flex gap-7 flex-col">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex gap-6 items-center">
          <Skeleton className="h-5 w-5 rounded-full" />

          <div className="flex-1 flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="h-3.5 w-2/5 rounded" />
              <Skeleton className="h-3 w-1/5 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
