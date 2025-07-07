import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImage from "../assets/images/form-assets/pawpal_signup.jpg";
import styles from "../styles/signupStyles";

export default function Signup() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
            "website",
            "documents",
        ];

        requiredFields.forEach((field) => {
            const value = field.includes(".")
                ? formData[field.split(".")[0]]?.[field.split(".")[1]]
                : formData[field];

            if (
                value === undefined ||
                value === null ||
                (typeof value === "string" && value.trim() === "")
            ) {
                newErrors[field] = "This field is required.";
            }

            if (field === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
                newErrors.email = "Invalid email format.";
            }

            if (field === "password" && value && value.length < 6) {
                newErrors.password = "Password must be at least 6 characters.";
            }
        });

        if (
            !Array.isArray(formData.documents) ||
            formData.documents.length === 0 ||
            formData.documents.some((doc) => doc.trim() === "")
        ) {
            newErrors.documents = "At least one valid document link is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log("Submitting formData:", formData);
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_REGISTER_API}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                alert("Signup successful! Please wait for approval.");
            } else {
                alert(data.error || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error("Error during signup:", err);
            alert("An error occurred. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerWrapper}>
                <div style={styles.box}>
                    <h1 style={styles.title}>
                        Register with{" "}
                        <span>
                            <span style={{ color: "#749CC9" }}>Paw</span>
                            <span style={{ color: "black" }}>Pals</span>
                        </span>
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
                                    value={
                                        name.includes(".")
                                            ? formData[name.split(".")[0]]?.[name.split(".")[1]] || ""
                                            : formData[name] || ""
                                    }
                                    onChange={handleChange}
                                />
                                {errors[name] && (
                                    <div style={styles.errorText}>{errors[name]}</div>
                                )}
                            </div>
                        ))}

                        <div>
                            <label style={styles.label}>
                                Documents Upload (comma-separated Google Drive links):
                            </label>
                            <input
                                type="text"
                                name="documents"
                                style={styles.input}
                                value={(formData.documents || []).join(", ")}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        documents: e.target.value
                                            .split(",")
                                            .map((doc) => doc.trim())
                                            .filter((doc) => doc),
                                    })
                                }
                            />
                            {errors.documents && (
                                <div style={styles.errorText}>{errors.documents}</div>
                            )}
                        </div>

                        <p style={styles.instruction}>
                            <b>
                                Please upload the scanned copy of the following requirements to
                                a Google Drive:
                            </b>
                            <br />
                            <br />
                            - Government-Issued ID
                            <br />
                            - Business Permit/Mayor's Permit
                            <br />
                            - SEC/DTI Registration (For Private Kennels Only)
                            <br />
                            - Pound Registration Certificate (For LGU-run pounds)
                            <br />
                            - Animal Welfare Act Compliance Certificate
                            <br />
                            - Veterinary Health Certificate
                        </p>

                        <p style={styles.instruction}>
                            A member from PawPals will notify you if your application is
                            approved. Kindly ensure your contact details are active and up to
                            date.
                        </p>

                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>

                    <p style={styles.instruction}>
                        Already have an account?{" "}
                        <Link to="/login" style={styles.highlight}>
                            Login Here
                        </Link>
                    </p>

                </div>


                <div className="w-[1000px] md:block hidden">
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