import { Link } from "react-router-dom";

export default function CartPage({ cart, onInc, onDec, onRemove, onClear }) {
  const total = cart.reduce((acc, x) => acc + x.price * x.qty, 0);

  return (
    <div className="main">
      <div className="pageHead">
        <h1 className="title">Корзина</h1>
        <div className="pageHead__actions">
          {cart.length > 0 && (
            <button className="btn btn--ghost" onClick={onClear}>
              Очистить
            </button>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="panel">
          <p className="muted">Корзина пустая.</p>
          <Link className="btn btn--primary" to="/">Вернуться в каталог</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            {cart.map((item) => (
              <div key={item.id} className="cartItem">
                <img className="cartItem__img" src={item.image} alt={item.title} />

                <div className="cartItem__info">
                  <div className="cartItem__title">{item.title}</div>
                  <div className="muted">{item.price} ₽ / шт</div>
                </div>

                <div className="cartItem__qty">
                  <button className="btn btn--ghost" onClick={() => onDec(item.id)}>-</button>
                  <span className="qty">{item.qty}</span>
                  <button className="btn btn--ghost" onClick={() => onInc(item.id)}>+</button>
                </div>

                <div className="cartItem__sum">
                  <b>{item.price * item.qty} ₽</b>
                </div>

                <button className="btn btn--danger" onClick={() => onRemove(item.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="summary">
            <div className="summary__row">
              <span>Итого:</span>
              <b>{total} ₽</b>
            </div>
            <Link className="btn btn--primary" to="/checkout">
              Перейти к оформлению
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
