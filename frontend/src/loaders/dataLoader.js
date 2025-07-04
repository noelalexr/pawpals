export const fetchPets = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_PETS_API}`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch pets");
        return await response.json();
    } catch (error) {
        console.error("Error loading pets:", error);
        throw error;
    }
};

export const fetchMyPets = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_MY_PETS_API}`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch my pets");
        return await response.json();
    } catch (error) {
        console.error("Error loading my pets:", error);
        throw error;
    }
};

export const fetchMyPetDetails = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_MY_PETS_API}/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch my pet details");
        return await response.json();
    } catch (error) {
        console.error("Error loading my pet details:", error);
        throw error;
    }
};

export const fetchPendingKennels = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dev/kennels/pending`, {
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch pending kennels");
        return await res.json();
    } catch (error) {
        console.error("Error fetching pending kennels:", error);
        throw error;
    }
};

export const fetchLoggedinKennel = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_VALIDATE_API}`, {
            method: "GET",
            credentials: "include",
        });

        const result = await response.json();
        if (!response.ok || !result.valid) {
            throw new Error("Unauthorized");
        }

        return result.user;
    } catch (err) {
        console.error("Failed to validate user:", err);
        return null;
    }
};