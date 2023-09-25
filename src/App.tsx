import { useCallback, useEffect, useState } from 'react';
import OptionsContainer from './components/OptionsContainer';
import useOptionStore from './hooks/useOptionStore';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const checkIfReady = useCallback(async () => {
    const [currentTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!currentTab || !currentTab.id) return;

    const response = await chrome.tabs.sendMessage(currentTab.id, {
      action: 'isReady'
    });

    if (response.isReady) {
      setCanStart(true);
    } else setCanStart(false);
  }, []);

  const settings = useOptionStore(state => ({
    filter: state.specialFilter,
    removeFull: state.removeFull
  }));

  useEffect(() => {
    chrome.runtime.onMessage.addListener(message => {
      if (message === true) {
        setCanStart(true);
        return;
      }

      setCanStart(false);

      return true;
    });
    checkIfReady();
  }, []);

  const handleStart = async () => {
    if (!canStart) return;
    setIsLoading(true);

    const [currentTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!currentTab || !currentTab.id) return;

    const response = await chrome.tabs.sendMessage(currentTab.id, {
      action: 'start',
      settings
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
          <div className="flex items-center space-x-2">
            <button
              onClick={handleStart}
              disabled={isLoading || !canStart}
              className="py-2 w-full border-2 border-indigo-600 text-white uppercase font-bold text-xs hover:bg-indigo-500 hover:bg-opacity-20 transition-colors ease-in duration-200 disabled:opacity-30"
            >
              {isLoading ? 'Loading...' : 'Find Games'}
            </button>
          </div>
          <p className="mt-2 text-xs text-yellow-600">
            {!canStart
              ? "🎯 Make sure you're in the New Games tab to get started."
              : '⁉️ After you click the button, the games will be sorted automatically.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
