import React,  { useState, useEffect } from 'react';

const bannerImages = [
  "https://www.nsbgwalior.com/Eng/Encyc/2020/7/14/2_04_36_11_Flipkart-RuPay-Offer-Banner_1_H@@IGHT_335_W@@IDTH_1014.jpg",
  "https://digiosmosis.com/wp-content/uploads/2020/07/banner-1-1.jpg",
  "https://akm-img-a-in.tosshub.com/aajtak/images/photo_gallery/202101/flipkart_sale_banner.jpg"
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
    }, 3000); // Change slide every 4 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative w-full overflow-hidden container mx-auto my-4">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={src} alt={`Banner ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;