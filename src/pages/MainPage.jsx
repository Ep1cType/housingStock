import React, {useEffect, useState} from "react";

import s from "./MainPage.module.scss";

import {Modal, Pagination, Spin} from "antd";

import Filtering from "../components/Filtering/Filtering";
import {useDispatch, useSelector} from "react-redux";
import {addressActions} from "../store/address/addressActions";
import {housingStockActions} from "../store/housingStock/housingStockActions";
import {customAlphabet} from "nanoid";
import ModalInputs from "../components/ModalInputs/ModalInputs";
import ClientList from "../components/ClientList/ClientList";


const nanoid = customAlphabet("12345679", 5);


const MainPage = () => {
  const dispatch = useDispatch();

  const {housingStock, totalCount, isLoading, isError} = useSelector(state => state.housingStock);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [addressId, setAddressId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [editMode, setEditMode] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [errorPost, setErrorPost] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [clientId, setClientId] = useState(nanoid());
  const [bindId, setBindId] = useState(nanoid());

  const lastIndex = currentPage*perPage;
  const firstIndex = lastIndex - perPage;
  const housingList = housingStock.slice(firstIndex, lastIndex);

  useEffect(() => {
    dispatch(addressActions.fetchStreets());
  }, []);

  const openModal = (addressId) => {
    setAddressId(addressId);
    setModalStatus("Добавление пользователя");
    setIsModalVisible(true);
  };

  const openEditMode = (client, addressId) => {
    setEditMode(true);
    const {id, bindId, email, name, phone} = client;
    setClientName(name);
    setClientPhone(phone);
    setClientEmail(email);
    setClientId(id);
    setBindId(bindId);
    setAddressId(addressId);
    setModalStatus("Редактирование пользователя");
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setErrorPost("");
    setEditMode(false);
    setIsModalVisible(false);
    setClientPhone("");
    setClientEmail("");
    setClientName("");
  };

  const handlePost = () => {
    setPostLoading(true);
    setErrorPost("");
    if (clientPhone.length > 9 && !isNaN(clientPhone)) {
      const client = {
        id: clientId,
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        bindId: bindId,
      };
      dispatch(housingStockActions.postClient(client, addressId));
      setIsModalVisible(false);
    } else {
      setErrorPost("Неправильный номер");
    }
    setPostLoading(false);
  };


  const handleDelete = (addressId, bindId) => {
    dispatch(housingStockActions.deleteClient(addressId, bindId));
  };

  function warning(addressId, bindId) {
    Modal.confirm({
      title: "Вы уверены что хотите удалить пользователя ?",
      onOk: () => handleDelete(addressId, bindId)
    });
  }

  const handleEdit = () => {
    debugger;
    const client = {
      id: clientId,
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      bindId: bindId,
    };
    dispatch(housingStockActions.editClient(client, addressId));
    setIsModalVisible(false);
  };


  return (
    <div className={s.mainPage}>
      <div className={s.container}>
        <Filtering/>
        <ul className={s.housingStockList}>
          <div className={s.pagination}>
            <Pagination
              defaultCurrent={1}
              total={totalCount}
              showSizeChanger={false}
              current={currentPage}
              onChange={(e) => setCurrentPage(e)}
            />
          </div>
          {isError && <div>{isError}</div>}
          {isLoading ? <Spin/> :
            <ClientList openEditMode={openEditMode} housingList={housingList} openModal={openModal} warning={warning}/>}
        </ul>
      </div>
      <Modal confirmLoading={postLoading} visible={isModalVisible} onOk={editMode ? handleEdit : handlePost}
             onCancel={closeModal}>
        <h2>{modalStatus && modalStatus}</h2>
        {errorPost && <span className={s.modalError}>{errorPost}</span>}
        <ModalInputs
          setClientEmail={setClientEmail}
          clientEmail={clientEmail}
          clientName={clientName}
          setClientName={setClientName}
          clientPhone={clientPhone}
          setClientPhone={setClientPhone}
        />
      </Modal>
    </div>
  );
};

export default MainPage;
