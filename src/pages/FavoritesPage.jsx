import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

export default function FavoritesPage({ favs, onToggleFav, onAdd }) {
  const favProducts = products.filter((p) => favs.includes(p.id));

  return (
    <div className="main">
      <div className="pageHead">
        <h1 className="title">Избранное</h1>
        <Link className="btn btn--ghost" to="/">← В каталог</Link>
      </div>

      {favProducts.length === 0 ? (
        <div className="panel">
          <p className="muted">Пока ничего нет в избранном.</p>
          <Link className="btn btn--primary" to="/">Перейти в каталог</Link>
        </div>
      ) : (
        <ProductGrid
          products={favProducts}
          onAdd={onAdd}
          favs={favs}
          onToggleFav={onToggleFav}
        />
      )}
    </div>
  );
}
