import { useEffect, useMemo, useState } from "react";
import "./App.css";

import { products as initialProducts } from "./data/products";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";

import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

const CART_KEY = "minimarket_cart_v1";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("NONE");

  const [cartOpen, setCartOpen] = useState(false);

  // ✅ load cart from localStorage once
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // ✅ save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

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
        { id: product.id, title: product.title, price: product.price, qty: 1 },
      ];
    });
    setCartOpen(true);
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

  const cartCount = cart.reduce((acc, x) => acc + x.qty, 0);

  const categories = useMemo(() => {
    return Array.from(new Set(initialProducts.map((p) => p.category)));
  }, []);

  const visibleProducts = useMemo(() => {
    let list = [...initialProducts];

    // search
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // category
    if (category !== "ALL") {
      list = list.filter((p) => p.category === category);
    }

    // sort
    if (sort === "PRICE_ASC") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "PRICE_DESC") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [query, category, sort]);

  return (
    <div className="page">
      <Header
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
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
        <ProductGrid products={visibleProducts} onAdd={addToCart} />
      </main>
    }
  />
  <Route
    path="/product/:id"
    element={<ProductPage onAdd={addToCart} />}
  />
</Routes>


      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="overlay__panel" onClick={(e) => e.stopPropagation()}>
            <Cart
              cart={cart}
              onInc={incQty}
              onDec={decQty}
              onRemove={removeItem}
              onClose={() => setCartOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
