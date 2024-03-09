import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin } from "antd";
import { fetchData } from "../utils/fetchData";
import ring from "../assets/ring2.jpg";
import { formatedPrice } from "../utils/formatedPrice";
import Filter from "./Filter";
import {
  setUniqueIds,
  setItems,
  setCurrentPage,
  setTotalPages,
  setIsLoading,
} from "../redux/listSlice";

function List() {
  const { items, uniqueIds, totalPages, currentPage, isLoading } = useSelector(
    (state) => state.list
  );
  const { filteredTotalPages, filteredItems, brand, category } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  const getTotalCount = async () => {
    const totalIds = await fetchData("get_ids", {});

    const uniqueIds = totalIds ? Array.from(new Set([...totalIds])) : [];

    dispatch(setTotalPages(Math.ceil(uniqueIds.length / 50)));
    dispatch(setUniqueIds(uniqueIds));
    return uniqueIds.length;
  };

  const getItems = async () => {
    const pageIds = await fetchData("get_ids", {
      offset: (currentPage - 1) * 50,
      limit: 50,
    });
    const items = await fetchData("get_items", { ids: pageIds });

    let uniquePageIds = new Set();

    let uniquePageArray =
      items &&
      items.filter((item) => {
        if (!uniquePageIds.has(item.id)) {
          uniquePageIds.add(item.id);
          return true;
        }
        return false;
      });

    dispatch(setItems(uniquePageArray));
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    getTotalCount();
    getItems();
  }, []);

  const handlePageChange = (page) => {
    dispatch(setIsLoading(true));
    dispatch(setCurrentPage(page));
    getItems();
  };

  return (
    <div className="list-wrapper">
      <h1 className="list-wrapper__title">Каталог</h1>
      <Filter />
      {isLoading ? (
        <Spin className="spin" size="large" />
      ) : (
        <>
          <div className="list">
            {filteredItems && filteredItems.length > 0
              ? filteredItems.map((item, index) => (
                  <div key={item.id} className="list__item item">
                    <div className="picture">
                      <img src={ring} alt="ring" className="picture" />
                    </div>
                    <div className="item__info">
                      <p className="item__product">{item.product}</p>
                      <p className="item__brand">{item.brand}</p>
                      <p className="item__id">aртикул: {item.id}</p>
                    </div>
                    <p className="item__price">{formatedPrice(item.price)} ₽</p>
                  </div>
                ))
              : items &&
                items.map((item, index) => (
                  <div key={item.id} className="list__item item">
                    <div className="picture">
                      <img src={ring} alt="ring" className="picture" />
                    </div>
                    <div className="item__info">
                      <p className="item__product">{item.product}</p>
                      <p className="item__brand">{item.brand}</p>
                      <p className="item__id">aртикул: {item.id}</p>
                    </div>
                    <p className="item__price">{formatedPrice(item.price)} ₽</p>
                  </div>
                ))}
          </div>
          {brand || category ? (
            <Pagination
              className="pagination"
              total={filteredTotalPages * 50}
              current={currentPage}
              onChange={handlePageChange}
              pageSize={50}
              showSizeChanger={false}
              pageSizeOptions={["50"]}
            />
          ) : (
            <Pagination
              className="pagination"
              total={totalPages * 50}
              current={currentPage}
              onChange={handlePageChange}
              pageSize={50}
              showSizeChanger={false}
              pageSizeOptions={["50"]}
            />
          )}
        </>
      )}
    </div>
  );
}

export default List;
