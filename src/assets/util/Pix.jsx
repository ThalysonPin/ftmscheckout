import React from "react";

const Pix = ({
  pixKey,
  description,
  merchantName,
  merchantCity,
  txid,
  amount,
}) => {
  const fixedAmount = amount.toFixed(2);

  const getValue = (id, value) => {
    const size = String(value.length).padStart(2, "0");
    return id + size + value;
  };

  const getMerchantAccountInfo = () => {
    const gui = getValue("00", "br.gov.bcb.pix");
    const key = getValue("01", pixKey);
    const desc = getValue("02", description);
    return getValue("26", gui + key + desc);
  };

  const getAdditionalDataFieldTemplate = () => {
    const txidValue = getValue("05", txid);
    return getValue("62", txidValue);
  };

  const getCRC16 = (payload) => {
    let crcPayload = payload + "6304";
    let polinomio = 0x1021;
    let resultado = 0xffff;
    let length = crcPayload.length;

    for (let offset = 0; offset < length; offset++) {
      resultado ^= crcPayload.charCodeAt(offset) << 8;
      for (let bitwise = 0; bitwise < 8; bitwise++) {
        if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
        resultado &= 0xffff;
      }
    }
    return "6304" + resultado.toString(16).toUpperCase().padStart(4, "0");
  };

  const getPayload = () => {
    const payload =
      getValue("00", "01") +
      getMerchantAccountInfo() +
      getValue("52", "0000") +
      getValue("53", "986") +
      getValue("54", fixedAmount) +
      getValue("58", "BR") +
      getValue("59", merchantName) +
      getValue("60", merchantCity) +
      getAdditionalDataFieldTemplate();

    return payload + getCRC16(payload);
  };

  return { getPayload };
};

export default Pix;
