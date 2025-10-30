
const API_BASE_URL = 'https://smarttaxbackend.cliffmutinda.com';

const getAuthToken = (): string | null => {
    return localStorage.getItem('smarttax_token');
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Note: The provided backend seems to not require auth tokens for these services.
    // If it did, we would uncomment the following lines.
    // if (token) {
    //     headers['Authorization'] = `Bearer ${token}`;
    // }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.Message || `Request failed with status ${response.status}`);
        }
        
        return data;

    } catch (error: any) {
        console.error(`API call to ${endpoint} failed:`, error);
        throw new Error(error.message || 'An network error occurred.');
    }
};

export const checkObligation = (taxpayerspin: string) => 
    apiFetch('/checkobligation', { method: 'POST', body: JSON.stringify({ taxpayerspin }) });

export const fileNilReturn = (payload: { TaxpayerPIN: string; Year: string; Month: string; ObligationCode: string; }) =>
    apiFetch('/nilreturn', { method: 'POST', body: JSON.stringify(payload) });

export const applyForTcc = (payload: { TaxpayerPIN: string; ReasonForTcc: string; }) =>
    apiFetch('/tccapplication', { method: 'POST', body: JSON.stringify(payload) });

export const checkItExemption = (pin: string) =>
    apiFetch('/itexemption', { method: 'POST', body: JSON.stringify({ pin }) });
    
export const verifyPinByPin = (KRAPIN: string) =>
    apiFetch('/pinbypin', { method: 'POST', body: JSON.stringify({ KRAPIN }) });

export const verifyPinById = (TaxPayersID: string) =>
    apiFetch('/pinbyid', { method: 'POST', body: JSON.stringify({ TaxPayersID }) });
