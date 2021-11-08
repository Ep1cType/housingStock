import React, {useEffect, useState} from "react";

import s from "./Filtering.module.scss";
import "antd/dist/antd.css";

import {Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addressActions} from "../../store/address/addressActions";
import housingStockService from "../../services/housingStockService";
import {housingStockActions} from "../../store/housingStock/housingStockActions";

const {Option} = Select;

const Filtering = () => {
  const dispatch = useDispatch();

  const {streetsList, housesList, flatsList} = useSelector(state => state.address);
  const {housingStock} = useSelector(state => state.housingStock);

  const [streetId, setStreetId] = useState();
  const [houseId, setHouseId] = useState();
  const [flatId, setFlatId] = useState();

  useEffect(() => {
    dispatch(addressActions.fetchHouses(streetId));
    setHouseId(null);
    // dispatch(housingStockActions.fetchHousesStock("streetId", streetId))
  }, [streetId]);

  useEffect(() => {
    dispatch(addressActions.fetchFlats(houseId));
    setFlatId(null);
  }, [houseId]);

  useEffect(() => {
    if (flatId) {
      dispatch(housingStockActions.fetchHousesStock("houseId", houseId));
    }
  }, [flatId])

  // useEffect(() => {
  //   if (houseId) {
  //     dispatch(housingStockActions.fetchHousesStock("houseId", houseId));
  //   }
  // }, [houseId])

  const handleClick = () => {
    dispatch(housingStockActions.fetchHousesStock(streetId, houseId, flatId));
  };

  const handleSearch = () => {
    dispatch(housingStockActions.fetchClientsList(690097));
  };

  return (
    <div className={s.filtering}>
      <div className={s.filtering__address__inputs}>
        <Select
          value={streetId}
          onChange={(e) => setStreetId(e)}
          className={s.filtering__address__inputs_street}
          placeholder="Улица"
          optionFilterProp="children"
          showSearch
        >
          {streetsList && streetsList.map((street) => (
            <Option key={street.id} value={street.id}>{street.prefix.shortName}. {street.name}</Option>
          ))}
        </Select>
        <Select
          value={houseId}
          onChange={(e) => setHouseId(e)}
          className={s.filtering__address__inputs_house}
          placeholder="Дом"
          optionFilterProp="children"
          showSearch
        >
          {housesList && housesList.map((house) => (
            <Option key={house.id} value={house.id}>
              {house.name === "0" ? <span>Дома не найдены</span> : <span>{house.name}</span>}
            </Option>
          ))}
        </Select>
        <Select
          value={flatId}
          onChange={(e) => setFlatId(e)}
          className={s.filtering__address__inputs_flat}
          placeholder="Кв./офис"
        >
          {flatsList && flatsList.map((flat) => (
            <Option key={flat.id} value={flat.id}>
              {flat.typeName === "Квартира" ? <span>Квартира {flat.name}</span> : <span>{flat.name}</span>}
            </Option>
          ))}
        </Select>
      </div>
      {/*<div>*/}
      {/*  <Select*/}
      {/*    value={addressId}*/}
      {/*    onChange={(e) => setAddressId(e)}*/}
      {/*    className={s.filtering__housingStock}*/}
      {/*    placeholder="fa"*/}
      {/*  >*/}
      {/*    {housingStock && housingStock.map((housing) => (*/}
      {/*      <Option key={housing.addressId} value={housing.addressId}>*/}
      {/*        {housing.building}*/}
      {/*      </Option>*/}
      {/*    ))}*/}
      {/*  </Select>*/}
      {/*</div>*/}
      {/*<button onClick={() => handleSearch(addressId)}>*/}
      {/*  fasfas*/}
      {/*</button>*/}
    </div>
  );
};

export default Filtering;
