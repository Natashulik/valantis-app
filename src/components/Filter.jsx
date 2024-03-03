import React from "react";

function Filter() {
  return (
    <div className="filter-wrapper">
      <h3 className="filter-wrapper__title">Фильтры</h3>
      <form action="#" class="filter-form">
        <select className="select">
          <option value="1" selected className="selected-option">
            Выберите название
          </option>
          <option value="2">Серьги</option>
          <option value="3">Кольца</option>
          <option value="4">Колье</option>
          <option value="5">Браслет</option>
          <option value="6">Подвеска</option>
          <option value="7">Брошь</option>
          <option value="8">Комплект</option>
        </select>

        <div>
          <input placeholder="Укажите бренд" className="brand__input" />
        </div>
        <div className="diapason">
          <p className="price-title">ПО ЦЕНЕ</p>
          <div className="from-block">
            <label className="diapason__label">от</label>
            <input
              className="diapason__input"
              type="text"
              name="input-from"
              placeholder="0"
            />
          </div>
          <div className="to-block">
            <label className="diapason__label">до</label>
            <input
              className="diapason__input"
              type="text"
              name="input-to"
              placeholder="1 000 000"
            />
          </div>
          <p className="currency">РУБЛЕЙ</p>
        </div>
        <button className="button-filter">Фильтровать</button>
        <button className="button-reset">Сбросить фильтр</button>
      </form>
    </div>
  );
}

export default Filter;
