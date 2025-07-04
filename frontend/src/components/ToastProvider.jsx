import { ToastContainer } from 'react-toastify';

function getToastClassName({ type }) {
    switch (type) {
        case 'success':
            return "bg-white text-black/50 font-semibold text-sm rounded-md rounded-l-xl shadow-lg py-4 pl-6 pr-10 flex border-l-12 border-1 border-green-600";
        case 'warning':
            return "bg-white text-black/50 font-semibold text-sm rounded-md rounded-l-xl shadow-lg py-4 pl-6 pr-10 flex border-l-12 border-1 border-yellow-400";
        case 'error':
            return "bg-white text-black/50 font-semibold text-sm rounded-md rounded-l-xl shadow-lg py-4 pl-6 pr-10 flex border-l-4 border-red-500";

    }
}

export default function ToastProvider() {
    return (
        <ToastContainer
            position="top-center"
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
