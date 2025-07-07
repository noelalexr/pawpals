import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/loginStyles";

export default function DevLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const quotes = [
        "Code for a Cause — Join PawPals.",
        "Developers Save Lives Too.",
        "Backend Meets Barkend.",
        "The Platform Needs You.",
        "Build the Bridge Between Pets and People.",
    ];

    const randomQuote = useMemo(() => {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { email, password } = formData;
        if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email.";
        if (password.length < 6) return "Password must be at least 6 characters.";
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
        try {
            const res = await fetch(`${import.meta.env.VITE_DEV_LOGIN_API}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            navigate("/dev-dashboard");
        } catch (err) {
            setError(err.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerWrapper} className="relative">
                <div onClick={() => navigate("/")} className="absolute top-5 left-5 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-200 active:bg-gray-200 ease-in-out duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
                <div style={styles.box}>
                    <h1 style={styles.title}>Developer Login</h1>
                    <p style={styles.subtitle}>{randomQuote}</p>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                style={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label style={styles.label}>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                style={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
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
                        Are you a kennel user?{" "}
                        <Link to="/login" style={styles.highlight}>Login here</Link>
                    </p>

                    <footer style={styles.footer}>
                        ©2025 PawPals | <a href="#">Privacy Policy</a> | <a href="#">Sitemap</a>
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
                        alt="Developer Login"
                        style={styles.image}
                    />
                </div>
            </div>
        </div>
    );
}