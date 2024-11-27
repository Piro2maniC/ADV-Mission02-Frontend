import React, { useState } from "react";
import styles from "../../../../../styles/HomePageAPI01.module.css";

const CarValueController = () => {
  const [word, setWord] = useState("");
  const [year, setYear] = useState("");
  const [numericValue, setNumericValue] = useState(null);
  const [error, setError] = useState("");

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message

    if (!word || !year) {
      setError("Please provide both a word and a year.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, year: Number(year) }),
      });

      const data = await response.json();

      if (response.ok) {
        setNumericValue(data.total);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Car Value Calculator</h1>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="word" className={styles.label}>
            Model:
          </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={handleWordChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="year" className={styles.label}>
            Year:
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={handleYearChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Calculate
        </button>

        {error && <p className={styles.error}>{error}</p>}

        {numericValue !== null && (
          <p className={styles.result}>
            The value of your car is:{" "}
            <span className={styles.resultEmphasise}>${numericValue}</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default CarValueController;
