import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Card, CardContent } from '../../atoms/Card/Card';

export const Hero = () => {
  return (
    <section className="flex flex-col items-start px-4 md:px-20 py-8 md:py-16 w-full relative">
      <div className="font-['Lato',Helvetica] font-extralight text-white text-lg md:text-4xl tracking-[0] leading-normal mb-4">
        WEB DEVELOPER-FRONTEND
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start gap-8 mb-14">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-full lg:max-w-[670px]">
          <h1 className="font-['Oswald',Helvetica] font-medium text-white text-4xl md:text-6xl lg:text-9xl tracking-[0] leading-tight md:leading-[120px] mb-6">
            ALEXANDER
            <br />
            SUAREZ
          </h1>

          <Card className="bg-transparent border-0 mb-8">
            <CardContent className="p-0 md:p-3.5">
              <p className="font-['Lato',Helvetica] font-semibold text-white text-sm leading-normal">
                I am a Junior Web Developer specializing in <br className="hidden md:block" />
                front end development. At this moment i am <br className="hidden md:block" />
                working in a small company and hold <br className="hidden md:block" />
                position. Also i have responsibilities as a <br className="hidden md:block" />
                junior developer
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Image */}
        <div className="flex-shrink-0 w-full lg:w-[514px] h-[300px] md:h-[386px] relative order-first lg:order-last">
          <div className="relative h-full rounded-[20px] overflow-hidden">
            <img
              className="absolute w-full h-full object-cover rounded-[20px]"
              alt="Profile photo"
              src="https://images.pexels.com/photos/1606609/pexels-photo-1606609.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <div className="w-full rounded-[20px] bg-gradient-to-r from-[#151515] via-[#313131]/50 to-transparent absolute h-full top-0 left-0" />
          </div>
        </div>
      </div>

      {/* Buttons - moved outside the flex container */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 md:px-0">
        <Button className="w-full sm:w-52">
          CONTACT ME
        </Button>

        <Button variant="outline" className="w-full sm:w-52">
          DOWNLOAD CV
        </Button>
      </div>
    </section>
  );
};