import { redirect } from "react-router-dom";

export async function authLoader() {
    try {
        const response = await fetch(import.meta.env.VITE_VALIDATE_API, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            return redirect("/login");
        }

        const result = await response.json();

        if (!result.valid) {
            return redirect("/login");
        }

        return null; // Auth success
    } catch {
        return redirect("/login"); // Fallback on error
    }
}