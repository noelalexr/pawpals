import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImage from "../assets/images/form-assets/pawpal_signup.jpg";
import styles from "../styles/signupStyles";
import { toast } from "react-toastify";

export default function DevSignup() {
    const navigate = useNavigate()

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
            const response = await fetch(`${import.meta.env.VITE_DEV_REGISTER_API}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                toast.success("Developer account registered! You may now login.");
                navigate("/dev-login");
            } else {
                toast.error(data.message || "Registration failed.");
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerWrapper} className="relative">
                <div onClick={() => navigate("/dev-dashboard")} className="absolute top-5 left-5 rounded-full text-[#4B7FBB] p-3 hover:bg-gray-200 active:bg-gray-200 ease-in-out duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
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
                </div>

                <div className="w-[1000px] md:block hidden">
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