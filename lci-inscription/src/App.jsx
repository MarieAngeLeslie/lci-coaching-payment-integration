import React, { Fragment, useState } from "react";
import { SHA256 } from "crypto-js";
import "./App.css";
import lciImg from "./assets/lci.png";

export default function App() {
  const [emailValue, setEmailValue] = useState("");
  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [mobilenoValue, setMobilenoValue] = useState("");
  const [dobValue, setDobValue] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [validMail, setValidMail] = useState(true);
  const [allFieldFill, setAllFieldFill] = useState(true);

  const handleEmailValue = (event) => {
    const currentValue = event.target.value.trim();
    setEmailValue(currentValue);
    if (
      currentValue === "" ||
      !currentValue.includes("@") ||
      !currentValue.includes(".")
    ) {
      setValidMail(false);
    } else {
      setValidMail(true);
    }
  };
  const handleFirstnameValue = (event) => {
    setFirstnameValue(event.target.value);
  };

  const handleLastnameValue = (event) => {
    setLastnameValue(event.target.value);
  };

  const handleMobilenoValue = (event) => {
    setMobilenoValue(event.target.value);
  };

  const handleDobValue = (event) => {
    setDobValue(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePwd = (event) => {
    setPwd(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("yes........");
    if (
      !validMail ||
      firstnameValue === "" ||
      lastnameValue === "" ||
      lastnameValue === "" ||
      mobilenoValue === "" ||
      dobValue === "" ||
      username === "" ||
      pwd === ""
    ) {
      setAllFieldFill(false);
      return;
    }
    setAllFieldFill(true);
    fetch("http://localhost:3000/api/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        mobileno: mobilenoValue,
        dob: dobValue,
        username: username,
        password: SHA256(pwd).toString(),
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        // console.error(error);
      });
    setEmailValue("");
    setFirstnameValue("");
    setLastnameValue("");
    setEmailValue("");
    setMobilenoValue("");
    setPwd("");
    setUsername("");
    setDobValue("");
  };

  return (
    <Fragment>
      <div className="lci-logo">
        <img src={lciImg} alt="lci-coaching-img" />
      </div>
      {!allFieldFill && (
        <p className="notification-msg">Veuillez remplir tous les champs</p>
      )}
      <form method="post" onSubmit={handleSubmit}>
        {/* Identifier vous :&nbsp;&nbsp; */}
        <input
          className={`${!validMail ? "invalidField" : ""}`}
          placeholder="Entrez votre email"
          value={emailValue}
          onChange={handleEmailValue}
          type="email"
        />
        <br />
        <br />
        <input
          placeholder="Entrez votre nom"
          value={lastnameValue}
          onChange={handleLastnameValue}
          type="text"
        />
        <br />
        <br />
        <input
          placeholder="Entrez votre prénom"
          value={firstnameValue}
          onChange={handleFirstnameValue}
          type="text"
        />
        <br />
        <br />
        <input
          placeholder="Entrez votre numéro plus indicatif ex: +229 63 00 00 00"
          value={mobilenoValue}
          onChange={handleMobilenoValue}
          type="text"
        />
        <br />
        <br />
        <input
          placeholder="votre date de naissance"
          value={dobValue}
          onChange={handleDobValue}
          type="date"
        />
        <br />
        <br />
        <input
          placeholder="Définissez un nom d'utilisateur"
          value={username}
          onChange={handleUsername}
          type="text"
        />
        <br />
        <br />
        <input
          placeholder="Votre mot de passe"
          value={pwd}
          onChange={handlePwd}
          type="password"
        />
        <br />
        <br />
        <br />
        <button type="submit">S'enregistrer</button>
      </form>

      <p className="member-text-style">
        Déjà membre ! je souhaite prendre &nbsp;
        <span>
          <a href="">UN ABONNEMENT</a>
        </span>
      </p>
    </Fragment>
  );
}
