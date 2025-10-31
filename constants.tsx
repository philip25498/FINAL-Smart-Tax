

import React from 'react';
import { Feature, Service } from './types';

export const FEATURES: Feature[] = [
    {
        title: 'Advanced AI Chatbot',
        description: 'Get instant, accurate responses and guidance with our chatbot, powered by the Gemini 2.5 Pro model.',
        images: [
            'https://picsum.photos/seed/ai/600/400',
            'https://picsum.photos/seed/chatbot/600/400',
            'https://picsum.photos/seed/support/600/400',
        ]
    },
    {
        title: 'Easy & Fast Transactions',
        description: 'Our platform simplifies tax processes. Learn the simple steps to file your returns, check obligations, and use all services quickly.',
        images: [
            'https://picsum.photos/seed/fast/600/400',
            'https://picsum.photos/seed/transaction/600/400',
            'https://picsum.photos/seed/simple/600/400',
        ]
    },
    {
        title: 'Secure & Private',
        description: 'Your data is safe with us. The website uses end-to-end encryption to ensure your personal and financial information is protected.',
        images: [
            'https://picsum.photos/seed/secure/600/400',
            'https://picsum.photos/seed/private/600/400',
            'https://picsum.photos/seed/lock/600/400',
        ]
    }
];

export const SERVICES: Service[] = [
    {
        title: 'File a Null Return',
        description: 'Easily file your nil tax returns with just a few clicks.',
        icon: <PencilIcon />,
    },
    {
        title: 'Check Tax Obligations',
        description: 'View your current and pending tax obligations in one place.',
        icon: <ChecklistIcon />,
    },
    {
        title: 'Verify Tax PIN',
        description: 'Quickly look up and verify the details of a KRA PIN or ID.',
        icon: <SearchIcon />,
    },
    {
        title: 'Tax Input Validation',
        description: 'Validate your tax inputs before submission to avoid errors.',
        icon: <ShieldCheckIcon />,
    },
    {
        title: 'Tax Compliance Certificate',
        description: 'Apply for your TCC to prove your tax compliance status.',
        icon: <CertificateIcon />,
    },
    {
        title: 'Check IT Exemption',
        description: 'Check your income tax exemption certificate status.',
        icon: <DocumentTextIcon />,
    },
    {
        title: 'Register for a New Tax',
        description: 'Register for additional tax obligations like VAT or PAYE.',
        icon: <PlusCircleIcon />,
    },
    {
        title: 'Amend PIN Details',
        description: 'Update your personal or business details on your KRA PIN.',
        icon: <UserEditIcon />,
    }
];

export const CHATBOT_SAMPLE_QUESTIONS: string[] = [
    'How do I file a null return?',
    'What is a tax obligation?',
    'Check my PIN status',
    'What documents do I need for TCC?',
];

export const SERVICE_CHAT_SUGGESTIONS: Record<string, string[]> = {
  'File a Null Return': [
    'What is a null return?',
    'Who is required to file a null return?',
    'What is an "Obligation Code"?',
    'What happens if I don\'t file?',
  ],
  'Check Tax Obligations': [
    'What does "tax obligation" mean?',
    'How can I find my obligation details?',
    'What are common tax obligations?',
    'Is there a penalty for late filing?',
  ],
  'Verify Tax PIN': [
    'Why would I need to verify a PIN?',
    'What information is provided when I verify a PIN?',
    'Can I verify a PIN for a company?',
    'Is this service free?',
  ],
  'Tax Compliance Certificate': [
    'What is a TCC used for?',
    'How long is a TCC valid?',
    'What are the requirements to get a TCC?',
    'Can I apply for someone else?',
  ],
   'Check IT Exemption': [
    'Who is eligible for IT Exemption?',
    'What does this certificate do?',
    'How do I apply for one?',
    'How long does the exemption last?',
  ]
};


// Helper Icon components
function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function SearchIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}

function ShieldCheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606 12.02 12.02 0 00-2.618-12.944z" />
        </svg>
    );
}

function CertificateIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
    );
}

function DocumentTextIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

function PlusCircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function UserEditIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zM20.37 14.63a1 1 0 00-1.41-1.41L17 15.17V12a1 1 0 10-2 0v3.17l-1.96-1.95a1 1 0 10-1.41 1.41l3.36 3.36a1 1 0 001.41 0l3.37-3.36z" />
        </svg>
    );
}