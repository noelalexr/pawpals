import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import signupImage from "../assets/pawpal_signup.jpg";
import emailjs from "@emailjs/browser";

const styles = {
  container: {
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('https://cdn.wallpapersafari.com/3/12/w09t6B.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "sans-serif",
    padding: 0,
  },
  innerWrapper: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "0.5rem",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    overflow: "hidden",
    maxWidth: "1200px",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  box: {
    backgroundColor: "#fff",
    width: "500px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.3rem",
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: "0.1rem",
  },
  highlight: {
    color: "#749cc9",
    textDecoration: "none",
  },
  subtitle: {
    color: "#4b5563",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "0.25rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.5rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  instruction: {
    fontSize: "0.85rem",
    color: "#4b5563",
    marginTop: "1rem",
  },
  button: {
    backgroundColor: "#416b9f",
    color: "white",
    fontWeight: 600,
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  imageContainer: {
    width: "1000px",
    height: "auto",
    display: "block",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    display: "block",
  },
};

export default function Signup() {
  const [formData, setFormData] = useState({});

  const quotes = [
    "Give Love a Home — Adopt from the Pound.",
    "Where Second Chances Begin.",
    "They’re Waiting for a Family. Could It Be Yours?",
    "Find Love. Save a Life.",
    "Be Their Hero — Adopt from the Pound.",
  ];

  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_tenbebt",
      "template_0rpmb44",
      formData,
      "JoGqE1mRi5hnh1eUz"
    )
    .then(() => {
      alert("Your signup application has been submitted and emailed to PawPal. Please monitor your email and contact number for updates.");
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("There was an issue submitting your application. Please try again later.");
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerWrapper}>
        <div style={styles.box}>
          <h1 style={styles.title}>
            Register with <span style={styles.highlight}>PawPal</span>
          </h1>
          <p style={styles.subtitle}>{randomQuote}</p>

          <form style={styles.form} onSubmit={handleSubmit}>
            {[
              { label: "Name of Authorized Representative", name: "representative" },
              { label: "Name of Kennel/Pound", name: "kennel" },
              { label: "Address", name: "address" },
              { label: "Email", name: "email" },
              { label: "Contact Number", name: "contact" },
              { label: "Landline", name: "landline" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label style={styles.label}>{label}</label>
                <input type="text" name={name} required style={styles.input} onChange={handleChange} />
              </div>
            ))}

            <p style={styles.instruction}>
              Please send the following requirements to <b>pawpal@gmail.com</b>:
              <br />
              - Government-Issued ID<br />
              - Business Permit/Mayor's Permit<br />
              - SEC/DTI Registration (For Private Kennels Only)<br />
              - Pound Registration Certificate (For LGU-run pounds)<br />
              - Animal Welfare Act Compliance Certificate<br />
              - Veterinary Health Certificate
            </p>

            <p style={styles.instruction}>
              A member from PawPal will notify you if your application is approved. Kindly ensure your contact details are active and up to date.
            </p>

            <button type="submit" style={styles.button}>Submit Application</button>
          </form>

          <p style={styles.instruction}>
            Already have an account? <Link to="/" style={styles.highlight}>Go to Login</Link>
          </p>
        </div>

        <div style={styles.imageContainer}>
          <img
            src={signupImage}
            alt="Signup Illustration"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
