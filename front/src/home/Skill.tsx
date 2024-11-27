import { Controller, useFormContext } from 'react-hook-form';
import { useState, useCallback } from 'react';
import Select, { OptionsOrGroups, GroupBase } from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import debounce from 'lodash.debounce';

// Define the shape of each skill option
interface SkillOption {
  value: string;
  label: string;
  id: number;
}

function Skill() {
  const animatedComponents = makeAnimated();
  const [skillsOptions, setSkillsOptions] = useState<
    OptionsOrGroups<SkillOption, GroupBase<SkillOption>>
  >([]);
  const [inputValue, setInputValue] = useState('');
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Function to fetch skills dynamically
  const fetchSkills = async (input: string) => {
    if (input.length < 3) {
      setSkillsOptions([]);
      return; // Avoid API call for less than 3 characters
    }

    try {
      const response = await axios.get<{
        data: { skill_name: string; id: number }[];
      }>(`http://localhost:4000/skills/search?keyword=${input}`);
      console.log(response, 'response data');
      if (response.status === 200) {
        setSkillsOptions(
          response.data.data.map((skill) => ({
            value: skill.skill_name,
            label: skill.skill_name,
            id: skill.id,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkillsOptions([]);
    }
  };

  // Debounced version of fetchSkills to minimize API calls
  const debouncedFetchSkills = useCallback(
    debounce((input: string) => fetchSkills(input), 300),
    [] // No dependencies to ensure consistent behavior
  );

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    console.log(inputValue);
    debouncedFetchSkills(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Skills</label>
      <Controller
        name="skills"
        control={control}
        rules={{ required: 'Please select at least one skill' }}
        render={({ field }) => {
          console.log(field.value, 'selected values');
          return (
            <Select
              {...field}
              isMulti
              components={animatedComponents}
              options={skillsOptions}
              onInputChange={handleInputChange}
              inputValue={inputValue}
              placeholder="Select Skills"
              noOptionsMessage={() =>
                inputValue.length >= 3
                  ? 'No skills found'
                  : 'Type at least 3 characters'
              }
              classNamePrefix="react-select"
            />
          );
        }}
      />
      {errors.skills && (
        <p className="text-red-500 text-sm">
          {errors.skills.message as string}
        </p>
      )}
    </div>
  );
}

export default Skill;
