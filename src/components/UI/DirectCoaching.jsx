import React, { Fragment, useRef } from "react";
import Button from "../Button";

export default function DirectCoaching() {
  const selectRef = useRef(null);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(selectRef.current.value);
  };
  return (
    <Fragment>
      <form method="post" onSubmit={submitHandler}>
        <label htmlFor="subscription_option">Prendre un abonnement de :</label>
        &nbsp;
        <select name="subscription_option" ref={selectRef}>
          <option value="1">1 mois</option>
          <option value="2">2 mois</option>
          <option value="3">3 mois</option>
          <option value="4">4 mois</option>
          <option value="3">5 mois</option>
          <option value="4">6 mois</option>
        </select>
        <p>afficher le montant total ici</p>
        <Button>Valider</Button>
      </form>
    </Fragment>
  );
}
