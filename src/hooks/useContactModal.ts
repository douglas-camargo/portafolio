import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { sendContactMessage, ContactFormData } from '../services/contactApi';

export const useContactModal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setSubmitStatus('idle');
    setErrorMessage('');
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSubmitStatus('idle');
    setErrorMessage('');
  }, []);

  const handleSubmitContact = useCallback(async (formData: ContactFormData) => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const result = await sendContactMessage(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || t('contactForm.errorMessage'));
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : t('contactForm.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  }, [t, closeModal]);

  return {
    isModalOpen,
    isLoading,
    submitStatus,
    errorMessage,
    openModal,
    closeModal,
    handleSubmitContact
  };
};
