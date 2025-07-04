import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImage from "../assets/images/form-assets/pawpal_signup.jpg";
import styles from "../styles/signupStyles";

export default function DevSignup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/dev/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                alert("Developer account registered! You may now login.");
                navigate("/dev/login");
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerWrapper}>
                <div style={styles.box}>
                    <h1 style={styles.title}>Register as Developer</h1>
                    <p style={styles.subtitle}>{randomQuote}</p>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <label style={styles.label}>Full Name</label>
                            <input
                                name="name"
                                type="text"
                                style={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <div style={styles.errorText}>{errors.name}</div>
                            )}
                        </div>

                        <div>
                            <label style={styles.label}>Email</label>
                            <input
                                name="email"
                                type="email"
                                style={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <div style={styles.errorText}>{errors.email}</div>
                            )}
                        </div>

                        <div>
                            <label style={styles.label}>Password</label>
                            <input
                                name="password"
                                type="password"
                                style={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <div style={styles.errorText}>{errors.password}</div>
                            )}
                        </div>

                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? "Submitting..." : "Register"}
                        </button>
                    </form>

                    <p style={styles.instruction}>
                        Already have a developer account?{" "}
                        <Link to="/dev/login" style={styles.highlight}>
                            Login here
                        </Link>
                    </p>

                    <p style={styles.instruction}>
                        Are you a kennel user?{" "}
                        <Link to="/login" style={styles.highlight}>
                            Login here
                        </Link>
                    </p>
                </div>

                <div style={styles.imageContainer}>
                    <img
                        src={signupImage}
                        alt="Developer Signup Illustration"
                        style={styles.image}
                    />
                </div>
            </div>
        </div>
    );
}