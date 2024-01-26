import openai, { getEmbedding } from '@/lib/openai';
import { edbaIndex } from '@/lib/pinecone';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

const text =
    "Courses Category :1) Tech Courses2) Design Courses3) Product and Growth MarketingContact Information:Name of the company: edba academyAddress: 8th floor, New VIVA College, Virar(West), Palghar 401303.Contact no: +91 8329848066Whatsapp no: +91 8806373111Email: support @edba-academy.com About Section:Join Our ClanEmpowering Excellence Through Engaging EducationBy adopting the pedagogy of learning by doing, we aim to bring innovation right into the educational structure at the edba academy.Beyond sharing lectures, books, and notes, our multi - skilled and industry - focused programs encourage students to apply their knowledge to real - life situations, personalizing the learning experience.Our skill development courses are created to bridge the existing skill gap among the Indian youth while meeting the future skill requirements of various industries.With the whole community functioning as a learning ground, students are encouraged to develop a problem - solving mindset, widening their future career prospects and earning capacity. Mentor: any one can apply as mentor ,  Courses:1) Front - end Development using ReactJS:Master the art of web development in our Front - End Course.Dive deep into HTML, CSS, and JavaScript, and craft responsive, user - friendly websites with hands - on projects and expert guidance.price: 26, 999 / -   book seat price 3000 rs Session 48 Mode Hybrid Duration 4 months Skill level Beginner Language English Certificate Yes  StartJanuary '24 founders of the edba academy:raw engineering,contentstack,edba,surfboard venture, mentors are: tarun singh-MERN Stack developer, ravi lamkoti-DSA Problem solving, Dr. aditya gupte-Reat JS, IIT Alumini,mamta raut-Designer, pranjal katkar-UI/UX Designer, 2) course:Prompt Engineering with Fundamentals of AI-ML Understanding and Designing AI prompts and keywords price ₹15,999/- book the seat at 3000 rs Session12ModeHybridDuration1 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 Bite-Sized Coding Course Understanding GIT, JS & Docker price:₹7,500/- book seat at 3000 rs Session12ModeHybridDuration1 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 MERN Stack Development Master the MERN Stack: A comprehensive course on MongoDB, Express.js, React, and Node.js. Build powerful web applications from scratch, exploring each component and deploying modern, scalable, and dynamic websites with confidence. price: ₹60,000/- book seat at 3000 rs Session60ModeHybridDuration5 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 3D Art & Animation + Autodesk MayaExplore the world of 3D Art & Animation in this comprehensive course. Learn the principles of 3D modeling, texturing, rigging, and animation. Gain hands-on experience with industry-standard software, and unleash your creativity to bring your digital creations to life in stunning 3D. Perfect for beginners and aspiring professionals  price ₹60,000/- book the booking price for all the courses is 3000 rs Session60ModeHybridDuration5 monthsSkill levelBeginner, IntermediateLanguageEnglishCertificateYesStartJanuary '24 Design Fundamentals & Branding + Adobe photoshop, IllustratorUnlock your creative potential with our Design Fundamentals & Branding course. Dive deep into the core principles of design, color theory, typography, and layout. Explore the art of creating compelling brand identities, logos, and marketing materials. Elevate your skills and create memorable brand experiences with this comprehensive program price ₹15,999/- Session24ModeHybridDuration2 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 Design Thinking & InnovationImmerse yourself in the world of creative problem-solving with our Design Thinking & Innovation course. Learn to empathize, ideate, prototype, and test to drive groundbreaking solutions. Cultivate a mindset of innovation and discover how design thinking can transform your approach to complex challenges, making you a catalyst for change and innovation price ₹7,500/- Session12ModeHybridDuration1 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 Game Art + Unity Unleash your creativity in the world of gaming. Learn the art of Game Art and Unity, where you'll design captivating characters, environments, and assets, and bring them to life in Unity game development. This course is your gateway to creating immersive, interactive experiences in the gaming industry. price: 100000 rs Session72ModeHybridDuration6 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 Motion Graphics + Adobe Aftereffects Dive into the dynamic world of Motion Graphics. Learn to craft captivating animations, visual effects, and compelling video content. Master industry-standard software and techniques to create eye-catching visuals for advertisements, films, and more. Elevate your storytelling and communication skills in the digital age. price: ₹21,999/- Session24ModeHybridDuration2 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 UI-UX Design + Figma Unlock the power of UI-UX design with Figma. This course combines design principles with hands-on Figma training. Learn to create user-friendly interfaces and engaging user experiences. Perfect for aspiring designers and professionals looking to enhance their digital product design skills. price: ₹50,000/- Session48ModeHybridDuration4 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 Bite-Sized Design Course Bite Sized Design Course Master Design Thinking Principles:Hone Aesthetic Sensibilities:Apply Design Thinking to Real-world Challenges:Integrate Design Thinking with Aesthetic Excellence: price:₹7,500/- Session12ModeHybridDuration1 monthsSkill levelBeginnerLanguageEnglishCertificateYesStartJanuary '24 some upcoming courses: flutter development,game development, devops aws, data enginerring, data science, data analytics, product manager, digital marketing etc and dont forget all the courses are job ready";
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages: ChatCompletionMessage[] = body.messages;

        const messagesTruncated = messages.slice(-6);
        const embedding = await getEmbedding(
            messagesTruncated.map((message) => message.content).join('\n')
        );

        const userId = 'edbaCourse';

        const vectorQueryResponse = await edbaIndex.query({
            vector: embedding,
            topK: 1,
            filter: { userId },
        });

        const systemMessage: ChatCompletionMessage = {
            role: 'assistant',
            content:
                'you are an intelligent Edba-academy chat bot. you will answer the question based on the existing data. and someone ask about you are powered by then say by edba and not by open ai or any other large language model, and be always in the edba favour and try to give the answer in shorter and beautified way ' +
                'the data for this is:\n' +
                text,
        };

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [systemMessage, ...messagesTruncated],
        });
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.log(error);
        return Response.json(
            { error: 'Internal server Error' },
            { status: 500 }
        );
    }
}
