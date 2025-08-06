import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { Separator } from '../../atoms/Separator/Separator';

export const Education = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const educationData = [
    {
      title: t('educationSection.university'),
      details: 'Universidad Marítima del Caribe',
    },
    {
      title: t('educationSection.completedCourses'),
      details: [
        {
          name: 'HTML',
          url: 'https://drive.google.com/uc?export=download&id=1G09EVEgH5BuWSwhB_jXobm9mWWrVYlwt'
        },
        {
          name: 'CSS',
          url: 'https://drive.google.com/uc?export=download&id=1axLMsaHMJcLTirp28rt_eXtqwaKtEz4h'
        },
        {
          name: 'JavaScript',
          url: 'https://drive.google.com/uc?export=download&id=1bhfojPhLedd2nsir8hFpQbHpPg0xHvUu'
        },
        {
          name: 'React.js',
          url: 'https://drive.google.com/uc?export=download&id=1OKRXfgaB1FHof9wvzKnMwZRuCiOdZwcJ'
        },
        {
          name: 'Git',
          url: 'https://drive.google.com/uc?export=download&id=1s2jUfC3QAXWHAgkPiw_aSnqde4g1dAza'
        },
      ],
    },
    {
      title: t('educationSection.selfEducation'),
      details: [
        'Next.js',
        'Tailwind CSS',
        'Bootstrap',
        'TypeScript',
      ],
    },
    {
      title: t('educationSection.languages'),
      details: t('educationSection.languagesDetails'),
    },
  ];

  return (
    <section id="education" className="w-full py-8 lg:py-12 px-4 md:px-20">
      <h2 className={`font-light text-2xl md:text-4xl mb-4 md:mb-6 font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t('educationSection.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="md:col-span-1"></div>
        <div className="md:col-span-1">
          <p className={`font-medium text-lg md:text-2xl font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
            {t('educationSection.description')}
          </p>
        </div>
      </div>

      <div className="mt-16">
        {educationData.map((item, index) => (
          <div key={index} className="w-full mb-8 md:mb-4">
            <Separator className={`w-full h-px my-4 ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <p className={`font-semibold text-xs font-['Lato',Helvetica] mb-4 md:mb-0 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  {item.title}
                </p>
              </div>

              <div className="md:col-span-1">
                {Array.isArray(item.details) ? (
                  <div className="space-y-4">
                    {item.details.map((detail, detailIndex) => (
                      <React.Fragment key={detailIndex}>
                        {typeof detail === 'string' ? (
                          <p className={`font-normal text-xs font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                            {detail}
                          </p>
                        ) : (
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = detail.url;
                              link.download = `${detail.name}_certificate.pdf`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className={`font-normal text-xs font-['Lato',Helvetica] cursor-pointer hover:underline ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}
                          >
                            {detail.name}
                          </button>
                        )}
                        {detailIndex < item.details.length - 1 && (
                          <Separator className={`w-full h-px ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p className={`font-normal text-xs font-['Lato',Helvetica] ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    {item.details}
                  </p>
                )}
              </div>
            </div>

            {index === educationData.length - 1 && (
              <Separator className={`w-full h-px mt-4 ${theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};