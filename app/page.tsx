'use client';

import { useState } from 'react';
import Image from "next/image";
import encrypted from '@/public/assets/img/encrypted.png'; 

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleApiCall = async (endpoint: 'encrypt' | 'decrypt') => { 
    setError('');
    setOutputText('');
    if (!inputText || !password) {
      setError('Please enter both text and a password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setOutputText(endpoint === 'encrypt' ? data.encryptedText : data.decryptedText);
    } catch (err: unknown) { 
      if (err instanceof Error) {
        setError(`Error during ${endpoint}: ${err.message}`);
      } else {
        setError(`Error during ${endpoint}: An unknown error occurred.`);
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-950 to-black text-white flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif; /* Ensure Orbitron is imported or linked in your global CSS/HTML */
        }
      `}</style>
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl animate-fadeIn">
        <h1 className="text-center text-4xl sm:text-5xl font-bold mb-6 text-cyan-400 font-orbitron drop-shadow-lg flex items-center justify-center gap-3">
          <Image src={encrypted} alt="logo" width={60} height={60} className='object-contain' />
          Locklify
        </h1>

        <div className="space-y-5">
          <div>
            <label htmlFor="inputText" className="text-sm font-medium text-gray-300 mb-1 block">Text to Encrypt/Decrypt</label>
            <textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
              className="bg-gray-800 border border-gray-700 rounded-lg w-full py-2.5 px-3 text-sm resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              placeholder="Enter your message..."
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-300 mb-1 block">Password (key)</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Your secret password"
              className="bg-gray-800 border border-gray-700 rounded-lg w-full py-2.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-cyan-400 transition-colors mt-4" 
              disabled={loading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029M3.375 9.45L6.45 12.525M12 5c4.478 0 8.268 2.943 9.543 7a10.007 10.007 0 01-1.552 3.033M18.6 16.65l-2.4-2.4" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3"> 
            <button
              onClick={() => handleApiCall('encrypt')}
              disabled={loading}
              className={`flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 py-2.5 rounded-lg font-bold text-sm transition transform hover:scale-105 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {loading && (inputText && !outputText) ? 'Encrypting...' : 'Encrypt'}
            </button>
            <button
              onClick={() => handleApiCall('decrypt')}
              disabled={loading}
              className={`flex-1 bg-gradient-to-r from-green-600 to-teal-500 py-2.5 rounded-lg font-bold text-sm transition transform hover:scale-105 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {loading && (inputText && outputText) ? 'Decrypting...' : 'Decrypt'}
            </button>
          </div>

          {error && <p className="text-red-400 bg-red-900/20 p-2 rounded-md text-center text-sm">{error}</p>}

          {outputText && (
            <div>
              <label htmlFor="outputText" className="text-sm font-medium text-gray-300 mb-1 block">Result</label>
              <textarea
                id="outputText"
                readOnly
                value={outputText}
                className="bg-gray-800 border border-gray-700 rounded-lg w-full py-2.5 px-3 text-sm resize-y min-h-[80px] focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="mt-3 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-sm font-bold transition transform hover:scale-105 active:scale-95"
              >
                📋 Copy Result
              </button>
            </div>
          )}
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-cyan-700 text-white px-4 py-2 rounded-md shadow-lg animate-slideUp text-sm z-50">
          ✅ Copied to clipboard!
        </div>
      )}
    </main>
  );
}