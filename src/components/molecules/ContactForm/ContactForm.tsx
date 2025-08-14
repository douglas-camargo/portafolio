import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../atoms/Button/Button';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitStatus?: 'idle' | 'success' | 'error';
  errorMessage?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isLoading = false,
  submitStatus = 'idle',
  errorMessage = ''
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t('contactForm.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder={t('contactForm.namePlaceholder')}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            {t('contactForm.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder={t('contactForm.emailPlaceholder')}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClasses}>
          {t('contactForm.subject')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={inputClasses}
          placeholder={t('contactForm.subjectPlaceholder')}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t('contactForm.message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          className={`${inputClasses} sm:rows-4`}
          placeholder={t('contactForm.messagePlaceholder')}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
        <Button
          type="submit"
          className="flex-1"
          disabled={isLoading || submitStatus === 'success'}
        >
          {isLoading ? t('contactForm.sending') : t('contactForm.send')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          {t('contactForm.cancel')}
        </Button>
      </div>

      {/* Mensajes de estado */}
      {submitStatus === 'success' && (
        <div className={`mt-4 p-3 sm:p-4 rounded-lg border ${
          theme === 'dark' 
            ? 'bg-green-900/20 border-green-500 text-green-400' 
            : 'bg-green-100 border-green-400 text-green-700'
        }`}>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm sm:text-base">{t('contactForm.successMessage')}</span>
          </div>
        </div>
      )}

      {submitStatus === 'error' && errorMessage && (
        <div className={`mt-4 p-3 sm:p-4 rounded-lg border ${
          theme === 'dark' 
            ? 'bg-red-900/20 border-red-500 text-red-400' 
            : 'bg-red-100 border-red-400 text-red-700'
        }`}>
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm sm:text-base">{errorMessage}</span>
          </div>
        </div>
      )}
    </form>
  );
};
