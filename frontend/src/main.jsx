import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from './router';


import { PublicPetProvider } from './contexts/PublicPetContext';
import ToastProvider from './components/ToastProvider';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PublicPetProvider>
            <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
        </PublicPetProvider>
        <ToastProvider />
    </StrictMode>,
)
