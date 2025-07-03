import { createContext, useState, useEffect } from "react";
import { fetchMyPets } from "../loaders/dataLoader.js"

export const PrivatePetContext = createContext();

export const PrivatePetProvider = ({ children }) => {
    const [myPets, setMyPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [myPetsData] = await Promise.all([
                fetchMyPets(),
            ]);

            setMyPets(myPetsData);
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
        <PrivatePetContext.Provider value={{ myPets, loading, error, refetchMyPets: fetchData }}>
            {children}
        </PrivatePetContext.Provider>
    );
};