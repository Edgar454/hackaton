'use client';

import { sendDataToBackend } from './services/api';

export default function Home() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get('userInput') as string;
    
    try {
      const response = await sendDataToBackend(inputValue);
      console.log('Response from backend:', response);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (you might want to show an error message to the user)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Entrez l'ID du ticket sélectionné
        </h1>
        <div className="mb-4">
          <input
            type="text"
            name="userInput"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your text..."
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
