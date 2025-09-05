import React from 'react';

const categories = [
  "Electronics",
  "TVs & Appliances",
  "Men",
  "Women",
  "Baby & Kids",
  "Home & Furniture",
  "Sports, Books & More",
  "Flights",
  "Offer Zone"
];

const CategoryHeader = () => {
  return (
    <div className="bg-white shadow-sm hidden sm:block">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 text-sm font-medium text-gray-700">
          {categories.map((category) => (
            <a key={category} href="#" className="hover:text-[#2874f0] transition-colors">
              {category}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;