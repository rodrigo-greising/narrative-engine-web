'use client';

import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Chat</Button>
      </PopoverTrigger>
      <PopoverContent className="relative w-80">
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
        <form onSubmit={handleSubmit} className="absolute bottom-0 w-full p-2">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </PopoverContent>
    </Popover>
  );
}
