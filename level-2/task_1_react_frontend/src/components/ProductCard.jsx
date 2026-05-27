import { Pencil, Trash2 } from 'lucide-react';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="theme-card grid gap-4 rounded-lg border p-4 transition sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="min-w-0">
        <p className="theme-text truncate text-base font-bold">
          {product.name}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="theme-raised rounded-md border px-2.5 py-1 font-semibold">
            ID #{product.id}
          </span>
          <span className="theme-accent font-bold">
            {currency.format(Number(product.price || 0))}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onEdit(product)}
          aria-label={`Edit ${product.name}`}
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(product)}
          aria-label={`Delete ${product.name}`}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </article>
  );
}
