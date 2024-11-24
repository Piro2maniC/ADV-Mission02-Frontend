import React from "react";
import styles from "../../../../styles/HomePageSectionOne.module.css";
import API01 from "./components/API01";
import API02 from "./components/API02";
import API03 from "./components/API03";

function HomePageSectionOne() {
  return (
    <div className={styles.contentContainer}>
      <API01 />
      <API02 />
      <API03 />
    </div>
  );
}

export default HomePageSectionOne;
