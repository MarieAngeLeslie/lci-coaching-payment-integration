import React, { Fragment, useState, useEffect } from "react";
import Button from "../Button";
import styles from "./OffLineCoaching.module.css";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

let currentMail;
let oldstd = false;
export default function OffLineCoaching({ userMail }) {
  const [selectPaymentMode, setSelectPaymentMode] = useState("2times");
  const [unitPrice, setUnitPrice] = useState(2500);
  const [oldStudent, setoldStudent] = useState("");
  currentMail = userMail;
  function successHandler(response) {
    fetch("http://localhost:3000/api/coachingpayment/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: currentMail,
        montant_paye:
          selectPaymentMode === "2times" && oldstd === true
            ? unitPrice
            : selectPaymentMode === "2times" && oldstd === false
            ? unitPrice + 1100
            : selectPaymentMode === "1time" && oldstd === true
            ? unitPrice * 2
            : selectPaymentMode === "1time" && oldstd === false
            ? unitPrice * 2 + 1100
            : unitPrice * 2,
        type_abonnement: "diff_coaching",
        duree: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        // console.error(error);
      });
  }

  const handleOptionChange = async (event) => {
    setSelectPaymentMode(event.target.value);
  };

  useEffect(() => {
    addKkiapayListener("success", successHandler);
    return () => {
      removeKkiapayListener("success", successHandler);
    };
  }, [oldstd, selectPaymentMode]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/subscribe_student?email=${userMail}`
      );

      if (response.ok) {
        oldstd = true;
      } else {
        console.log("il n'est pas trouvé");
        oldstd = false;
      }
    } catch (error) {
      console.error(error);
    }

    if (selectPaymentMode === "2times") {
      openKkiapayWidget({
        amount: oldstd ? unitPrice : unitPrice + 1100,
        api_key: "d32fcd10d95b11edafd30336c898d519",
        sandbox: true,
        email: userMail,
        phone: "97000000",
      });
    } else {
      openKkiapayWidget({
        amount: oldstd ? unitPrice * 2 : unitPrice * 2 + 1100,
        api_key: "d32fcd10d95b11edafd30336c898d519",
        sandbox: true,
        email: userMail,
        phone: "97000000",
      });
    }
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
