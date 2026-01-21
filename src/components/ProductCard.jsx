import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd, isFav, onToggleFav }) {
  return (
    <div className="card">
      <div className="card__top">
        <Link to={`/product/${product.id}`} className="card__imgLink">
          <img className="card__img" src={product.image} alt={product.title} />
        </Link>

        <button
          className={`fav ${isFav ? "fav--active" : ""}`}
          onClick={() => onToggleFav(product.id)}
          aria-label="Add to favorites"
          title="В избранное"
        >
          ♥
        </button>
      </div>

      <div className="card__body">
        <Link to={`/product/${product.id}`} className="card__titleLink">
          <div className="card__title">{product.title}</div>
        </Link>

        <div className="card__meta">
          <span className="badge">{product.category}</span>
          <span className="price">{product.price} ₽</span>
        </div>

        <button className="btn" onClick={() => onAdd(product)}>
          В корзину
        </button>
      </div>
    </div>
  );
}
