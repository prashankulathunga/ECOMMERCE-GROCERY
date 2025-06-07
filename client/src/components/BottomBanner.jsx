import React from "react";
import { assets, features } from "../assets/assets";

function BottomBanner() {
  return (
    <div className="mt-24 relative">
      <img
        src={assets.bottom_banner_image}
        alt="bottom-image"
        className="w-full relative md:block hidden"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="bottom-image-sm"
        className="w-full relative md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center  md:justify-center md:items-end pt-16 sm:pt-56 md:pt-0 md:pr-12 lg:pr-24">
        <div>
          <h1 className="font-semibold text-2xl md:text-3xl text-primary mb-6">
            Why We Are the Best?
          </h1>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              <img src={feature.icon} alt="feature-icon" />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
