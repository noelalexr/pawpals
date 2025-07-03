import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginStyles";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/dev/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Server responded with:", data);
        throw new Error(data.message || "Login failed");
      }

      console.log("Login success:", data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerWrapper}>
        <div style={styles.box}>
          <h1 style={styles.title}>
            Welcome to{" "}
            <span>
              <span style={{ color: "#749CC9" }}>Paw</span>
              <span style={{ color: "black" }}>Pals</span>
            </span>
          </h1>
          <p style={styles.subtitle}>{randomQuote}</p>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div>
              <label style={styles.label}>Email Address</label>
              <input
                name="email"
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
                name="password"
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
            <a href="/signup" style={styles.highlight}>
              Sign up
            </a>
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
