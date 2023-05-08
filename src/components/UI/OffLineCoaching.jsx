import React, { Fragment, useState } from "react";
import Button from "../Button";

export default function OffLineCoaching() {
  const [selectPaymentMode, setSelectPaymentMode] = useState("2times");
  const handleOptionChange = (event) => {
    setSelectPaymentMode(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(selectPaymentMode);
  };
  return (
    <Fragment>
      <form method="post" onSubmit={submitHandler}>
        <label>
          <input
            type="radio"
            name="selectPaymentModeChoice"
            value="2times"
            checked={selectPaymentMode === "2times"}
            onChange={handleOptionChange}
          />
          Payer en <b>deux</b> tranches
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="selectPaymentModeChoice"
            value="1time"
            checked={selectPaymentMode === "1time"}
            onChange={handleOptionChange}
          />
          Payer en <b>une </b>fois
        </label>
        <p>afficher le prix</p>
        <Button>Valider</Button>
      </form>
    </Fragment>
  );
}
