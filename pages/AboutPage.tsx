
import React, { useState, useEffect } from 'react';
import { FEATURES } from '../constants';
import { Feature } from '../types';

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % feature.images.length);
        }, 1000); // Change image every 1 second

        return () => clearInterval(interval);
    }, [feature.images.length]);
    
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-green-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto relative">
                {feature.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${feature.title} image ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
        </div>
    );
};


const AboutPage: React.FC = () => {
    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">About SmartTax</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    SmartTax is a revolutionary platform designed to make your interactions with the Kenya Revenue Authority (KRA) seamless, secure, and intelligent. Our mission is to empower taxpayers with the tools and information they need to manage their obligations confidently.
                </p>
            </div>

            <div className="space-y-12">
                <h2 className="text-3xl font-bold text-center text-gray-800">Key Features</h2>
                <div className="space-y-8 max-w-4xl mx-auto">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
