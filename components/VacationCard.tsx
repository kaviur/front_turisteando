'use client';

import Image from 'next/image';
import Link from 'next/link';
import LikeButton from './ui/LikeButton';
import { TouristPlan } from "@/types/touristPlan";
import { useState } from "react";

interface CardProps {
  plan: TouristPlan;
}


export default function VacationCard({ plan }: CardProps) {
  const {
    id,
    title,
    city,
    price,
    rating,
    capacity,
    duration,
    images,
    characteristic,
    isFavorite = false,
  } = plan;

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="card w-full h-128 bg-base-100 shadow-md border border-base-200">
      {/* Carousel */}
      <div className="carousel w-full h-64 rounded-t-2xl">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`carousel-item relative w-full ${index === activeIndex ? 'active' : ''}`}
          >
            <Image 
              src={image.imageUrl} 
              className="w-full object-cover" 
              alt={`Image of ${title} (${index + 1})`} 
              width={400}
              height={400}
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button className="btn btn-circle btn-sm" onClick={handlePrev}>
              ❮
            </button>
            <button className="btn btn-circle btn-sm" onClick={handleNext}>
              ❯
            </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card-body p-4">
        {/* Header with rating */}
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/product/${id}`} className="hover:underline">
              <h2 className="card-title text-lg xs:text-sm sm:text-md md:text-sm lg:text-lg h-14 sm:h-20 md:h-18 lg:h-14 xl:h-14">{title}</h2>
            </Link>
            <p className="text-sm text-base-content/70">
              {city.name}, {city.country.name}
            </p>
          </div>
          <div className="rating rating-sm">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name={`rating-${id}`}
                  className="mask mask-star-2 bg-orange-400"
                  checked={i < rating}
                  readOnly
                />
              ))}
          </div>
        </div>

        {/* Duration and Capacity */}
        <div className="flex items-center gap-2 mt-2">
          <span className="badge badge-outline">{duration}</span>
          <div className="flex items-center gap-1">
            <span className="text-sm">
              {capacity === 1 ? `${capacity} persona` : `${capacity} personas`}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {characteristic.map((feature) => (
            <div
              key={feature.id}
              className="tooltip"
              data-tip={feature.name}
            >
              <Image
                src={feature.image.imageUrl}
                alt={feature.name}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>

        {/* Price and Favorite */}
        <div className="mt-4 flex justify-between items-center">
        <p className="text-xl font-bold">
          {price.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}
          <span className="text-sm font-normal text-base-content/70">
            {' '} / {duration}
          </span>
        </p>
          <LikeButton planId={id} isFavorite={isFavorite} />
        </div>
      </div>
    </div>
  );
}