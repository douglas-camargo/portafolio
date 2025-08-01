import React from 'react';
import { Separator } from '../../atoms/Separator/Separator';

export const Education = () => {
  const educationData = [
    {
      title: 'University (2016-2023)',
      details: 'University (2017-2023)',
    },
    {
      title: 'Competed courses (2021-2023)',
      details: [
        'University (2017-2023)',
        'University (2017-2023)',
        'University (2017-2023)',
        'University (2017-2023)',
      ],
    },
    {
      title: 'Self education (2022-2023)',
      details: 'University (2017-2023)',
    },
    {
      title: 'LENGUAGES',
      details: 'Spanih-native / English-B2',
    },
  ];

  return (
    <section className="w-full py-12 px-4 md:px-20">
      <h2 className="font-extralight text-white text-2xl md:text-4xl mb-8 md:mb-14 font-['Lato',Helvetica]">EDUCATION</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="md:col-span-1">
          <p className="font-medium text-white text-lg md:text-2xl font-['Lato',Helvetica]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
            tincidunt eget nullam non. Quis hendrerit dolor magna eget est
            lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet
            massa. Commodo odio aenean sed adipiscing diam donec adipiscing
            tristique. Mi eget mauris pharetra et.
          </p>
        </div>
        <div className="md:col-span-1"></div>
      </div>

      <div className="mt-16">
        {educationData.map((item, index) => (
          <div key={index} className="w-full">
            <Separator className="w-full h-px bg-white/20 my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="md:col-span-1">
                <p className="font-normal text-white text-xs font-['Lato',Helvetica]">
                  {item.title}
                </p>
              </div>

              <div className="md:col-span-1">
                {Array.isArray(item.details) ? (
                  <div className="space-y-4">
                    {item.details.map((detail, detailIndex) => (
                      <React.Fragment key={detailIndex}>
                        <p className="font-normal text-white text-xs font-['Lato',Helvetica]">
                          {detail}
                        </p>
                        {detailIndex < item.details.length - 1 && (
                          <Separator className="w-full h-px bg-white/20" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p className="font-normal text-white text-xs font-['Lato',Helvetica]">
                    {item.details}
                  </p>
                )}
              </div>
            </div>

            {index === educationData.length - 1 && (
              <Separator className="w-full h-px bg-white/20 mt-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};