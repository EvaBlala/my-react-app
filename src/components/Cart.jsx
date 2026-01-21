function sumCart(cart) {
  return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
}

export default function Cart({ cart, onInc, onDec, onRemove, onClose }) {
  const total = sumCart(cart);

  return (
    <div className="cart">
      <div className="cart__header">
        <h2>Корзина</h2>
        <button className="btn btn--ghost" onClick={onClose}>Закрыть</button>
      </div>

      {cart.length === 0 ? (
        <p className="muted">Пока пусто</p>
      ) : (
        <>
          <div className="cart__list">
            {cart.map((item) => (
              <div key={item.id} className="cart__row">
                <div className="cart__info">
                  <div className="cart__title">{item.title}</div>
                  <div className="muted">{item.price} ₽</div>
                </div>

                <div className="cart__controls">
                  <button className="btn btn--ghost" onClick={() => onDec(item.id)}>-</button>
                  <span className="qty">{item.qty}</span>
                  <button className="btn btn--ghost" onClick={() => onInc(item.id)}>+</button>
                </div>

                <button className="btn btn--danger" onClick={() => onRemove(item.id)}>
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <div className="cart__footer">
            <div className="total">
              <span>Итого:</span>
              <b>{total} ₽</b>
            </div>
            <button className="btn btn--primary">Оформить</button>
          </div>
        </>
      )}
    </div>
  );
}
