import { React, useCallback, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../utils/fetchData";
import {
  setBrand,
  setCategory,
  setUniqueFilteredIds,
  setFilteredItems,
  setPriceFrom,
  setPriceTo,
  setFilteredTotalPages,
  setPriceArr,
} from "../redux/filterSlice";

const Filter = memo(() => {
  const { category, brand, priceFrom, priceTo, filteredItems, priceArr } =
    useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleCategoryFilter = (event) => {
    dispatch(setCategory(event.target.value));
  };

  const handleBrandFilter = (event) => {
    dispatch(setBrand(event.target.value));
  };

  const handlePriceFromFilter = (event) => {
    dispatch(setPriceFrom(+event.target.value));
  };

  const handlePriceToFilter = (event) => {
    dispatch(setPriceTo(+event.target.value));
  };

  useEffect(() => {
    const getPriceArr = async () => {
      const response = await fetchData("get_fields", { field: "price" });
      dispatch(setPriceArr(response));
    };
    getPriceArr();
  }, []);

  const getPriceIds = async () => {
    const filterPriceDiapason = priceArr.filter(
      (item) => item >= priceFrom && item <= priceTo
    );
    const filterPriceIds = await Promise.all(
      filterPriceDiapason.map(async (item) => {
        const priceIds = await fetchData("filter", { price: item });
        return priceIds;
      })
    );
    const flatIds = filterPriceIds.flatMap((item) => item);
    const uniquePriceIds = [...new Set(flatIds)];
    console.log(uniquePriceIds);
    return uniquePriceIds;
  };

  const handleFilter = async (event) => {
    event.preventDefault();

    let filteredIds = [];

    const filterProductIds = category
      ? await fetchData("filter", { product: category })
      : [];

    const filterBrandIds = brand
      ? await fetchData("filter", { brand: brand })
      : [];

    const priceIds = priceFrom || priceTo ? await getPriceIds() : [];

    if (
      priceIds &&
      priceIds.length > 0 &&
      filterBrandIds &&
      filterBrandIds.length > 0 &&
      filterProductIds &&
      filterProductIds.length > 0
    ) {
      filteredIds = priceIds.filter(
        (id) => filterProductIds.includes(id) && filterBrandIds.includes(id)
      );
    } else if (
      priceIds &&
      priceIds.length > 0 &&
      filterBrandIds &&
      filterBrandIds.length > 0
    ) {
      filteredIds = priceIds.filter((id) => filterBrandIds.includes(id));
      console.log("Нужный фильтр!!!");
    } else if (
      priceIds &&
      priceIds.length > 0 &&
      filterProductIds &&
      filterProductIds.length > 0
    ) {
      filteredIds = priceIds.filter((id) => filterProductIds.includes(id));
    } else if (priceIds && priceIds.length > 0) {
      filteredIds = priceIds;
    } else if (
      filterProductIds &&
      filterProductIds.length > 0 &&
      filterBrandIds &&
      filterBrandIds.length > 0
    ) {
      filteredIds = filterProductIds.filter((id) =>
        filterBrandIds.includes(id)
      );
    } else if (filterProductIds && filterProductIds.length > 0) {
      filteredIds = filterProductIds;
    } else if (filterBrandIds && filterBrandIds.length > 0) {
      filteredIds = filterBrandIds;
    }

    const uniqueFilteredIds = Array.from(new Set([...filteredIds]));

    dispatch(setUniqueFilteredIds(uniqueFilteredIds));
    const filteredTotalPages = Math.ceil(uniqueFilteredIds.length / 50);
    dispatch(setFilteredTotalPages(filteredTotalPages));

    const filteredItems = await fetchData("get_items", { ids: filteredIds });
    dispatch(setFilteredItems(filteredItems));
  };

  const resetFilter = () => {
    dispatch(setCategory(""));
    dispatch(setBrand(""));
    dispatch(setPriceFrom(""));
    dispatch(setPriceTo(""));
    dispatch(setUniqueFilteredIds([]));
    dispatch(setFilteredItems([]));
  };

  return (
    <div className="filter-wrapper">
      <h3 className="filter-wrapper__title">Фильтры</h3>
      <form action="#" className="filter-form">
        <select
          className="select"
          onChange={handleCategoryFilter}
          value={category}
        >
          <option value="" defaultValue="default" className="selected-option">
            Выберите название
          </option>
          <option value="серьги">Серьги</option>
          <option value="кольцо">Кольца</option>
          <option value="колье">Колье</option>
          <option value="браслет">Браслеты</option>
          <option value="подвеска">Подвески</option>
          <option value="брошь">Броши</option>
          <option value="комплект">Комплект</option>
        </select>

        <div>
          <input
            placeholder="Укажите бренд"
            className="brand__input"
            onChange={handleBrandFilter}
            value={brand}
          />
        </div>
        <div className="diapason">
          <p className="price-title">ПО ЦЕНЕ</p>
          <div className="from-block">
            <label className="diapason__label">от</label>
            <input
              onChange={handlePriceFromFilter}
              className="diapason__input"
              type="text"
              name="input-from"
              placeholder="0"
            />
          </div>
          <div className="to-block">
            <label className="diapason__label">до</label>
            <input
              onChange={handlePriceToFilter}
              className="diapason__input"
              type="text"
              name="input-to"
              placeholder="0"
            />
          </div>
          <p className="currency">РУБЛЕЙ</p>
        </div>
        <button className="button-filter" onClick={handleFilter}>
          Фильтровать
        </button>
        <button className="button-reset" onClick={resetFilter}>
          Сбросить фильтр
        </button>
      </form>
    </div>
  );
});

export default Filter;
