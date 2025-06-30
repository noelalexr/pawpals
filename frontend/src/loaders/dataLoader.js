export const fetchPets = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets`, {
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

// export const fetchPetDetails = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3000/api/pets/${id}`, {
//             method: "GET",
//             credentials: "include",
//         });
//         if (!response.ok) throw new Error("Failed to fetch pet details");
//         return await response.json();
//     } catch (error) {
//         console.error("Error loading pet details:", error);
//         throw error;
//     }
// };