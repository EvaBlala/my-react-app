import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd, favs, onToggleFav }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={onAdd}
          isFav={favs.includes(p.id)}
          onToggleFav={onToggleFav}
        />
      ))}
    </div>
  );
}
