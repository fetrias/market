import ProductCard from './ProductCard';

export default function ProductsGrid({ products, onEdit, onDelete }) {
  if (!products.length) {
    return <div className="empty">Товары не найдены</div>;
  }

  return (
    <div className="productsGrid">
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