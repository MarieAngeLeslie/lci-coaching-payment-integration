import React, { useState, Fragment } from "react";
import styles from "./TestAndExam.module.css";
import Button from "../Button";

export default function TestAndExam() {
  const [typeOfStudent, setTypeOfStudent] = useState("ownStudent");
  const handleOptionChange = (event) => {
    setTypeOfStudent(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(typeOfStudent);
  };
  return (
    <Fragment>
      <form method="post" onSubmit={submitHandler}>
        <label>
          <input
            type="radio"
            name="setTypeOfStudent"
            value="ownStudent"
            checked={typeOfStudent === "ownStudent"}
            onChange={handleOptionChange}
          />
          &nbsp;Etudiant(e) à Lci-coaching
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="setTypeOfStudent"
            value="externStudent"
            checked={typeOfStudent === "externStudent"}
            onChange={handleOptionChange}
          />
          &nbsp;Etudiant(e) externe
        </label>
        <p>afficher le prix</p>
        <Button>Valider</Button>
      </form>
    </Fragment>
  );
}
