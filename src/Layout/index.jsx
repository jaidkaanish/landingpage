import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Canvas from './canvas';
import Content from './content';
import { data } from '../data';

import { LoadingAnimation } from '../components';

function Banner() {
  const banner = useRef();
  const [condition, setCondition] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [activeData, setActiveData] = useState(data[0]);

  const handleSwatchClick = (item) => {
    if (activeData.id !== item.id) setActiveData(item);
  };

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: 'power3.inOut',
      duration: 0.8,
    });

    gsap.to('.logo', {
      color: activeData.headingColor,
      ease: 'power3.inOut',
      duration: 0.8,
    });

    return () => {};
  }, [activeData]);

  return (
    <div ref={banner} className="w-screen h-screen relative">
      {isLoading ? <LoadingAnimation /> : null}

      <div className="logo absolute my-2 ml-6 text-left text-2xl font-bold tracking-widest md:ml-28 lg:ml-[12vw] lg:my-8">
        AJDEV
      </div>
      <div className="rotation">
        <p>Please Rotate your device to see the Product</p>
      </div>
      <div className="w-full h-full flex justify-between items-center flex-col lg:flex-row-reverse">
        <Canvas
          activeData={activeData}
          swatchData={data}
          handleSwatchClick={handleSwatchClick}
          handleLoading={handleLoading}
          condition={condition}
        />
        <Content
          activeData={activeData}
          condition={condition}
          setCondition={setCondition}
        />
      </div>
    </div>
  );
}

export default Banner;
