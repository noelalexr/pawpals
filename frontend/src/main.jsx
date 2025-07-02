import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from './router';

import { PrivatePetProvider } from './contexts/PrivatePetContext';
import { PublicPetProvider } from './contexts/PublicPetContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PublicPetProvider>
            <PrivatePetProvider>

                <RouterProvider router={router} />
            </PrivatePetProvider>
        </PublicPetProvider>

    </StrictMode>,
)
