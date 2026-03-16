import { API_BASE_URL } from '../api';

export default function ProductCard({ product, onEdit, onDelete }) {
  const imageUrl = `${API_BASE_URL}${product.image}`;

  return (
    <article className="card">
      <img className="card__image" src={imageUrl} alt={product.name} />
      <div className="card__body">
        <div className="card__category">{product.category}</div>
        <h3 className="card__title">{product.name}</h3>
        <p className="card__description">{product.description}</p>
        <div className="card__meta">
          <span>Цена: {product.price} ₽</span>
          <span>Склад: {product.stock} шт.</span>
          <span>Рейтинг: {product.rating}</span>
        </div>
        <div className="card__actions">
          <button className="btn" onClick={() => onEdit(product)}>
            Изменить
          </button>
          <button className="btn btn--danger" onClick={() => onDelete(product.id)}>
            Удалить
          </button>
        </div>
      </div>
    </article>
  );
}