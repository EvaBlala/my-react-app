import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductPage({ onAdd }) {
  const { id } = useParams();

  const product = useMemo(() => {
    return products.find((p) => String(p.id) === String(id));
  }, [id]);

  if (!product) {
    return (
      <div className="main">
        <p>Товар не найден.</p>
        <Link to="/" className="btn btn--ghost">← Назад</Link>
      </div>
    );
  }

  return (
    <div className="main">
      <Link to="/" className="btn btn--ghost">← Назад</Link>

      <div className="productPage">
        <img className="productPage__img" src={product.image} alt={product.title} />

        <div className="productPage__info">
          <h1 className="productPage__title">{product.title}</h1>
          <div className="productPage__meta">
            <span className="badge">{product.category}</span>
            <span className="price">{product.price} ₽</span>
          </div>

          <p className="muted">
            Описание: это демо-магазин. Здесь может быть текст про материалы, размеры и доставку.
          </p>

          <button className="btn btn--primary" onClick={() => onAdd(product)}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
