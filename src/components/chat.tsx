'use client';

import { UseChatOptions, useChat } from 'ai/react';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { MessageCircle } from 'lucide-react';



export default function Chat() {
  const chatOptions : UseChatOptions = {
    id: '1',
  }

  const { messages, input, handleInputChange, handleSubmit } = useChat(chatOptions);


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 bg-blue-violet-500 text-white rounded-full p-2 "
          style={{ width: '50px', height: '50px' }}
        >
          <MessageCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative w-80 right-4">
        <div className="flex flex-col h-96 py-4 overflow-auto">
          <div className="space-y-2 px-3">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap break-words">
                <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
                {m.content}
              </div>
            ))}
          </div>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="bottom-0 w-full p-2">
          <input
            className="px-4 py-2 w-full botom-0 border border-blue-violet-300 rounded shadow-sm focus:outline-none focus:ring-blue-violet-500 focus:ring-2"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </PopoverContent>
    </Popover>
  );
}
