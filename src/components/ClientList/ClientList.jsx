import React from "react";
import ClientCard from "../ClientCard/ClientCard";

const ClientList = ({housingList, warning, openEditMode, openModal}) => {
  return (
    <>
      {housingList && housingList.map((house) => (
        <ClientCard warning={warning} openEditMode={openEditMode} openModal={openModal} key={house.addressId}
                    houseInfo={house}/>
      ))}
    </>
  );
};

export default ClientList;
