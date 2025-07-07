import { useState } from "react";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [userName, setUsername] = useState("User");
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if(input.trim() !== ""){
            const userMessage = { from: "user", text: input };
            setMessages((prev) => [...prev, userMessage]);
            setInput("");

            const response = await fetch("http://localhost:3000/api/chatbot/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userMessage: input }),
            });

            const data = await response.json();
            const aiResponse = {
                from: "ai",
                text: data.aiResponse,
            };

            setMessages((prev) => [...prev, aiResponse]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-50">
            {open ? (
                <div className="w-80 h-96 bg-white shadow-lg rounded-xl p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold">PetBot</h2>
                        <button onClick={() => setOpen(false)}>X</button>
                    </div>
                    <div className="flex-1 overflow-y-auto border p-2 mb-2 text-sm space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg ${
                                    msg.from === "user"
                                        ? "bg-blue-100 self-end text-right"
                                        : "bg-gray-100 self-start"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Ask me something, ${userName} 🐕🐈🐦`}
                            className="w-full border rounded px-2 py-1"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-3 rounded"
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
                >
                    💬 I can help you find a pet! 🐕🐈🐦
                </button>
            )}
        </div>
    );
};

export default Chatbot;