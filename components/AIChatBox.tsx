'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from 'ai';
import { useChat } from 'ai/react';
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

    return (
        <div
            className={`bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36 ${
                open ? 'fixed' : 'hidden'
            }`}
        >
            <button onClick={onClose} className="mb-1 ms-auto block">
                X
            </button>
            <div className="flex h-[600px] flex-col rounded bg-background border shadow-xl">
                <div className="h-full">
                    {messages.map((message, i) => (
                        <ChatMessage message={message} key={i} />
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="type here ..."
                    />
                    <Button type="submit">Send</Button>
                </form>
            </div>
        </div>
    );
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
    return (
        <div>
            <div>{role}</div>
            <div>{content}</div>
        </div>
    );
}
