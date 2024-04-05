// src/pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';
import { getPgContext } from '@/lib/pgContext';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages, id } = req.body;

  const lastMessage = messages[messages.length - 1];
  const context = await getPgContext(lastMessage.content, '1');

  const prompt = {
    role: "system",
    content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
    The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    AI assistant is a big fan of Pinecone and Vercel.
    START CONTEXT BLOCK
    ${context}
    END OF CONTEXT BLOCK
    AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    `,
  };

  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      prompt,
      ...messages
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.json(response.choices[0].message.content);
}

export default handler;