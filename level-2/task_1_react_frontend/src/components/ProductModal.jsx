import { AlertTriangle, X } from 'lucide-react';
import ProductForm from './ProductForm';

export default function ProductModal({
  mode,
  product,
  isSaving,
  onClose,
  onSubmit,
  onConfirm,
}) {
  if (!product) {
    return null;
  }

  const isDelete = mode === 'delete';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-stone-950/50 p-4">
      <div className="theme-surface w-full max-w-md rounded-lg border">
        <div className="theme-divider flex items-center justify-between border-b px-5 py-4">
          <div>
            <p className="label">{isDelete ? 'Confirm action' : 'Edit item'}</p>
            <h2 className="theme-text text-lg font-extrabold">
              {isDelete ? 'Delete product' : product.name}
            </h2>
          </div>
          <button
            type="button"
            className="theme-muted flex size-9 items-center justify-center rounded-md hover:bg-black/5"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {isDelete ? (
            <div className="space-y-5">
              <div className="theme-danger-soft flex gap-3 rounded-md p-4">
                <AlertTriangle className="mt-0.5 shrink-0" size={20} />
                <p className="text-sm font-medium">
                  Delete {product.name}? This removes it from the API inventory.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onConfirm}
                  disabled={isSaving}
                >
                  {isSaving ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ) : (
            <ProductForm
              initialProduct={product}
              isSaving={isSaving}
              submitLabel="Save Changes"
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
