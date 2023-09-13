import OptionsGroup from './OptionsGroup';

const OptionsContainer = () => {
  return (
    <div className="mt-4 w-full">
      <div className="border-b-2 border-indigo-600 flex justify-center">
        <p className="text-xs font-bold uppercase text-white border-2 border-b-0 border-indigo-600 inline-block px-2 py-1 bg-gray-800 -mb-[2px]">
          Options
        </p>
      </div>
      <div>
        <OptionsGroup />
      </div>
    </div>
  );
};

export default OptionsContainer;
