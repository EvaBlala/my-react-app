import { NavLink, useLocation } from "react-router-dom";

export default function Header({
  query,
  onQueryChange,
  cartCount,
  favCount,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  categories,
}) {
  const location = useLocation();
  const onCatalog = location.pathname === "/";

  return (
    <header className="header">
      <div className="logo">MiniMarket</div>

      <nav className="nav">
        <NavLink className="tab" to="/">Каталог</NavLink>
        <NavLink className="tab" to="/favorites">Избранное ({favCount})</NavLink>
        <NavLink className="tab" to="/cart">Корзина ({cartCount})</NavLink>
      </nav>

      {/* Поиск/фильтры показываем только на каталоге */}
      {onCatalog && (
        <div className="tools">
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
              <option key={c} value={c}>{c}</option>
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
        </div>
      )}
      <Header
  query={query}
  onQueryChange={setQuery}
  cartCount={cartCount}
  favCount={favs.length}
  category={category}
  onCategoryChange={setCategory}
  sort={sort}
  onSortChange={setSort}
  categories={categories}
/>

    </header>
  );
}
