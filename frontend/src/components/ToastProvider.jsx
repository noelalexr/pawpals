import { ToastContainer } from 'react-toastify';

function getToastClassName({ type }) {
    switch (type) {
        case 'success':
            return "bg-[#4B7FBB] text-white font-semibold text-sm rounded-sm rounded-l-xl shadow-lg py-4 pl-6 pr-10 flex border-l-12 border-1 border-green-600";
        case 'warning':
            return "bg-[#4B7FBB] text-white font-semibold text-sm rounded-md rounded-l-xl shadow-lg py-4 pl-6 pr-10 flex border-l-12 border-1 border-yellow-400";
        case 'error':
            return "bg-[#4B7FBB] text-white font-semibold text-sm rounded-md rounded-l-xl shadow-lg py-4 pl-6 pr-10 flex border-l-12 border-1 border-red-500";

    }
}

export default function ToastProvider() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            pauseOnHover
            draggable
            theme="light"

            toastClassName={(context) => getToastClassName(context)}
            toastBodyClassName="text-2xl"
        />
    );
}
