import React, { useState, Fragment, useEffect } from "react";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

import styles from "./TestAndExam.module.css";
import Button from "../Button";

let currentMail = null;
let oldstd = false;
export default function TestAndExam({ userMail }) {
  const [typeOfStudent, setTypeOfStudent] = useState("ownStudent");
  const [onwStudent, setOwnStudent] = useState(false);

  currentMail = userMail;
  function successHandler(response) {
    fetch("http://localhost:3000/api/coachingpayment/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: currentMail,
        montant_paye: oldstd ? 30000 : 50000,
        type_abonnement: "for_passing_exam",
        duree: 0,
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
  }, [oldstd, userMail]);

  const handleOptionChange = (event) => {
    setTypeOfStudent(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(typeOfStudent);
    try {
      const response = await fetch(
        `http://localhost:3000/api/subscribe_student?email=${userMail}`
      );
      if (response.ok) {
        oldstd = true;
      } else {
        console.log("je suis ici bien false");
        oldstd = false;
      }
      openKkiapayWidget({
        amount: oldstd ? 30000 : 50000,
        api_key: "d32fcd10d95b11edafd30336c898d519",
        sandbox: true,
        email: userMail,
        phone: "97000000",
      });
    } catch (error) {
      console.log(error);
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
        {/* <label className={styles["la-label"]}>
          <input
            type="radio"
            name="setTypeOfStudent"
            value="ownStudent"
            // checked={typeOfStudent === "ownStudent"}
            onChange={handleOptionChange}
            disabled={!onwStudent}
          />
          &nbsp;&nbsp;Etudiant(e) à Lci-coaching
        </label>
        <br />
        <br />
        <label className={styles["la-label"]}>
          <input
            type="radio"
            name="setTypeOfStudent"
            value="externStudent"
            // checked={typeOfStudent === "externStudent"}
            onChange={handleOptionChange}
            disabled={onwStudent}
          />
          &nbsp;&nbsp;Etudiant(e) externe
        </label> */}
        <div className={styles["btn-content"]}>
          <Button activity={userMail ? false : true}>Passer un Examen</Button>
        </div>
      </form>
    </Fragment>
  );
}
