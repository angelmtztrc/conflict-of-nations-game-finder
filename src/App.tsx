const App = () => {
  const handleStart = async () => {
    console.log('Starting process...');

    const [currentTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!currentTab || !currentTab.id) return;

    const response = await chrome.tabs.sendMessage(currentTab.id, {
      action: 'start'
    });

    console.log(response);
  };

  return (
    <div className="border-4 border-gray-900 bg-gray-800 w-80">
      <div className="p-6">
        <h1 className="text-lg">title here</h1>
        <p className="text-gray-500 text-base mt-2">
          Welcome! To get started, click the botton below.
        </p>
        <div className="mt-4">
          <button
            onClick={handleStart}
            className="py-2 w-full border-2 border-indigo-600 text-white uppercase font-bold text-xs hover:bg-indigo-500 hover:bg-opacity-20 transition-colors ease-in duration-200"
          >
            Find Games
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
