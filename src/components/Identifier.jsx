import React, { Fragment, useState } from "react";
import styles from "./Identifier.module.css";
import "./identifier.css";

export default function Identifier({ sendMail }) {
  const [inputValue, setInputValue] = useState("");
  const [userExist, setUserExist] = useState("");
  const [userFirstName, setUserFirstName] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    fetch(
      `https://api.lci-coaching.com/api/find-all-lci-students?email=${inputValue}`
    ).then((response) => {
      if (response.ok) {
        response
          .json()
          .then((res) => res.data)
          .then((res) => {
            console.log(res);
            sendMail(res.email);
            setInputValue("");
            setUserFirstName(res.firstname);
            setUserExist(true);
          });
      } else {
        sendMail(null);
        setUserExist(false);
      }
    });
  };
  const shadow = {
    background: "orange",
    boxShadow: "1px 1px 1px 1px #cccd",
  };
  return (
    <Fragment>
      {userExist && (
        <p className="user-notif user-found">
          Heureux de vous retrouvez <span>{userFirstName}</span>
        </p>
      )}
      {userExist === false && (
        <p className="user-notif user-not-found">
          Vous n'êtes pas encore membre de lci-coaching. Veuillez vous inscrire
        </p>
      )}
      <form
        method="post"
        onSubmit={handleSubmit}
        className={styles["form-block"]}
      >
        {/* Identifier vous :&nbsp;&nbsp; */}
        <input
          name="firstName"
          placeholder="Entrez votre mail"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles["identifierBtn"]}>
          s'identifier
        </button>
      </form>
    </Fragment>
  );
}
