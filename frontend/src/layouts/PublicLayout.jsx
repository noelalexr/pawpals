import { Outlet } from "react-router-dom";
import Chatbot from "../components/Chatbot.jsx";

const PublicLayout = () => {
    return (
        <div>
            <main>
                <Outlet />
                <Chatbot /> {/* Floating */}
            </main>
        </div>
    );
};

export default PublicLayout;
