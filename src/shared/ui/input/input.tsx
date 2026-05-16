import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/shared/lib";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-zinc-800 dark:bg-zinc-900 dark:placeholder:text-zinc-500",
        invalid && "border-rose-500 focus-visible:ring-rose-500",
        className,
      )}
      {...rest}
    />
  );
});
