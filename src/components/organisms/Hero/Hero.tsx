import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../atoms/Button/Button';
import { Card } from '../../atoms/Card/Card';
import { CardContent } from '../../atoms/CardContent/CardContent';
import { Modal } from '../../atoms/Modal/Modal';
import { ContactForm } from '../../molecules/ContactForm/ContactForm';
import { useHero } from '../../../hooks/useHero';
import { useContactModal } from '../../../hooks/useContactModal';
import { AnimationProps } from '../../../hooks/useAnimations';

export const Hero: React.FC<AnimationProps> = ({ isLoaded = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { handleDownloadCV } = useHero();
  const { 
    isModalOpen, 
    isLoading, 
    submitStatus,
    errorMessage,
    openModal, 
    closeModal, 
    handleSubmitContact 
  } = useContactModal();

  return (
    <section id="about" className="flex flex-col items-start px-4 md:px-20 py-8 lg:py-16 w-full relative mt-20">
      <div className="w-full flex flex-col lg:flex-row items-start gap-8 mb-5 lg:mb-0">
        {/* Left side - Text content */}
        <div className={`flex-1 max-w-full lg:max-w-[670px] text-center lg:text-left ${isLoaded ? 'animate-slide-in-left' : 'slide-in-left-initial'}`}>
          <div className={`font-['Lato',Helvetica] font-light text-lg sm:text-lg md:text-3xl lg:text-4xl tracking-[0] leading-normal mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t('hero.title')}
          </div>

          <h1 className={`font-['Oswald',Helvetica] font-medium text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl xl:-ml-[5px] tracking-[0] leading-tight md:leading-[120px] mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {t('hero.name').split(' ')[0]}
            <br />
            {t('hero.name').split(' ')[1]}
          </h1>

          <Card className="bg-transparent border-0 mb-8">
            <CardContent className="p-0 md:py-3.5 md:px-0.5">
              <p className={`font-['Lato',Helvetica] font-semibold text-sm leading-normal justify-paragraph ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                {t('hero.description')}
              </p>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${isLoaded ? 'animate-slide-in-up' : 'slide-in-up-initial'}`}>
            <Button className="w-full sm:w-52" onClick={openModal}>
              {t('hero.contactMe')}
            </Button>

            <Button variant="outline" className="w-full sm:w-52" onClick={handleDownloadCV}>
              {t('hero.downloadCV')}
            </Button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className={`flex-shrink-0 w-full lg:w-[514px] h-[300px] sm:h-[400px] md:h-[500px] relative order-first lg:order-last ${isLoaded ? 'animate-slide-in-right' : 'slide-in-right-initial'}`}>
          <div className="relative h-full rounded-[20px] overflow-hidden">
            <img
              className="absolute w-full h-full object-cover object-[center_28%] rounded-[20px]"
              alt="Douglas Camargo"
              src="/images/photo-Douglas.webp"
            />
            <div className="w-full rounded-[20px] bg-gradient-to-r from-[#151515] via-[#313131]/50 to-transparent absolute h-full top-0 left-0" />
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={t('contactForm.title')}
      >
        <ContactForm
          onSubmit={handleSubmitContact}
          onCancel={closeModal}
          isLoading={isLoading}
          submitStatus={submitStatus}
          errorMessage={errorMessage}
        />
      </Modal>
    </section>
  );
};
