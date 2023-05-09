import React, { Fragment, useRef } from "react";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

import Button from "../Button";
import styles from "./DirectCoaching.module.css";
export default function DirectCoaching({ userMail }) {
  const selectRef = useRef(null);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(selectRef.current.value);
    openKkiapayWidget({
      amount: 20000 * selectRef.current.value,
      api_key: "d32fcd10d95b11edafd30336c898d519",
      sandbox: true,
      email: userMail,
      phone: "97000000",
    });
    function successHandler(response) {
      console.log(response);
    }

    useEffect(() => {
      addKkiapayListener("success", successHandler);
      return () => {
        removeKkiapayListener("success", successHandler);
      };
    }, []);
  };
  return (
    <Fragment>
      {!userMail && (
        <p className={styles["auth-msg"]}>
          Vueillez vous identifer avant toute soubscription
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
