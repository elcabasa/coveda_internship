import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProductForm({
  initialProduct,
  isSaving,
  submitLabel = 'Add Product',
  onSubmit,
}) {
  const [name, setName] = useState(initialProduct?.name || '');
  const [price, setPrice] = useState(initialProduct?.price || '');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setName(initialProduct?.name || '');
    setPrice(initialProduct?.price || '');
    setValidationError('');
  }, [initialProduct]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName) {
      setValidationError('Product name is required.');
      return;
    }

    if (price === '' || Number.isNaN(numericPrice) || numericPrice < 0) {
      setValidationError('Enter a valid price of 0 or more.');
      return;
    }

    setValidationError('');
    onSubmit({ name: trimmedName, price: numericPrice });

    if (!initialProduct) {
      setName('');
      setPrice('');
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor={initialProduct ? 'edit-name' : 'name'}>
          Product name
        </label>
        <input
          className="input"
          id={initialProduct ? 'edit-name' : 'name'}
          type="text"
          placeholder="Wireless keyboard"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor={initialProduct ? 'edit-price' : 'price'}>
          Price
        </label>
        <input
          className="input"
          id={initialProduct ? 'edit-price' : 'price'}
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>

      {validationError ? (
        <p className="theme-danger-soft rounded-md px-3 py-2 text-sm font-medium">
          {validationError}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full" disabled={isSaving}>
        <Save size={16} />
        {isSaving ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
