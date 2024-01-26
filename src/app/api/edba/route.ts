import { getEmbedding } from '@/lib/openai';
import { edbaIndex } from '@/lib/pinecone';

const text =
    "Courses Category :1) Tech Courses2) Design Courses3) Product and Growth MarketingContact Information:Name of the company: edba academyAddress: 8th floor, New VIVA College, Virar(West), Palghar 401303.Contact no: +91 8329848066Whatsapp no: +91 8806373111Email: support @edba-academy.comAbout Section:Join Our ClanEmpowering Excellence Through Engaging EducationBy adopting the pedagogy of learning by doing, we aim to bring innovation right into the educational structure at the edba academy.Beyond sharing lectures, books, and notes, our multi - skilled and industry - focused programs encourage students to apply their knowledge to real - life situations, personalizing the learning experience.Our skill development courses are created to bridge the existing skill gap among the Indian youth while meeting the future skill requirements of various industries.With the whole community functioning as a learning ground, students are encouraged to develop a problem - solving mindset, widening their future career prospects and earning capacity.Courses:1) Front - end Development using ReactJS:Master the art of web development in our Front - End Course.Dive deep into HTML, CSS, and JavaScript, and craft responsive, user - friendly websites with hands - on projects and expert guidance.price: 26, 999 / -            book seat price 3000 rsSession48ModeHybridDuration4 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24";
const userId = 'edbaCourse';
const text1 = 'hel;lo';
export async function POST() {
    const embedding = await getEmbeddingForEdba(text1);
    await edbaIndex.upsert([
        {
            id: '1',
            values: embedding,
            metadata: {
                userId,
            },
        },
    ]);
}

async function getEmbeddingForEdba(text: string) {
    return getEmbedding(text);
}
