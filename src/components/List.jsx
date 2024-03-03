import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Flex, Spin } from "antd";
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
  console.log(items);
  const dispatch = useDispatch();

  const getTotalCount = async () => {
    const totalIds = await fetchData("get_ids", {});
    const uniqueIds = Array.from(new Set([...totalIds]));

    dispatch(setTotalPages(Math.ceil(uniqueIds.length / 10)));
    dispatch(setUniqueIds(uniqueIds));
    return uniqueIds.length;
  };

  const getItems = async () => {
    const pageIds = await fetchData("get_ids", {
      offset: (currentPage - 1) * 10,
      limit: 10,
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
    console.log(page);
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
            {items &&
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

          <Pagination
            className="pagination"
            total={totalPages * 10}
            current={currentPage}
            onChange={handlePageChange}
            pageSize={10}
            showSizeChanger={false}
            pageSizeOptions={["10"]}
          />
        </>
      )}
    </div>
  );
}

export default List;
