'use client';

import { useState } from 'react';
import * as Yup from 'yup';
import { khodamList } from './khodamList';
import { Button } from '@radix-ui/themes';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nama harus diisi!').min(3, 'Nama terlalu pendek!').max(20, 'Nama terlalu panjang!')
});

const App = () => {
  // State variables
  const [khodam, setKhodam] = useState<{
    name: string;
    meaning: string;
  } | null>(null); // Holds current khodam
  const [loading, setLoading] = useState(false); // Loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // Form submission state
  const [submittedName, setSubmittedName] = useState(''); // Submitted name
  const [name, setName] = useState(''); // Form input state
  const [error, setError] = useState(''); // Validation error state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate input
    try {
      await validationSchema.validate({ name });
      setError(''); // Clear previous error
      setLoading(true); // Start loading state
      setTimeout(() => {
        // Simulate fetching khodam data
        const randomIndex = Math.floor(Math.random() * khodamList.length);
        setKhodam(khodamList[randomIndex]); // Set random khodam
        setLoading(false); // End loading state
        setIsSubmitted(true); // Set form submission state
        setSubmittedName(name); // Set submitted name
      }, 2000); // Simulate 2 seconds delay
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        setError(validationError.message); // Set validation error
      }
    }
  };

  const handleReset = () => {
    setName(''); // Clear form input
    setIsSubmitted(false); // Reset submission state
    setKhodam(null); // Clear khodam data
    setSubmittedName(''); // Clear submitted name
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-darka">
      <div className="max-w-md rounded-lg dark:bg-darkb bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold dark:text-gray-200 text-gray-800">Cek Khodam</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="mb-2 block font-bold text-gray-200">
              Nama Anda:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Masukkan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-200 shadow focus:outline-none"
              disabled={loading || isSubmitted} // Disable input during submission
            />
            {error && <p className="text-xs italic text-red-500">{error}</p>}
          </div>

          <Button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            disabled={loading || isSubmitted} // Disable button during submission
          >
            {loading ? 'Memproses...' : 'Cek'}
          </Button>

          {isSubmitted && khodam && (
            <div className="mt-6 border-l-4 border-green-500 bg-green-100 p-4 text-green-700" role="alert">
              <p className="font-bold">Hasil:</p>
              <p>Halo {submittedName}, Khodamu adalah: </p>
              <span className="text-xl font-bold text-blue-500">{khodam.name}</span>
              <p>
                <span className="text-gray-900">{khodam.meaning}</span>
              </p>
            </div>
          )}

          {(isSubmitted || loading) && (
            <Button
              type="button"
              className="focus:shadow-outline mt-2 rounded dark:bg-darkb bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400 focus:outline-none"
              onClick={handleReset}
            >
              {loading ? 'Loading...' : 'Cek Lagi'}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
