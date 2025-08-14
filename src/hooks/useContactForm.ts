import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UseContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitStatus?: 'idle' | 'success' | 'error';
  errorMessage?: string;
}

export const useContactForm = ({ 
  onSubmit, 
  onCancel, 
  isLoading = false,
  submitStatus = 'idle',
  errorMessage = ''
}: UseContactFormProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    // Validar mensaje mínimo 10 caracteres
    if (formData.message.trim().length < 10) {
      newErrors.message = t('contactForm.messageMinLength');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.message, t]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  }, [validateForm, onSubmit, formData]);

  const inputClasses = `w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  const getMessageInputClasses = useCallback(() => {
    return `${inputClasses} sm:rows-4 ${
      errors.message ? 'border-red-500 focus:ring-red-500' : ''
    }`;
  }, [inputClasses, errors.message]);

  const getSuccessMessageClasses = useCallback(() => {
    return `mt-4 p-3 sm:p-4 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-green-900/20 border-green-500 text-green-400' 
        : 'bg-green-100 border-green-400 text-green-700'
    }`;
  }, [theme]);

  const getErrorMessageClasses = useCallback(() => {
    return `mt-4 p-3 sm:p-4 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-red-900/20 border-red-500 text-red-400' 
        : 'bg-red-100 border-red-400 text-red-700'
    }`;
  }, [theme]);

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    inputClasses,
    labelClasses,
    getMessageInputClasses,
    getSuccessMessageClasses,
    getErrorMessageClasses,
    isLoading,
    submitStatus,
    errorMessage,
    onCancel
  };
};
