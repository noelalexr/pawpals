import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import signupImage from "../assets/images/form-assets/pawpal_signup.jpg";

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
        justifyContent: "flex-start",
        height: "90vh",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#ccc #fff",
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
    errorText: {
        color: "red",
        fontSize: "0.75rem",
        marginTop: "0.25rem",
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
    const [errors, setErrors] = useState({});

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
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
            setErrors((prev) => ({ ...prev, [`${parent}.${child}`]: "" }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            "name",
            "email",
            "password",
            "location.fullAddress",
            "location.citySort",
            "contact",
        ];

        requiredFields.forEach((field) => {
            const value = field.includes(".")
                ? formData[field.split(".")[0]]?.[field.split(".")[1]]
                : formData[field];

            if (!value || value.trim() === "") {
                newErrors[field] = "This field is required.";
            }

            if (field === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
                newErrors.email = "Invalid email format.";
            }

            if (field === "password" && value && value.length < 6) {
                newErrors.password = "Password must be at least 6 characters.";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:3000/api/kennels", { //insert this the exact backend once ready.
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Signup successful! Please wait for approval.");
            } else {
                const data = await response.json();
                alert(data.message || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerWrapper}>
                <div style={styles.box}>
                    <h1 style={styles.title}>
                        Register with <span><span style={{ color: "#749CC9" }}>Paw</span><span style={{ color: "black" }}>Pals</span></span>
                    </h1>
                    <p style={styles.subtitle}>{randomQuote}</p>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        {[
                            { label: "Kennel Name", name: "name" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Password", name: "password", type: "password" },
                            { label: "Full Address", name: "location.fullAddress" },
                            { label: "City", name: "location.citySort" },
                            { label: "Contact Number", name: "contact" },
                            { label: "Website", name: "website" },
                            { label: "Facebook Link", name: "socialLinks.facebook" },
                            { label: "Instagram Link", name: "socialLinks.instagram" },
                            { label: "TikTok Link", name: "socialLinks.tiktok" },
                        ].map(({ label, name, type = "text" }) => (
                            <div key={name}>
                                <label style={styles.label}>{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    style={styles.input}
                                    onChange={handleChange}
                                />
                                {errors[name] && (
                                    <div style={styles.errorText}>{errors[name]}</div>
                                )}
                            </div>
                        ))}

                        <div>
                            <label style={styles.label}>Documents Upload (Please review the required documents listed below and provide the Google Drive link to your submission):</label>
                            <input
                                type="text"
                                name="documents"
                                style={styles.input}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        documents: e.target.value
                                            .split(",")
                                            .map((doc) => doc.trim()),
                                    })
                                }
                            />
                        </div>

                        <p style={styles.instruction}>
                            <b>Please upload the scanned copy of the following requirements to a google drive</b>:
                            <br />
                            <br />
                            - Government-Issued ID<br />
                            - Business Permit/Mayor's Permit<br />
                            - SEC/DTI Registration (For Private Kennels Only)<br />
                            - Pound Registration Certificate (For LGU-run pounds)<br />
                            - Animal Welfare Act Compliance Certificate<br />
                            - Veterinary Health Certificate
                        </p>

                        <p style={styles.instruction}>
                            A member from PawPals will notify you if your application is
                            approved. Kindly ensure your contact details are active and up to
                            date.
                        </p>

                        <button type="submit" style={styles.button}>
                            Submit Application
                        </button>
                    </form>

                    <p style={styles.instruction}>
                        Already have an account?{" "}
                        <Link to="/" style={styles.highlight}>
                            Go to Login
                        </Link>
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
