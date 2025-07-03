// src/api/developerApi.js
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