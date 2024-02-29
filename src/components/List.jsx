import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../utils/fetchData";
import {
  setUniqueIds,
  setItems,
  setCurrentPage,
  setTotalPages,
} from "../redux/listSlice";

function List() {
  const { items, uniqueIds, totalPages, currentPage } = useSelector(
    (state) => state.list
  );

  const dispatch = useDispatch();

  const getTotalCount = async () => {
    const totalIds = await fetchData("get_ids", {});
    const uniqueIds = Array.from(new Set([...totalIds]));
    // dispatch(setUniqueIds(totalIds));

    dispatch(setTotalPages(Math.ceil(uniqueIds.length / 50)));
    return uniqueIds.length;
  };

  const getItems = async () => {
    const pageIds = await fetchData("get_ids", {
      offset: (currentPage - 1) * 50,
      limit: 50,
    });
    const items = await fetchData("get_items", { ids: pageIds });

    let uniquePageIds = new Set();
    let uniquePageArray = items.filter((item) => {
      if (!uniquePageIds.has(item.id)) {
        uniquePageIds.add(item.id);
        return true;
      }
      return false;
    });

    dispatch(setItems(uniquePageArray));
  };

  useEffect(() => {
    getTotalCount();
    getItems();
  }, []);

  useEffect(() => {
    getItems();
  }, [uniqueIds]);

  return (
    <div className="list-wrapper">
      <h1 className="list-wrapper__title">Каталог</h1>
      <div className="list">
        {items.map((item) => (
          <div key={item.id} className="list__item item">
            <p className="item__id">{item.id}</p>
            <p className="item__price">{item.price}</p>
            <p className="item__product">{item.product}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
