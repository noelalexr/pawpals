export const fetchPets = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets`, {
      method: "GET",
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");

    // Catch non-JSON responses
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text(); // Get the raw HTML or error
      console.error("Unexpected response format:", text); // Log it to debug
      throw new Error("Expected JSON response but got something else.");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch pets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading pets:", error.message);
    throw error;
  }
};

export const fetchMyPets = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/mine`, {
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/mine/${id}`, {
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
