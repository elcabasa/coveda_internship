import { PackageOpen } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-5 py-12 text-center">
      <div className="theme-card flex size-14 items-center justify-center rounded-md border">
        <PackageOpen size={28} />
      </div>
      <h3 className="theme-text mt-4 text-lg font-extrabold">
        No products found
      </h3>
      <p className="theme-muted mt-2 max-w-sm text-sm">
        Add a new item or adjust the search term to see more inventory.
      </p>
    </div>
  );
}
