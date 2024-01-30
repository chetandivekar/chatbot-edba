import OpenAI from 'openai';

const apiKey1 = process.env.OPENAI_API_KEY1;

if (!apiKey1) {
    throw new Error('OpenAI key is not available');
}

const openai = new OpenAI({ apiKey: apiKey1 });

export default openai;

export async function getEmbedding(text: string) {
    const response = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
    });

    const embedding = response.data[0].embedding;

    if (!embedding) {
        throw Error('Error while genrating embedding.');
    }

    // console.log(embedding);
    return embedding;
}
