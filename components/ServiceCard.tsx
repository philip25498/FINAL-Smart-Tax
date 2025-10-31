
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
    service: Service;
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 min-h-[200px] justify-center cursor-pointer hover:shadow-xl hover:-translate-y-1 dark:hover:shadow-lg dark:hover:shadow-green-500/10"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') ) {
                    onClick();
                }
            }}
        >
           <>
                <div className="mb-4">
                    {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
            </>
        </div>
    );
};

export default ServiceCard;
