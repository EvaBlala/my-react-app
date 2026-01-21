import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { products as initialProducts } from "./data/products";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";

import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import FavoritesPage from "./pages/FavoritesPage";

const CART_KEY = "minimarket_cart_v1";
const FAV_KEY = "minimarket_favs_v1";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("NONE");

  // ✅ CART (load once)
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // ✅ FAVS (load once)
  const [favs, setFavs] = useState(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // ✅ persist cart
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // ✅ persist favs
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }, [favs]);

  function toggleFav(id) {
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (found) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
  }

  function incQty(id) {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  }

  function decQty(id) {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((acc, x) => acc + x.qty, 0);

  const categories = useMemo(() => {
    return Array.from(new Set(initialProducts.map((p) => p.category)));
  }, []);

  const visibleProducts = useMemo(() => {
    let list = [...initialProducts];

    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));

    if (category !== "ALL") list = list.filter((p) => p.category === category);

    if (sort === "PRICE_ASC") list.sort((a, b) => a.price - b.price);
    if (sort === "PRICE_DESC") list.sort((a, b) => b.price - a.price);

    return list;
  }, [query, category, sort]);

  return (
    <div className="page">
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

      <Routes>
        <Route
          path="/"
          element={
            <main className="main">
              <h1 className="title">Каталог</h1>
              <ProductGrid
                products={visibleProducts}
                onAdd={addToCart}
                favs={favs}
                onToggleFav={toggleFav}
              />
            </main>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductPage onAdd={addToCart} favs={favs} onToggleFav={toggleFav} />
          }
        />

        <Route
          path="/favorites"
          element={
            <FavoritesPage favs={favs} onToggleFav={toggleFav} onAdd={addToCart} />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onInc={incQty}
              onDec={decQty}
              onRemove={removeItem}
              onClear={clearCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} onClear={clearCart} />}
        />
      </Routes>
    </div>
  );
}



