import { Controller, useFormContext } from 'react-hook-form';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { colourOptions } from './skillMulti';

// Assuming you have defined colourOptions somewhere in your code
// const colourOptions = [ ... ];

function Skill() {
  const animatedComponents = makeAnimated();
  const { control } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <Controller
          name="skills" // Adjust this name according to your form structure
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={colourOptions}
              value={value || []} // Default to an empty array if no value
              onChange={(selected) => onChange(selected)} // Update form state
              onBlur={onBlur} // Handle blur event
            />
          )}
        />
      </div>
    </>
  );
}

export default Skill;
