import React, { Fragment, useState } from "react";
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

  const handleEmailValue = (event) => {
    setEmailValue(event.target.value);
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
    // if (inputValue === "") {
    //   return;
    // }
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
        password: pwd,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        // console.error(error);
      });
  };

  return (
    <Fragment>
      <div className="imgBlock">
        <img src={lciImg} alt="lci-coaching-img" />
      </div>
      <form method="post" onSubmit={handleSubmit}>
        {/* Identifier vous :&nbsp;&nbsp; */}
        <input
          placeholder="Entrez votre mail"
          value={emailValue}
          onChange={handleEmailValue}
          type="email"
        />
        <br />
        <br />
        <input
          placeholder="Entrez votre Nom"
          value={lastnameValue}
          onChange={handleLastnameValue}
          type="text"
        />
        <br />
        <br />
        <input
          placeholder="Entrez votre Prénom"
          value={firstnameValue}
          onChange={handleFirstnameValue}
          type="text"
        />
        <br />
        <br />
        <input
          placeholder="Entrez votre numéro"
          value={mobilenoValue}
          onChange={handleMobilenoValue}
          type="text"
        />
        <br />
        <br />
        <input
          placeholder="Entrez votre date de naissance"
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
    </Fragment>
  );
}
