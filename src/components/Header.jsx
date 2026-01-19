export default function Header({
  query,
  onQueryChange,
  cartCount,
  onOpenCart,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  categories,
}) {
  return (
    <header className="header">
      <div className="logo">MiniMarket</div>

      <input
        className="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Поиск товара…"
      />

      <select
        className="select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="ALL">Все категории</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="NONE">Без сортировки</option>
        <option value="PRICE_ASC">Цена ↑</option>
        <option value="PRICE_DESC">Цена ↓</option>
      </select>

      <button className="btn btn--primary" onClick={onOpenCart}>
        Корзина ({cartCount})
      </button>
    </header>
  );
}
