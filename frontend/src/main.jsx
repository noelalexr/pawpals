import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from './router';


import { PublicPetProvider } from './contexts/PublicPetContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PublicPetProvider>
            <RouterProvider router={router} />
        </PublicPetProvider>
    </StrictMode>,
)
