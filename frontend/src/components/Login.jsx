import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

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
    maxWidth: "1700px",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.95)", // optional overlay
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
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
  },
  highlight: {
    color: "#749cc9",
  },
  subtitle: {
    color: "#4b5563",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.2rem",
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
  signupText: {
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#4b5563",
    marginTop: "1rem",
  },
  footer: {
    marginTop: "2rem",
    fontSize: "0.875rem",
    color: "#6b7280",
    textAlign: "center",
  },
  imageContainer: {
    width: "1200px",
    display: "block",
    height: "600px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  error: {
    color: "red",
    fontSize: "0.75rem",
    marginTop: "0.25rem",
  },
  togglePassword: {
    cursor: "pointer",
    fontSize: "0.75rem",
    color: "#4b5563",
    marginTop: "0.25rem",
    textAlign: "right",
  },
};

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const quotes = [
    "Give Love a Home — Adopt from the Pound.",
    "Where Second Chances Begin.",
    "They’re Waiting for a Family. Could It Be Yours?",
    "Find Love. Save a Life.",
    "Rescue the Lonely. Adopt a Friend.",
    "Every Paw Has a Story. Help Rewrite It.",
    "Be the Reason a Tail Wags Again.",
    "From Forgotten to Family — Adopt Today.",
    "Paws Up for Adoption!",
    "Tails Are Wagging — Come Say Hello!",
    "Adopt, Don’t Shop — The Pound's Full of Love.",
    "Fur-Ever Starts Here!",
    "Unleash Joy — Adopt from the Pound!",
    "Big Hearts Behind These Kennels.",
    "The Best Pets Aren’t Bought — They’re Rescued.",
    "Your Kindness is Their New Beginning.",
    "Together, We Can End Homelessness for Pets.",
    "Adoption is the First Step to a Better Life.",
    "Be Their Hero — Adopt from the Pound.",
    "Help Us Empty Cages and Fill Homes.",
  ];

  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const validate = () => {
    const { email, password } = formData;
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful!");
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerWrapper}>
        <div style={styles.box}>
          <h1 style={styles.title}>
            Welcome to <span><span style={{ color: "#749CC9" }}>Paw</span><span style={{ color: "black" }}>Pals</span></span>
          </h1>
          <p style={styles.subtitle}>{randomQuote}</p>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                style={styles.input}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={styles.label}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                style={styles.input}
                onChange={handleChange}
              />
              <div
                style={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </div>
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <p style={styles.signupText}>
  Don't have an account?{" "}
  <Link to="/signup" style={styles.highlight}>
    Sign up
  </Link>
</p>
          <footer style={styles.footer}>
            ©2025 PawPals | <a href="#">Privacy Policy</a> |{" "}
            <a href="#">Sitemap</a>
          </footer>
        </div>

        <div
          style={{
            ...styles.imageContainer,
            display: window.innerWidth < 768 ? "none" : "block",
          }}
        >
          <img
            src="https://t3.ftcdn.net/jpg/04/81/85/46/360_F_481854656_gHGTnBscKXpFEgVTwAT4DL4NXXNhDKU9.jpg"
            alt="Adoptable Dog"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
