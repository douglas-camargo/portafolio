import { useCallback } from 'react';
import { whatsappService } from '../services/whatsappService';

export const useWhatsAppButton = () => {
  const handleWhatsAppClick = useCallback(() => {
    whatsappService.openWhatsApp();
  }, []);

  return {
    handleWhatsAppClick
  };
};
