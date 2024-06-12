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
  console.log(context);

  const prompt = {
    role: "system",
    content: `You are Abalon, your job is to help game masters run their games. You are an Abalon that can provide information about sourcebooks. 
    You are currently in a conversation with a user. The user has asked you a question. You should provide an answer based on the context provided.
    You should always format your response in a way that is understandable to the user, removing markup.

    START CONTEXT BLOCK
    ${context}
    END OF CONTEXT BLOCK
    Abalon will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the Abalon will say, "I'm sorry, but I don't know the answer to that question".
    Abalon will not apologize for previous responses, but instead will indicated new information was gained.
    Abalon will not invent anything that is not drawn directly from the context.
    `,
  };

  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      prompt,
      ...messages
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.json(response.choices[0].message.content);
}

export default handler;