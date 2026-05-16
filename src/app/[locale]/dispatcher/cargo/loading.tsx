import { CargoTableSkeleton } from "@/widgets/cargo-table";
import { Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:py-12">
      <header className="flex flex-col gap-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </header>
      <Skeleton className="h-20 w-full rounded-lg" />
      <CargoTableSkeleton rows={6} />
    </section>
  );
}
