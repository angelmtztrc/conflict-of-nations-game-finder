import * as RadioGroup from '@radix-ui/react-radio-group';

import { specialKinds } from '../utils/available-options.util';
import useOptionStore from '../hooks/useOptionStore';

import Separator from './Separator';

const OptionsGroup = () => {
  const specialFilter = useOptionStore(state => state.specialFilter);
  const setSpecialFilter = useOptionStore(state => state.setSpecialFilter);

  const handleSpecialKindsChange = (value: string) => {
    setSpecialFilter(value);
  };

  return (
    <div className="mt-3">
      <RadioGroup.Root
        className="space-y-2"
        value={specialFilter ?? ''}
        onValueChange={handleSpecialKindsChange}
      >
        {specialKinds.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroup.Item
              id={option.id}
              value={option.value}
              onChange={e => handleSpecialKindsChange(e.currentTarget.value)}
              className="border-2 border-indigo-600 w-10 h-8"
            >
              <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:w-3 after:h-3 after:bg-indigo-600' />
            </RadioGroup.Item>
            <div className="h-8 w-full border-2 border-indigo-600 flex justify-center items-center">
              <label
                htmlFor={option.id}
                className="uppercase text-xs text-white font-bold"
              >
                {option.name}
              </label>
            </div>
          </div>
        ))}
      </RadioGroup.Root>
      <Separator />
    </div>
  );
};

export default OptionsGroup;
