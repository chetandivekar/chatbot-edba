'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from 'ai';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
interface AiChatBoxProps {
    open: boolean;
    onClose: () => void;
}
export default function AIChatBot({ open, onClose }: AiChatBoxProps) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error,
    } = useChat();

    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        // Using native DOM methods to scroll to the bottom
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };
    return (
        <div
            className={`bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36 ${
                open ? 'fixed' : 'hidden'
            }`}
        >
            <button onClick={onClose} className="mb-1 ms-auto block">
                X
            </button>
            <div
                className="flex h-[600px] flex-col rounded bg-background border shadow-xl overflow-y-scroll"
                ref={messagesContainerRef}
            >
                <div className="h-full">
                    {messages.map((message, i) => (
                        <ChatMessage message={message} key={i} />
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mb-2 flex gap-1 ">
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="type here ..."
                    maxLength={150}
                    className={
                        input.length > 149
                            ? 'border-none focus-visible:ring-orange-500 focus-visible:outline-none focus-visble:border-none'
                            : 'border-blue-500 focus:border-none focus-visible:outline-none focus-visble:border-none focus-visible:ring-blue-400'
                    }
                    // className="border-none focus-visible:ring-red-500 focus-visible:outline-none focus-visble:border-none "
                />
                <Button
                    disabled={isLoading || input.length > 149}
                    type="submit"
                >
                    Send
                </Button>
            </form>
        </div>
    );
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
    const displayRole = role === 'user' ? 'you' : 'edba-assistance';
    const alignClass =
        role === 'user' ? 'flex  justify-end' : 'flex justify-start ';

    const colorClass =
        role === 'user'
            ? 'bg-blue-500 text-white max-w-[70%]'
            : 'bg-gray-100 max-w-[70%]';
    return (
        <div className={`   w-full mb-2 mt-2`}>
            {/* <div className={` ${alignClass} `}>{displayRole}</div> */}
            <div className={` max-w-full ${alignClass} mb-4`}>
                <div
                    className={`p-2 mx-2 ${colorClass} rounded-sm max-w-full ${alignClass} mb-4`}
                >
                    {content}
                </div>
            </div>
        </div>
    );
}
