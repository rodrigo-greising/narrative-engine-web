import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();


  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        "role": "system",
        "content": "You are a game rules assistant for tabletop rpgs, played online through discord, your job is to reference rules from an uploaded compendium to help players understand the game. "
      },
      ...messages
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}