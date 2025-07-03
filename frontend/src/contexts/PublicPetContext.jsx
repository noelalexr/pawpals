import { createContext, useState, useEffect } from "react";
import { fetchPets } from "../loaders/dataLoader.js"

export const PublicPetContext = createContext();

export const PublicPetProvider = ({ children }) => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [petsData] = await Promise.all([
                fetchPets(),
            ]);

            setPets(petsData);
        } catch (error) {
            console.error("Error loading data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PublicPetContext.Provider value={{ pets, loading, error, refetchPets: fetchData }}>
            {children}
        </PublicPetContext.Provider>
    );
};