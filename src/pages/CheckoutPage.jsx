import { useState } from "react";
import { Link } from "react-router-dom";

export default function CheckoutPage({ cart, onClear }) {
  const total = cart.reduce((acc, x) => acc + x.price * x.qty, 0);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    comment: "",
  });

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      alert("Заполни ФИО, телефон и адрес 🙂");
      return;
    }
    if (cart.length === 0) {
      alert("Корзина пустая 🙂");
      return;
    }
    alert("Заказ оформлен (демо)! 🎉");
    onClear();
  }

  return (
    <div className="main">
      <div className="pageHead">
        <h1 className="title">Оформление</h1>
        <Link className="btn btn--ghost" to="/cart">← Назад в корзину</Link>
      </div>

      <div className="checkoutGrid">
        <form className="panel" onSubmit={submit}>
          <h2 className="h2">Данные получателя</h2>

          <label className="field">
            <span>ФИО</span>
            <input
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              placeholder="Иванов Иван Иванович"
            />
          </label>

          <label className="field">
            <span>Телефон</span>
            <input
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+7 ..."
            />
          </label>

          <label className="field">
            <span>Город</span>
            <input
              value={form.city}
              onChange={(e) => setField("city", e.target.value)}
              placeholder="Москва"
            />
          </label>

          <label className="field">
            <span>Адрес</span>
            <input
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              placeholder="Улица, дом, квартира"
            />
          </label>

          <label className="field">
            <span>Комментарий (необязательно)</span>
            <textarea
              value={form.comment}
              onChange={(e) => setField("comment", e.target.value)}
              placeholder="Например: домофон не работает"
            />
          </label>

          <button className="btn btn--primary" type="submit">
            Оформить заказ
          </button>
        </form>

        <div className="panel">
          <h2 className="h2">Ваш заказ</h2>

          {cart.length === 0 ? (
            <p className="muted">Корзина пустая.</p>
          ) : (
            <div className="orderList">
              {cart.map((x) => (
                <div key={x.id} className="orderRow">
                  <img src={x.image} alt={x.title} />
                  <div className="orderRow__info">
                    <div className="orderRow__title">{x.title}</div>
                    <div className="muted">{x.qty} × {x.price} ₽</div>
                  </div>
                  <b>{x.qty * x.price} ₽</b>
                </div>
              ))}
            </div>
          )}

          <div className="summary__row" style={{ marginTop: 12 }}>
            <span>Итого:</span>
            <b>{total} ₽</b>
          </div>
        </div>
      </div>
    </div>
  );
}
