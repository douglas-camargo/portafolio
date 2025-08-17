import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../atoms/Button/Button';
import { useContactForm } from '../../../hooks/useContactForm';

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
  
  const {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    inputClasses,
    labelClasses,
    getMessageInputClasses
  } = useContactForm({
    onSubmit,
    onCancel,
    isLoading,
    submitStatus,
    errorMessage
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="name" className={labelClasses()}>
            {t('contactForm.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputClasses()}
            placeholder={t('contactForm.namePlaceholder')}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses()}>
            {t('contactForm.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClasses()}
            placeholder={t('contactForm.emailPlaceholder')}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClasses()}>
          {t('contactForm.subject')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={inputClasses()}
          placeholder={t('contactForm.subjectPlaceholder')}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses()}>
          {t('contactForm.message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          className={getMessageInputClasses()}
          placeholder={t('contactForm.messagePlaceholder')}
          required
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">
            {errors.message}
          </p>
        )}
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


    </form>
  );
};
