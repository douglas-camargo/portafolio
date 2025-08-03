// Lista de países hispanohablantes
const SPANISH_SPEAKING_COUNTRIES = [
  'ES', // España
  'MX', // México
  'AR', // Argentina
  'CO', // Colombia
  'PE', // Perú
  'VE', // Venezuela
  'CL', // Chile
  'EC', // Ecuador
  'GT', // Guatemala
  'CU', // Cuba
  'BO', // Bolivia
  'DO', // República Dominicana
  'HN', // Honduras
  'PY', // Paraguay
  'SV', // El Salvador
  'NI', // Nicaragua
  'CR', // Costa Rica
  'PA', // Panamá
  'UY', // Uruguay
  'GQ', // Guinea Ecuatorial
  // Removido 'US' y 'CA' para que usen inglés por defecto
];

export interface CountryInfo {
  country: string;
  language: 'es' | 'en';
}

/**
 * Detecta el país del usuario y determina el idioma por defecto
 * @returns Promise<CountryInfo> - Información del país e idioma recomendado
 */
export const detectUserCountry = async (): Promise<CountryInfo> => {
  try {
    // Usar una API que funcione tanto en desarrollo como en producción
    const response = await fetch('https://api.ipify.org?format=json');
    
    if (!response.ok) {
      throw new Error('No se pudo obtener la IP');
    }

    const ipData = await response.json();
    const ip = ipData.ip;

    // Usar una segunda API para obtener información del país
    const countryResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    
    if (!countryResponse.ok) {
      throw new Error('No se pudo obtener información del país');
    }

    const data = await countryResponse.json();
    const countryCode = data.country_code || 'US';
    
    // Determina el idioma basado en el país
    const isSpanishCountry = SPANISH_SPEAKING_COUNTRIES.includes(countryCode);
    const language = isSpanishCountry ? 'es' : 'en';
    
    return {
      country: countryCode,
      language
    };
  } catch (error) {
    // Fallback: usar inglés por defecto si hay error
    return {
      country: 'US',
      language: 'en'
    };
  }
};

/**
 * Obtiene el idioma del navegador como fallback
 * @returns 'es' | 'en'
 */
export const getBrowserLanguage = (): 'es' | 'en' => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  return langCode === 'es' ? 'es' : 'en';
};

/**
 * Función principal para determinar el idioma por defecto
 * @returns Promise<'es' | 'en'>
 */
export const getDefaultLanguage = async (): Promise<'es' | 'en'> => {
  // Detectar si es un bot de Google para SEO
  const isGoogleBot = navigator.userAgent.includes('Googlebot') || 
                     navigator.userAgent.includes('bot') ||
                     navigator.userAgent.includes('crawler');
  
  if (isGoogleBot) {
    return 'en';
  }
  
  try {
    const countryInfo = await detectUserCountry();
    return countryInfo.language;
  } catch (error) {
    const browserLang = getBrowserLanguage();
    return browserLang;
  }
}; 