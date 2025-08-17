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

  const inputClasses = useCallback(() => {
    const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-ring';
    
    if (theme === 'dark') {
      return `${baseClasses} bg-white/10 border-gray-600 text-white placeholder-gray-400`;
    } else {
      return `${baseClasses} bg-input border-input text-foreground placeholder-muted-foreground`;
    }
  }, [theme]);

  const labelClasses = useCallback(() => {
    const baseClasses = 'block text-sm font-medium mb-2';
    
    if (theme === 'dark') {
      return `${baseClasses} text-white`;
    } else {
      return `${baseClasses} text-foreground`;
    }
  }, [theme]);

  const getMessageInputClasses = useCallback(() => {
    const baseInputClasses = inputClasses();
    return `${baseInputClasses} sm:rows-4 resize-none ${
      errors.message ? 'border-destructive focus:ring-destructive' : ''
    }`;
  }, [inputClasses, errors.message]);



  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    inputClasses,
    labelClasses,
    getMessageInputClasses,
    isLoading,
    submitStatus,
    errorMessage,
    onCancel
  };
};
