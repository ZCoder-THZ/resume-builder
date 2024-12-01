import React, { useState, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Select, { MultiValue, SingleValue } from 'react-select';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export type ExperienceType = {
  position: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  skills: string[];
  tools: string[];
  description: string;
};

type SkillOption = { value: string; label: string; id: number };
type ToolOption = { value: string; label: string };

type FormData = {
  experience: ExperienceType[];
};

// Static options
const toolOptions: ToolOption[] = [
  { value: 'Visual Studio Code', label: 'Visual Studio Code' },
  { value: 'Git', label: 'Git' },
  { value: 'Docker', label: 'Docker' },
  { value: 'Postman', label: 'Postman' },
];

// Component
function Project() {
  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const [skillsOptions, setSkillsOptions] = useState<SkillOption[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch skills dynamically
  const fetchSkills = async (input: string) => {
    if (input.length < 3) {
      setSkillsOptions([]);
      return;
    }

    try {
      const response = await axios.get<{
        data: { skill_name: string; id: number }[];
      }>(`http://localhost:4000/skills/search?keyword=${input}`);

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

  const debouncedFetchSkills = useCallback(
    debounce((input: string) => fetchSkills(input), 300),
    []
  );

  const handleSkillInputChange = (newValue: string) => {
    setInputValue(newValue);
    debouncedFetchSkills(newValue);
  };

  return (
    <div className="mb-3">
      <h6 className="text-2xl">Experience</h6>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-6">
          <div className="flex space-x-3 mb-4">
            <div className="flex-1">
              <label>Position</label>
              <Input
                type="text"
                placeholder="Position"
                {...register(`experience.${index}.position` as const)}
              />
              {errors.experience?.[index]?.position && (
                <p className="text-red-500">
                  {errors.experience[index].position?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label>Job Title</label>
              <Input
                type="text"
                placeholder="Job Title"
                {...register(`experience.${index}.jobTitle` as const)}
              />
              {errors.experience?.[index]?.jobTitle && (
                <p className="text-red-500">
                  {errors.experience[index].jobTitle?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label>Start Date</label>
              <Input
                type="date"
                placeholder="Start Date"
                {...register(`experience.${index}.startDate` as const)}
              />
              {errors.experience?.[index]?.startDate && (
                <p className="text-red-500">
                  {errors.experience[index].startDate?.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label>End Date</label>
              <Input
                type="date"
                placeholder="End Date"
                {...register(`experience.${index}.endDate` as const)}
              />
              {errors.experience?.[index]?.endDate && (
                <p className="text-red-500">
                  {errors.experience[index].endDate?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <div className="mb-4 flex-1">
              <label>Skills</label>
              <Select
                options={skillsOptions}
                isMulti
                {...field}
                placeholder="Select Skills"
                className="react-select-container"
                classNamePrefix="react-select"
                onInputChange={handleSkillInputChange}
                onChange={(selectedOptions: MultiValue<SkillOption>) =>
                  setValue(
                    `experience.${index}.skills` as const,
                    selectedOptions.map((option) => option?.value)
                  )
                }
                defaultValue={(
                  getValues(`experience.${index}.skills`) || []
                ).map((value: string) =>
                  skillsOptions.find((option) => option.value === value)
                )}
                noOptionsMessage={() =>
                  inputValue.length >= 3
                    ? 'No skills found'
                    : 'Type at least 3 characters'
                }
              />
            </div>
            <div className="mb-4 flex-1">
              <label>Tools</label>
              <Select
                options={toolOptions}
                isMulti
                placeholder="Select Tools"
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(selectedOptions: MultiValue<ToolOption>) =>
                  setValue(
                    `experience.${index}.tools` as const,
                    selectedOptions.map((option) => option.value)
                  )
                }
                defaultValue={(
                  getValues(`experience.${index}.tools`) || []
                ).map((value: string) =>
                  toolOptions.find((option) => option.value === value)
                )}
              />
            </div>
          </div>
          <div className="mb-4">
            <label>Company Name</label>
            <Input
              type="text"
              placeholder="Company Name"
              {...register(`experience.${index}.companyName` as const)}
            />
            {errors.experience?.[index]?.companyName && (
              <p className="text-red-500">
                {errors.experience[index].companyName?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label>Description</label>
            <Textarea
              placeholder="Description"
              {...register(`experience.${index}.description` as const)}
            />
          </div>

          <Button variant="destructive" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        className="mb-3"
        onClick={() =>
          append({
            position: '',
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            skills: [],
            tools: [],
            description: '',
          })
        }
        variant="main"
      >
        Add Experience
      </Button>
    </div>
  );
}

export default Project;
