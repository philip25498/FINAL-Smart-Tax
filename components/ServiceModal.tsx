
import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import Spinner from './Spinner';

interface ServiceModalProps {
    service: Service;
    isOpen: boolean;
    onClose: () => void;
    apiService: any; // Simplified for this context
}

// --- Helper Components for Rich Result Display ---

const SuccessIcon: React.FC = () => (
    <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
        <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    </div>
);

const ResultItem: React.FC<{ label: string; value: string; isHighlight?: boolean }> = ({ label, value, isHighlight = false }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className={`text-gray-800 font-semibold text-right ${isHighlight ? 'text-red-600' : ''}`}>{value}</span>
  </div>
);

const CopyableResultItem: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    const [copied, setCopied] = useState(false);
    
    if (!value || typeof value !== 'string') return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(value.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-gray-800 font-mono text-lg">{value.trim()}</span>
            </div>
            <button 
                onClick={handleCopy} 
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-md transition-colors w-20 text-center"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};


// --- Main Modal Component ---

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose, apiService }) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [verifyMethod, setVerifyMethod] = useState<'pin' | 'id'>('pin');

    useEffect(() => {
        if (isOpen) {
            // Reset state when modal opens or service changes
            setFormData({});
            setIsLoading(false);
            setResult(null);
            setError(null);
            setVerifyMethod('pin');
        }
    }, [isOpen, service]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            let response;
            switch (service.title) {
                case 'Check Tax Obligations':
                    response = await apiService.checkObligation(formData.taxpayerspin);
                    break;
                case 'File a Null Return':
                     response = await apiService.fileNilReturn({
                        TaxpayerPIN: formData.TaxpayerPIN,
                        Year: formData.Year,
                        Month: formData.Month,
                        ObligationCode: formData.ObligationCode
                     });
                    break;
                case 'Tax Compliance Certificate':
                     response = await apiService.applyForTcc({
                        TaxpayerPIN: formData.TaxpayerPIN,
                        ReasonForTcc: formData.ReasonForTcc,
                     });
                    break;
                case 'Check IT Exemption':
                     response = await apiService.checkItExemption(formData.pin);
                    break;
                case 'Verify Tax PIN':
                    if (verifyMethod === 'pin') {
                        response = await apiService.verifyPinByPin(formData.KRAPIN);
                    } else {
                        response = await apiService.verifyPinById(formData.TaxPayersID);
                    }
                    break;
                default:
                    throw new Error("Service not implemented");
            }
            setResult(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderFormFields = () => {
        switch (service.title) {
            case 'Check Tax Obligations':
                return <InputField name="taxpayerspin" label="Taxpayer PIN" placeholder="A001234567B" value={formData.taxpayerspin || ''} onChange={handleInputChange} />;
            case 'File a Null Return':
                return (
                    <>
                        <InputField name="TaxpayerPIN" label="Taxpayer PIN" placeholder="A001234567B" value={formData.TaxpayerPIN || ''} onChange={handleInputChange} />
                        <InputField name="Year" label="Year (YYYY)" placeholder="2024" value={formData.Year || ''} onChange={handleInputChange} />
                        <InputField name="Month" label="Month (MM)" placeholder="06" value={formData.Month || ''} onChange={handleInputChange} />
                        <InputField name="ObligationCode" label="Obligation Code" placeholder="ITR" value={formData.ObligationCode || ''} onChange={handleInputChange} />
                    </>
                );
            case 'Tax Compliance Certificate':
                return (
                    <>
                        <InputField name="TaxpayerPIN" label="Taxpayer PIN" placeholder="A001234567B" value={formData.TaxpayerPIN || ''} onChange={handleInputChange} />
                        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="ReasonForTcc">Reason for TCC</label>
                        <textarea
                            id="ReasonForTcc"
                            name="ReasonForTcc"
                            placeholder="e.g., Applying for a government tender"
                            value={formData.ReasonForTcc || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
                            rows={3}
                            required
                        />
                    </>
                );
            case 'Check IT Exemption':
                return <InputField name="pin" label="Taxpayer PIN" placeholder="A002823332Z" value={formData.pin || ''} onChange={handleInputChange} />;
            case 'Verify Tax PIN':
                return (
                    <div>
                        <div className="flex items-center space-x-4 mb-4">
                            <label className="flex items-center cursor-pointer"><input type="radio" name="verifyMethod" value="pin" checked={verifyMethod === 'pin'} onChange={() => setVerifyMethod('pin')} className="mr-2" /> By PIN</label>
                            <label className="flex items-center cursor-pointer"><input type="radio" name="verifyMethod" value="id" checked={verifyMethod === 'id'} onChange={() => setVerifyMethod('id')} className="mr-2" /> By ID Number</label>
                        </div>
                        {verifyMethod === 'pin' ?
                            <InputField name="KRAPIN" label="KRA PIN" placeholder="A948312567Q" value={formData.KRAPIN || ''} onChange={handleInputChange} /> :
                            <InputField name="TaxPayersID" label="ID Number" placeholder="12345678" value={formData.TaxPayersID || ''} onChange={handleInputChange} />
                        }
                    </div>
                );
            default:
                return <p>This service form is not available.</p>;
        }
    };
    
    const renderResult = () => {
        if (!result) return null;

        switch(service.title) {
            case 'Check Tax Obligations': {
                const { RESULT } = result;
                if (!RESULT) return <p>Invalid response format.</p>;
                return (
                    <div className="text-center">
                        <SuccessIcon />
                        <h3 className="text-xl font-bold text-gray-800 mt-4">{RESULT.ResponseMsg}</h3>
                        <p className="text-green-600 font-semibold">{RESULT.Status}</p>
                        <div className="mt-6 text-left">
                            <h4 className="font-bold text-lg mb-2 text-gray-700">Your Tax Obligations:</h4>
                            {RESULT.ObligationsList && RESULT.ObligationsList.length > 0 ? (
                                <ul className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    {RESULT.ObligationsList.map((ob: any) => (
                                        <li key={ob.obligationId} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                                            <span className="font-medium text-gray-800">{ob.obligationName}</span>
                                            <span className="text-sm bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded-full">{ob.obligationType}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-gray-500 p-4 text-center">No outstanding obligations found.</p>}
                        </div>
                    </div>
                );
            }
            case 'File a Null Return': {
                const { RESPONSE } = result;
                if (!RESPONSE) return <p>Invalid response format.</p>;
                return (
                    <div className="text-center">
                        <SuccessIcon />
                        <h3 className="text-xl font-bold text-gray-800 mt-4">Nil Return Filed Successfully!</h3>
                        <p className="text-gray-600 mt-1">{RESPONSE.Message.trim()}</p>
                        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
                            <CopyableResultItem label="Acknowledgement Number" value={RESPONSE.AckNumber} />
                        </div>
                        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                            Download Receipt (Coming Soon)
                        </button>
                    </div>
                );
            }
            case 'Tax Compliance Certificate': {
                const { RESPONSE } = result;
                if (!RESPONSE) return <p>Invalid response format.</p>;
                return (
                    <div className="text-center">
                        <SuccessIcon />
                        <h3 className="text-xl font-bold text-gray-800 mt-4">TCC Application Successful!</h3>
                        <p className="text-gray-600 mt-1">{RESPONSE.Message.trim()}</p>
                        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
                             <CopyableResultItem label="Application Ack. Number" value={RESPONSE.AckNumber} />
                             <CopyableResultItem label="TCC Number" value={RESPONSE.TCCNumber} />
                        </div>
                    </div>
                );
            }
            case 'Check IT Exemption': {
                const statusMessage = result.response_message || 'Status available.';
                const isExpired = statusMessage.toLowerCase().includes('expired');
                const issueDate = result.cert_issue_date ? new Date(result.cert_issue_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
                const effectiveDate = result.cert_eff_date ? new Date(result.cert_eff_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
                const expiryDate = result.cert_expiry_date ? new Date(result.cert_expiry_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

                return (
                    <div>
                        <div className={`p-4 rounded-lg mb-6 text-center ${isExpired ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            <h3 className="text-xl font-bold">{isExpired ? 'Certificate Expired' : 'Certificate Active'}</h3>
                            <p>{statusMessage}</p>
                        </div>
                        <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                            <ResultItem label="Certificate Number" value={result.cert_no || 'N/A'} />
                            <ResultItem label="Issue Date" value={issueDate} />
                            <ResultItem label="Effective Date" value={effectiveDate} />
                            <ResultItem label="Expiry Date" value={expiryDate} isHighlight={isExpired} />
                        </div>
                    </div>
                );
            }
            case 'Verify Tax PIN': {
                const pinData = result.PINDATA || {
                    KRAPIN: result.TaxpayerPIN,
                    Name: result.TaxpayerName,
                    StatusOfPIN: 'Active', // Assume active if not specified from ID check
                    TypeOfTaxpayer: 'N/A'
                };
                if (!pinData.Name) return <p>Invalid response format.</p>;

                const isActive = pinData.StatusOfPIN?.toLowerCase() === 'active';

                return (
                    <div className="text-center">
                        <SuccessIcon />
                        <h3 className="text-xl font-bold text-gray-800 mt-4">PIN Verified Successfully</h3>
                        <p className="text-gray-600 mt-1">{result.Message || 'Details found for the provided identifier.'}</p>
                        
                        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg space-y-2">
                            <ResultItem label="Name" value={pinData.Name} />
                            <ResultItem label="KRA PIN" value={pinData.KRAPIN} />
                            {pinData.TypeOfTaxpayer !== 'N/A' && <ResultItem label="Taxpayer Type" value={pinData.TypeOfTaxpayer} />}
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 font-medium">PIN Status</span>
                                <span className={`font-bold px-3 py-1 rounded-full text-sm ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {pinData.StatusOfPIN}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }
            default:
                return (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                        <h4 className="font-bold text-lg mb-2 text-gray-800">Unhandled API Response:</h4>
                        <pre className="text-sm bg-gray-800 text-white p-3 rounded-md overflow-x-auto">
                            <code>{JSON.stringify(result, null, 2)}</code>
                        </pre>
                    </div>
                );
        }
    };


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
          <header className="bg-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">{service.title}</h3>
            <button onClick={onClose} className="text-white text-2xl font-bold hover:text-gray-200 leading-none">&times;</button>
          </header>

          <div className="p-6 overflow-y-auto">
            {!result && !error && (
              <form onSubmit={handleSubmit}>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                {renderFormFields()}
                <button type="submit" disabled={isLoading} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 flex items-center justify-center">
                  {isLoading ? 'Processing...' : 'Submit'}
                </button>
              </form>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Spinner />
                <p className="mt-4 text-gray-600">Contacting KRA services...</p>
              </div>
            )}
            
            {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md font-semibold">{error}</div>}
            
            {result && 
                <div className="animate-fade-in">
                    {renderResult()}
                </div>
            }
            
            {(error || result) && (
                 <button onClick={onClose} className="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Close
                </button>
            )}
            
          </div>
        </div>
      </div>
    );
};

const InputField: React.FC<{ name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string }> = ({ name, label, value, onChange, type = 'text', placeholder }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
            required
        />
    </div>
);


export default ServiceModal;
