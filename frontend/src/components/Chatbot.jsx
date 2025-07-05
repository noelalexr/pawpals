import { useState } from "react";

const Chatbot = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-4 left-4 z-50">
            {open ? (
                <div className="w-80 h-96 bg-white shadow-lg rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold">PetBot</h2>
                        <button onClick={() => setOpen(false)}>X</button>
                    </div>
                    <div className="overflow-y-auto border p-2 mb-2 text-sm">
                        <p>Hello! I'm here to help you find a pet!</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Ask me something..."
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
                >
                    💬 I can help you find a pet!
                </button>
            )}
        </div>
    );
};

export default Chatbot;