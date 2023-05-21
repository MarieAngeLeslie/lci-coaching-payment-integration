import React, { Fragment, useState } from "react";
import Identifier from "../components/Identifier";
import SubscriptionType from "../components/UI/SubscriptionType";
import styles from "./MainScreen.module.css";
import DirectCoaching from "../components/UI/DirectCoaching";
import OffLineCoaching from "../components/UI/OffLineCoaching";
import TestAndExam from "../components/UI/TestAndExam";

export default function MainScreen() {
  const [activeSubscription, setActiveSubscription] =
    useState("Coaching en Direct");
  const [currentView, setCurrentView] = useState(0);
  const [useremail, setUseremail] = useState("");

  const handleUserMail = (mail) => {
    setUseremail(mail);
  };

  const handleSubscriptionClick = (subject) => {
    setActiveSubscription(subject);
    switch (subject) {
      case "Coaching en Direct":
        setCurrentView(0);
        break;
      case "Coaching en Différé":
        setCurrentView(1);
        break;
      case "Test & Examen":
        setCurrentView(2);
        break;
      default:
        setCurrentView(0);
    }
  };

  const views = [
    <DirectCoaching userMail={useremail} />,
    <OffLineCoaching userMail={useremail} />,
    <TestAndExam userMail={useremail} />,
  ];
  return (
    <Fragment>
      <Identifier sendMail={handleUserMail} />
      <p className={styles["member-text-style"]}>
        Pas encore membre ? &nbsp;
        <span>
          <a href="">Inscrivez-vous</a>
        </span>
      </p>
      <div className={styles["payment-block"]}>
        <div className={styles["coaching-styles"]}>
          <SubscriptionType
            subject={"Coaching en Direct"}
            active={activeSubscription === "Coaching en Direct"}
            onSubClick={handleSubscriptionClick}
          />
          <SubscriptionType
            subject={"Coaching en Différé"}
            active={activeSubscription === "Coaching en Différé"}
            onSubClick={handleSubscriptionClick}
          />

          <SubscriptionType
            subject={"Test & Examen"}
            active={activeSubscription === "Test & Examen"}
            onSubClick={handleSubscriptionClick}
          />
        </div>
        <hr className={styles["separator"]} />
        <div className={styles["content"]}>{views[currentView]}</div>
      </div>
    </Fragment>
  );
}
