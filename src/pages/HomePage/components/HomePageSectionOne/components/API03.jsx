import React from "react";
import styles from "../../../../../styles/HomePageAPI01.module.css";
import { useState } from "react";

function API03() {
  const [car_value, setcar_value] = useState("");
  const [risk_rating, setrisk_rating] = useState("");
  const [quote, setquote] = useState(null);
  const [error, setError] = useState("");

  const handlecar_valueChange = (event) => {
    setcar_value(event.target.value);
  };

  const handlerisk_ratingChange = (event) => {
    setrisk_rating(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message

    if (!car_value || !risk_rating) {
      setError("Please provide both the car's value and risk rating.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_value: Number(car_value),
          risk_rating: Number(risk_rating),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setquote(data);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>Car Quote Calculater </h1>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="word">
              Car Value:
            </label>
            <input
              type="number"
              id="word"
              value={car_value}
              onChange={handlecar_valueChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="year">
              Risk Rating:
            </label>
            <input
              type="number"
              id="year"
              value={risk_rating}
              onChange={handlerisk_ratingChange}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Calculate
          </button>

          {error && <p className={styles.error}>{error}</p>}

          {quote !== null && (
            <p className={styles.result}>
              Your quote is:
              <span className={styles.resultEmphasise}>
                ${quote.quoteYearly}
              </span>
              <h5 className={styles.h5}>Annual Premium</h5>
              <span className={styles.resultEmphasise}>
                ${quote.quoteMonthly}
              </span>
              <h5 className={styles.h5}>Monthly Premium</h5>
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default API03;
