import logoGif from "../assets/images/logo/logo-gif.gif";

const LoaderPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen gap-3">
            <img src={logoGif} alt="logo-gif" className="w-40" />
            <p className="my-auto text-[#3B6FA1] font-semibold text-xl">Loading...</p>
        </div>
    )
}

export default LoaderPage
