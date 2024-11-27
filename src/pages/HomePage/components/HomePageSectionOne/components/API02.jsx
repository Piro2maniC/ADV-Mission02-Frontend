import React from "react";
import styles from "../../../../../styles/HomePageAPI01.module.css";
import { useState } from "react";

const API02 = () => {
  const [claimHistory, setClaimHistory] = useState(""); //input
  const [riskRating, setRiskRating] = useState(null); //output
  const [errorMessage, setErrorMessage] = useState(""); //error ui

  const handleClaimHistoryChange = (e) => {
    setClaimHistory(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // reset error message
    setRiskRating(null); //clear prev risk rating

    if (!claimHistory) {
      setErrorMessage(
        `You will need to provide your claim history, if you have none please type "None".`
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/riskRating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          claimHistory,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setRiskRating(data.riskRating); //sets returned risk rating
      } else {
        setErrorMessage(
          data.error || "An error occurred while calculating the risk rating."
        );
      }
    } catch (err) {
      setErrorMessage(
        "Hmm looks like there was a problem on our side. Please try again later."
      );
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Risk Level Calculator </h1>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Claim History:</label>
          <p className={styles.subtext}>
            Briefly describe your claim history <br />
            from the past 3 years.
          </p>
          <input
            type="text"
            id="claimHistory"
            value={claimHistory}
            onChange={handleClaimHistoryChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Calculate
        </button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {riskRating !== null && (
          <p className={styles.result}>
            Your Risk Rating is:
            <span className={styles.resultEmphasise}> {riskRating}/5</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default API02;
