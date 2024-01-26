import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error('OpenAI key is not available');
}

const openai = new OpenAI({ apiKey });

export default openai;
