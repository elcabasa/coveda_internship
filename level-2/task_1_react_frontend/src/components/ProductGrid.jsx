import EmptyState from './EmptyState';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

export default function ProductGrid({ isLoading, products, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="grid gap-3 p-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-3 p-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
