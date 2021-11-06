import React from "react";
import {Input} from "antd";

const ModalInputs = ({clientPhone, setClientPhone, clientEmail, setClientEmail, clientName, setClientName}) => {
  return (
    <div>
      <Input
        style={{marginTop: "20px"}}
        value={clientPhone}
        onChange={(e) => setClientPhone(e.target.value)}
        type={"tel"}
        addonBefore="+7"
      />
      <Input
        value={clientEmail}
        onChange={(e) => setClientEmail(e.target.value)}
        type={"email"}
        placeholder="Email"
      />
      <Input
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        type={"text"}
        placeholder="Ф. И. О"
      />
    </div>
  );
};

export default ModalInputs;
