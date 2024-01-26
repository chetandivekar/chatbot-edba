'use client';
import { useState } from 'react';
import AIChatBot from './AIChatBox';
import { Button } from '@/components/ui/button';

export default function AIChatButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    return (
        <>
            <Button
                onClick={() => {
                    setChatBoxOpen(true);
                }}
            >
                Ai Chat
            </Button>
            <AIChatBot
                open={chatBoxOpen}
                onClose={() => setChatBoxOpen(false)}
            />
        </>
    );
}
