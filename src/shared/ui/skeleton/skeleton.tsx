import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib";

export function Skeleton({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/70 dark:bg-zinc-800/70",
        className,
      )}
      {...rest}
    />
  );
}
