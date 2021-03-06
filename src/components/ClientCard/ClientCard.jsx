import React from "react";

import s from "./ClientCard.module.scss";

import {Card} from "antd";
import {DeleteOutlined, EditOutlined, UserAddOutlined} from "@ant-design/icons";

const {Meta} = Card;

const ClientCard = ({houseInfo, openModal, openEditMode, warning}) => {

  const {addressId, streetId, houseId, streetName, building, corpus, flat, clients} = houseInfo;

  return (
    <>
      <li className={s.clientCard}>
        <div className={s.header}>
          <div className={s.address__name}>
            <h1>{streetName} {building}{corpus ? <span>к{corpus}</span> : null} {flat ?
              <span>квартира {flat}</span> : null}</h1>
          </div>
          <div className={s.actionMenu}>
            <button className={s.actionMenu__button} onClick={() => openModal(addressId)}>
              <UserAddOutlined className={s.actionMenu__button__add}/>
            </button>
          </div>
        </div>
        <div className={s.clientCard__item}>
          {clients.length > 0 ? clients.map((user) => (
            <Card
              key={user.id}
              size={"small"}
              actions={[
                <EditOutlined onClick={() => openEditMode(user, addressId)} key="edit"/>,
                <DeleteOutlined onClick={() => warning(addressId, user.bindId)} key="delete"/>
              ]}
            >
              <Meta
                title={user.name ? `${user.name}` : "Имя не указано"}
                description={user.phone}
              />
              <Meta description={user.email ? `${user.email}` : "Почта не указана"}/>
            </Card>
          )) : <h2>Людей не найдено</h2>}
        </div>
      </li>
    </>
  );
};

export default ClientCard;
