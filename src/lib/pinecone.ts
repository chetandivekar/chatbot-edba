import { Pinecone } from '@pinecone-database/pinecone';
const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
    throw new Error('OpenAI key is not available');
}

const pinecone = new Pinecone({
    apiKey,
});

export const edbaIndex = pinecone.Index('chatbot-app');
