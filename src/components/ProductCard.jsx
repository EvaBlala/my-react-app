import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      {/* Вся карточка = ссылка */}
      <Link to={`/product/${product.id}`} className="card__wholeLink">
        <img className="card__img" src={product.image} alt={product.title} />

        <div className="card__body">
          <div className="card__title">{product.title}</div>

          <div className="card__meta">
            <span className="badge">{product.category}</span>
            <span className="price">{product.price} ₽</span>
          </div>
        </div>
      </Link>

      {/* Кнопка отдельно, чтобы не “кликала ссылку” */}
      <div className="card__actions">
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault(); // не переходим по ссылке
            onAdd(product);
          }}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
