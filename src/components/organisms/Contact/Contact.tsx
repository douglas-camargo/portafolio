import React from 'react';
import { Button } from '../../atoms/Button/Button';

export const Contact = () => {
  const contactInfo = {
    email: 'ALEXANDERS@GMAIL.COM',
    phone: '+58 424 1232755',
  };

  const socialLinks = [
    { name: 'GITHUB', variant: 'secondary' as const },
    { name: 'LINKEDIN', variant: 'outline' as const },
    { name: 'GMAIL', variant: 'outline' as const },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-20">
      <div className="flex flex-col items-center">
        <div className="font-['Lato',Helvetica] font-normal text-xs text-[#676767] mb-5">
          GET IN TOUCH
        </div>

        <h2 className="font-['Oswald',Helvetica] font-medium text-2xl md:text-4xl lg:text-[64px] text-[#555555] leading-tight md:leading-[120px] mb-8 md:mb-16 text-center">
          {contactInfo.email}
        </h2>

        <div className="flex flex-col md:flex-row justify-between w-full gap-8">
          <div className="flex flex-col">
            <div className="font-['Lato',Helvetica] font-semibold text-sm text-[#555555] mb-2">
              PHONE
            </div>
            <div className="font-['Lato',Helvetica] font-normal text-xs text-white">
              {contactInfo.phone}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant={link.variant}
                size="sm"
                className="rounded-[23px] w-full md:w-[106px]"
              >
                {link.name}
              </Button>
            ))}
          </div>

          <div className="flex items-center cursor-pointer justify-center md:justify-start">
            <span className="font-['Lato',Helvetica] font-semibold text-sm text-[#555555] mr-1">
              back to top
            </span>
            <svg className="w-[9px] h-[11px] text-[#555555]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-8 8h6v8h4v-8h6z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};