import React, { Fragment, useState } from "react";
import Button from "../Button";
import styles from "./OffLineCoaching.module.css";
export default function OffLineCoaching({ userMail }) {
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
      {!userMail && (
        <p className={styles["auth-msg"]}>
          Vueillez vous identifer avant toute soubscription
        </p>
      )}
      <form method="post" onSubmit={submitHandler}>
        <br />
        <br />
        <label className={styles["la-label"]}>
          <input
            type="radio"
            name="selectPaymentModeChoice"
            value="2times"
            checked={selectPaymentMode === "2times"}
            onChange={handleOptionChange}
          />
          &nbsp;&nbsp;Payer en <b>deux</b> tranches
        </label>
        <br />
        <br />
        <label className={styles["la-label"]}>
          <input
            type="radio"
            name="selectPaymentModeChoice"
            value="1time"
            checked={selectPaymentMode === "1time"}
            onChange={handleOptionChange}
          />
          &nbsp;&nbsp; Payer en <b>une </b>fois
        </label>
        <div className={styles["btn-content"]}>
          <Button activity={userMail ? false : true}>Valider</Button>
        </div>
      </form>
    </Fragment>
  );
}
