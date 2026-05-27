export default function ProductSkeleton() {
  return (
    <div className="theme-card rounded-lg border p-4">
      <div className="animate-pulse space-y-3">
        <div className="h-5 w-2/5 rounded bg-stone-200/80 dark:bg-slate-700" />
        <div className="flex gap-2">
          <div className="h-7 w-16 rounded bg-stone-200/80 dark:bg-slate-700" />
          <div className="h-7 w-24 rounded bg-stone-200/80 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
