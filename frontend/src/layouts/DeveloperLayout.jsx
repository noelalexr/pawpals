import { Outlet } from "react-router-dom";

const DeveloperLayout = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default DeveloperLayout;
