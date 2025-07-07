import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const PrivateLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default PrivateLayout;
