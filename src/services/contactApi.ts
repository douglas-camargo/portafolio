import CryptoJS from 'crypto-js';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000';

// Función para cifrar texto usando AES
function encrypt(plainText: string): string {
  const encrypted = CryptoJS.AES.encrypt(plainText, (import.meta as any).env?.VITE_ENCRYPTION_KEY);
  return encrypted.toString();
}

// Función para cifrar credenciales
function encryptCredentials(clientId: string, clientSecret: string) {
  return {
    encryptedClientId: encrypt(clientId),
    encryptedClientSecret: encrypt(clientSecret)
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  messageId?: string;
  data?: any;
}

// Obtener token de autenticación con credenciales cifradas
const getAuthToken = async (): Promise<string> => {
  try {
    const encryptedCredentials = encryptCredentials((import.meta as any).env?.VITE_CLIENT_ID, (import.meta as any).env?.VITE_CLIENT_SECRET);
    
    const response = await fetch(`${API_BASE_URL}/api/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        encryptedClientId: encryptedCredentials.encryptedClientId,
        encryptedClientSecret: encryptedCredentials.encryptedClientSecret
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Error HTTP ${response.status}: ${errorData.message || response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Error al obtener token');
    }

    return data.data.token;
  } catch (error) {
    throw error;
  }
};

// Enviar mensaje de contacto
export const sendContactMessage = async (formData: ContactFormData): Promise<ApiResponse> => {
  try {
    const token = await getAuthToken();
    const encryptedToken = encrypt(token);
    
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${encryptedToken}`
      },
      body: JSON.stringify(formData)
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al enviar mensaje');
    }

    return result;
  } catch (error) {
    throw error;
  }
};
