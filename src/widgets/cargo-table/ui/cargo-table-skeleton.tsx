import { Skeleton } from "@/shared/ui";

interface Props {
  rows?: number;
}

export function CargoTableSkeleton({ rows = 8 }: Props) {
  const placeholders = Array.from({ length: rows }, (_, i) => i);

  return (
    <>
      {/* Desktop skeleton */}
      <div className="hidden overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:block">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900/40">
            <tr>
              {Array.from({ length: 7 }, (_, i) => (
                <th key={i} className="px-4 py-3">
                  <Skeleton className="h-3 w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {placeholders.map((i) => (
              <tr key={i} className="border-b border-zinc-200 dark:border-zinc-800">
                {Array.from({ length: 7 }, (_, j) => (
                  <td key={j} className="px-4 py-3">
                    <Skeleton className="h-4 w-full max-w-[140px]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile skeleton */}
      <div className="grid gap-3 md:hidden">
        {placeholders.slice(0, 4).map((i) => (
          <div
            key={i}
            className="space-y-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-3 w-1/3" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
