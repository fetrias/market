import { useEffect, useState } from 'react';

const EMPTY_FORM = {
  name: '',
  category: '',
  description: '',
  price: '',
  stock: '',
  rating: '',
  image: '/assets/images/products/bird_friends.jpg'
};

export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!open) return;

    if (mode === 'edit' && initialProduct) {
      setForm({
        name: initialProduct.name,
        category: initialProduct.category,
        description: initialProduct.description,
        price: String(initialProduct.price),
        stock: String(initialProduct.stock),
        rating: String(initialProduct.rating),
        image: initialProduct.image
      });
      return;
    }

    setForm(EMPTY_FORM);
  }, [open, mode, initialProduct]);

  if (!open) return null;

  const title = mode === 'edit' ? 'Редактирование товара' : 'Создание товара';

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      id: initialProduct?.id,
      name: form.name.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      image: form.image.trim()
    };

    if (!payload.name || !payload.category || !payload.description || !payload.image) {
      alert('Заполните все текстовые поля');
      return;
    }

    if (!Number.isFinite(payload.price) || payload.price < 0) {
      alert('Цена должна быть неотрицательным числом');
      return;
    }

    if (!Number.isInteger(payload.stock) || payload.stock < 0) {
      alert('Количество на складе должно быть целым неотрицательным числом');
      return;
    }

    if (!Number.isFinite(payload.rating) || payload.rating < 0 || payload.rating > 5) {
      alert('Рейтинг должен быть в диапазоне 0–5');
      return;
    }

    onSubmit(payload);
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal__header">
          <h3>{title}</h3>
          <button className="btn" onClick={onClose}>✕</button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Название
            <input value={form.name} onChange={handleChange('name')} />
          </label>
          <label>
            Категория
            <input value={form.category} onChange={handleChange('category')} />
          </label>
          <label>
            Описание
            <textarea value={form.description} onChange={handleChange('description')} rows={3} />
          </label>
          <label>
            Цена
            <input value={form.price} onChange={handleChange('price')} inputMode="numeric" />
          </label>
          <label>
            Количество на складе
            <input value={form.stock} onChange={handleChange('stock')} inputMode="numeric" />
          </label>
          <label>
            Рейтинг
            <input value={form.rating} onChange={handleChange('rating')} inputMode="decimal" />
          </label>
          <label>
            Путь к фото
            <input value={form.image} onChange={handleChange('image')} />
          </label>
          <div className="modal__actions">
            <button type="button" className="btn" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn--primary">
              {mode === 'edit' ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}