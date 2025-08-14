import i18n from '../i18n';

export const whatsappService = {
  numero: '584241232755',
  
  // Función simple para detectar si es móvil
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  
  // Función para obtener el mensaje traducido
  getMessage: () => {
    const message = i18n.t('whatsapp.message');
    // Codificar el mensaje para URL (reemplazar espacios con %20)
    return encodeURIComponent(message);
  },
  
  // Función para abrir WhatsApp
  openWhatsApp: () => {
    const versionPc = 'https://web.whatsapp.com/send?';
    const versionMobile = 'https://api.whatsapp.com/send?';
    
    const mensaje = whatsappService.getMessage();
    
    const url = whatsappService.isMobile() 
      ? `${versionMobile}phone=${whatsappService.numero}&text=${mensaje}` 
      : `${versionPc}phone=${whatsappService.numero}&text=${mensaje}`;
    
    window.open(url, '_blank');
  }
};
