import { useState } from 'react';
import OptionsContainer from './components/OptionsContainer';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);

    const [currentTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!currentTab || !currentTab.id) return;

    const response = await chrome.tabs.sendMessage(currentTab.id, {
      action: 'start'
    });

    if (response.isFinished) {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-4 border-gray-900 bg-gray-800 w-80">
      <div className="px-6 pb-6">
        <div className="w-full flex justify-center">
          <img src="/images/logo.png" className="object-contain" />
        </div>
        <p className="text-gray-500 text-sm mt-2">
          Welcome! This is an extension to find games easily in Conflict of
          Nations. Click the button to get started.
        </p>
        <OptionsContainer />
        <div>
          <button
            onClick={handleStart}
            disabled={isLoading}
            className="py-2 w-full border-2 border-indigo-600 text-white uppercase font-bold text-xs hover:bg-indigo-500 hover:bg-opacity-20 transition-colors ease-in duration-200"
          >
            {isLoading ? 'Loading...' : 'Find Games'}
          </button>
          <p className="mt-2 text-xs text-yellow-600">
            ⁉️ After you click the button, the games will be sorted
            automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
