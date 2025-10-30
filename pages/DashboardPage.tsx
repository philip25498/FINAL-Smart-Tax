
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../constants';
import Chatbot from '../components/Chatbot';
import { Service } from '../types';
import ServiceModal from '../components/ServiceModal';
import * as apiService from '../services/apiService';


interface MockServiceStatus {
    isLoading: boolean;
    resultMessage: string | null;
    isError: boolean;
}

const initialMockServiceStatus: MockServiceStatus = {
    isLoading: false,
    resultMessage: null,
    isError: false,
};

const API_IMPLEMENTED_SERVICES = [
    'File a Null Return',
    'Check Tax Obligations',
    'Verify Tax PIN',
    'Tax Compliance Certificate',
    'Check IT Exemption',
];


const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [mockServiceStatuses, setMockServiceStatuses] = useState<Record<string, MockServiceStatus>>({});
    const [activeService, setActiveService] = useState<Service | null>(null);

    const handleServiceClick = (service: Service) => {
        if (API_IMPLEMENTED_SERVICES.includes(service.title)) {
            setActiveService(service);
        } else {
            // Handle mock services
            handleMockServiceClick(service.title);
        }
    };

    const handleMockServiceClick = (serviceTitle: string) => {
        setMockServiceStatuses(prev => ({
            ...prev,
            [serviceTitle]: { ...initialMockServiceStatus, isLoading: true }
        }));

        // Simulate API call with a random outcome
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // 70% chance of success
            setMockServiceStatuses(prev => ({
                ...prev,
                [serviceTitle]: {
                    isLoading: false,
                    resultMessage: isSuccess ? 'Service completed successfully!' : 'An error occurred. Please try again.',
                    isError: !isSuccess,
                }
            }));
        }, 2000); // 2-second delay to simulate network latency
    };
    
    const handleResetMockService = (serviceTitle: string) => {
        setMockServiceStatuses(prev => ({
            ...prev,
            [serviceTitle]: initialMockServiceStatus
        }));
    };


    return (
        <div className="py-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.full_name || user?.email}!</h1>
                <p className="mt-2 text-gray-600">Here are the services available to you. Select a service to get started.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {SERVICES.map((service, index) => {
                    if (API_IMPLEMENTED_SERVICES.includes(service.title)) {
                        return (
                             <ServiceCard 
                                key={index} 
                                service={service}
                                onClick={() => handleServiceClick(service)}
                            />
                        )
                    }
                    // This block is for mock services
                    const status = mockServiceStatuses[service.title] || initialMockServiceStatus;
                    return (
                       <div key={index} className="opacity-50 cursor-not-allowed" title="This service is not yet connected to the backend.">
                         <ServiceCard 
                            service={service}
                            onClick={() => {}}
                         />
                       </div>
                    );
                })}
            </div>
            <Chatbot />

            {activeService && (
                <ServiceModal
                    service={activeService}
                    isOpen={!!activeService}
                    onClose={() => setActiveService(null)}
                    apiService={apiService}
                />
            )}
        </div>
    );
};

export default DashboardPage;