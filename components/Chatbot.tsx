
import React, { useState, useRef, useEffect } from 'react';
import { runChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { CHATBOT_SAMPLE_QUESTIONS } from '../constants';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen && messages.length === 0) {
             // Initial greeting from bot
             setIsLoading(true);
             runChat("Hello!").then(response => {
                setMessages([{ sender: 'bot', text: response }]);
                setIsLoading(false);
             });
        }
    };
    
    const handleSend = async (question?: string) => {
        const userMessage = question || input;
        if (userMessage.trim() === '' || isLoading) return;

        const userMsg: ChatMessage = { sender: 'user', text: userMessage };
        setMessages(prevMessages => [...prevMessages, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await runChat(userMessage);
            const botMsg: ChatMessage = { sender: 'bot', text: botResponse };
            setMessages(prevMessages => [...prevMessages, botMsg]);
        } catch (error) {
            const errorMsg: ChatMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
            setMessages(prevMessages => [...prevMessages, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={toggleChat}
                    className="bg-green-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-green-800 transition-transform transform hover:scale-110"
                    aria-label="Toggle Chatbot"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="fixed bottom-24 right-5 w-full max-w-sm h-3/4 max-h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 transform transition-all duration-300 ease-out origin-bottom-right scale-100">
                    <header className="bg-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold text-lg">SmartTax Assistant</h3>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">&times;</button>
                    </header>
                    <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                         {messages.length === 0 && !isLoading && (
                             <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                                <h4 className="font-semibold mb-2">Try asking:</h4>
                                <div className="flex flex-col space-y-2">
                                    {CHATBOT_SAMPLE_QUESTIONS.map((q, i) => (
                                        <button key={i} onClick={() => handleSend(q)} className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                            {q}
                                        </button>
                                    ))}
                                </div>
                             </div>
                         )}
                        {isLoading && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 px-4 py-2 rounded-2xl">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
                        <div className="flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask a question..."
                                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleSend()}
                                className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700 disabled:bg-gray-400"
                                disabled={isLoading || input.trim() === ''}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;