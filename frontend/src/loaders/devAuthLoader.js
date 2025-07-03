import { redirect } from "react-router-dom";

export async function devAuthLoader() {
    try {
        const response = await fetch(import.meta.env.VITE_VALIDATE_DEV_API, {
        method: "GET",
        credentials: "include",
        });

        if (!response.ok) {
        return redirect("/dev-login");
        }

        const result = await response.json();

        if (!result.valid) {
        return redirect("/dev-login");
        }

        return null; // Auth success
    } catch {
        return redirect("/dev-login"); // Fallback on error
    }
}