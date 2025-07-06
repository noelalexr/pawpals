import { Outlet } from "react-router-dom";
import Chatbot from "../components/Chatbot.jsx";
import ScrollToTop from "../components/ScrollToTop";

const PublicLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <main>
                <Outlet />
                <Chatbot /> {/* Floating */}
            </main>
        </div>
    );
};

export default PublicLayout;
