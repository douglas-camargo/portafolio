import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { sendContactMessage, ContactFormData } from '../services/contactApi';

export const useContactModal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Estados para el modal de alerta
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState<string>('');

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

  const showAlert = useCallback((type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setIsAlertOpen(true);
  }, []);

  const closeAlert = useCallback(() => {
    setIsAlertOpen(false);
  }, []);

  const handleSubmitContact = useCallback(async (formData: ContactFormData) => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const result = await sendContactMessage(formData);
      
      if (result.success) {
        // Éxito: cerrar modal y mostrar alerta de éxito
        closeModal();
        showAlert('success', t('contactForm.successMessage'));
      } else {
        // Error: mantener modal abierto y mostrar alerta de error
        setSubmitStatus('error');
        setErrorMessage(t('contactForm.errorMessage'));
        showAlert('error', t('contactForm.errorMessage'));
      }
    } catch (error) {
      // Error: mantener modal abierto y mostrar alerta de error con mensaje fijo
      setSubmitStatus('error');
      setErrorMessage(t('contactForm.errorMessage'));
      showAlert('error', t('contactForm.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  }, [t, closeModal, showAlert]);

  return {
    isModalOpen,
    isLoading,
    submitStatus,
    errorMessage,
    openModal,
    closeModal,
    handleSubmitContact,
    // Estados del modal de alerta
    isAlertOpen,
    alertType,
    alertMessage,
    closeAlert
  };
};
