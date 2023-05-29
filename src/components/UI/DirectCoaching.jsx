import React, { Fragment, useRef, useEffect, useState } from "react";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

import Button from "../Button";
import styles from "./DirectCoaching.module.css";

let currentMail;
let oldStd;
export default function DirectCoaching({ userMail }) {
  const selectRef = useRef(null);
  const [unitPrice, setUnitPrice] = useState(20000);
  const [oldStudent, setoldStudent] = useState("");
  currentMail = userMail;
  function successHandler(response) {
    fetch("https://api.lci-coaching.com/api/coachingpayment/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: currentMail,
        montant_paye: oldStd
          ? unitPrice * selectRef.current.value
          : unitPrice * selectRef.current.value + 2500,
        type_abonnement: "live_coaching",
        duree: selectRef.current.value,
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

  useEffect(() => {
    addKkiapayListener("success", successHandler);
    return () => {
      removeKkiapayListener("success", successHandler);
    };
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(
      `https://api.lci-coaching.com/api/subscribe_student?email=${userMail}`
    ).then((response) => {
      if (response.ok) {
        oldStd = true;
        setoldStudent(true);
      } else {
        setoldStudent(false);
        oldStd = false;
      }
      openKkiapayWidget({
        amount: oldStd
          ? unitPrice * selectRef.current.value
          : unitPrice * selectRef.current.value + 2500,
        api_key: "47671cfebd26868d7f0924e30a46004dae845269",
        live: true,
        email: userMail,
        phone: "",
      });
    });
  };
  return (
    <Fragment>
      {!userMail && (
        <p className={styles["auth-msg"]}>
          Vueillez vous identifer avant toute souscription
        </p>
      )}
      <form method="post" onSubmit={submitHandler}>
        <label
          htmlFor="subscription_option"
          className={styles["get-subscription-title"]}
        >
          Prendre un abonnement de :
        </label>
        &nbsp;
        <select name="subscription_option" ref={selectRef}>
          <option value="1">1 mois</option>
          <option value="2">2 mois</option>
          <option value="3">3 mois</option>
          <option value="4">4 mois</option>
          <option value="3">5 mois</option>
          <option value="4">6 mois</option>
        </select>
        <div className={styles["btn-content"]}>
          <Button activity={userMail ? false : true}>Valider</Button>
        </div>
      </form>
    </Fragment>
  );
}
