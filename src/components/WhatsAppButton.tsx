'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function WhatsAppButton() {
  return (
    <Button
      onClick={() => window.open('https://wa.me/254700000000?text=Hello! I want to inquire about properties in Eldoret', '_blank')}
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-2xl bg-green-600 hover:bg-green-700 hover:shadow-green-600/50 transition-shadow"
    >
      <MessageCircle className="w-7 h-7" />
    </Button>
  );
}
