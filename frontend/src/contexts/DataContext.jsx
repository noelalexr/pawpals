import { createContext, useState, useEffect } from "react";
import { fetchPets } from "../loaders/dataLoader.js"

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [pets, setPets] = useState([]);
    // const [petDetails, setPetDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [petsData,] = await Promise.all([
                fetchPets(),
                // fetchPetDetails(),
            ]);

            setPets(petsData);
            // setPetDetails(petDetailsData);
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
        <DataContext.Provider value={{ pets, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};