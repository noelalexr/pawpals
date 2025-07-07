import { useNavigate } from "react-router-dom";

//IMAGES
import backgroundImage from "../assets/images/backgrounds/not-found.jpg"

const NotFound = () => {
    const navigate = useNavigate()


    return (
        <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="bg-black/70 h-screen w-screen flex flex-col items-center justify-center text-white">
                <p className="text-[#62abff] text-[160px] font-bold">Oops</p>
                <p className="font-semibold text-3xl -mt-3">404 - PAGE NOT FOUND</p>
                <div className="text-xs text-gray-300 pt-5">
                    <p>The page you are looking for might have been removed</p>
                    <p>had its name changed or is temporarily unavailable</p>
                </div>
                <button onClick={() => navigate("/")} className="bg-[#4B7FBB] py-2 px-4 rounded-full mt-7 hover:bg-[#406b9c] active:bg-[#406b9c] cursor-pointer transition-colors duration-300 ease-in-out">Go to Homepage</button>
            </div>
        </div>
    );
}

export default NotFound
