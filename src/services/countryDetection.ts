// Lista de países hispanohablantes
const SPANISH_SPEAKING_COUNTRIES = new Set([
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
]);

export interface CountryInfo {
  country: string;
  language: 'es' | 'en';
}

// Cache para evitar múltiples llamadas a la API
let cachedCountryInfo: CountryInfo | null = null;

/**
 * Detecta el país del usuario y determina el idioma por defecto
 * @returns Promise<CountryInfo> - Información del país e idioma recomendado
 */
export const detectUserCountry = async (): Promise<CountryInfo> => {
  // Retornar cache si existe
  if (cachedCountryInfo) {
    return cachedCountryInfo;
  }

  try {
    // Usar una API que funcione tanto en desarrollo como en producción
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(5000), // Timeout de 5 segundos
    });
    
    if (!response.ok) {
      throw new Error('No se pudo obtener la IP');
    }

    const ipData = await response.json();
    const ip = ipData.ip;

    // Usar una segunda API para obtener información del país
    const countryResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(5000), // Timeout de 5 segundos
    });
    
    if (!countryResponse.ok) {
      throw new Error('No se pudo obtener información del país');
    }

    const data = await countryResponse.json();
    const countryCode = data.country_code || 'US';
    
    // Determina el idioma basado en el país
    const language = SPANISH_SPEAKING_COUNTRIES.has(countryCode) ? 'es' : 'en';
    
    const result: CountryInfo = {
      country: countryCode,
      language: language as 'es' | 'en'
    };

    // Guardar en cache
    cachedCountryInfo = result;
    
    return result;
  } catch (error) {
    // Fallback: usar inglés por defecto si hay error
    const fallback = {
      country: 'US',
      language: 'en' as const
    };
    
    // Guardar fallback en cache para evitar reintentos
    cachedCountryInfo = fallback;
    
    return fallback;
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
 * Detecta si es un bot de Google para SEO
 * @returns boolean
 */
const isGoogleBot = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('googlebot') || 
         userAgent.includes('bot') ||
         userAgent.includes('crawler') ||
         userAgent.includes('spider');
};

/**
 * Función principal para determinar el idioma por defecto
 * @returns Promise<'es' | 'en'>
 */
export const getDefaultLanguage = async (): Promise<'es' | 'en'> => {
  // Detectar si es un bot de Google para SEO
  if (isGoogleBot()) {
    return 'en';
  }
  
  try {
    const countryInfo = await detectUserCountry();
    return countryInfo.language;
  } catch (error) {
    return getBrowserLanguage();
  }
}; 