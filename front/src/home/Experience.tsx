import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const skillOptions = [
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'CSS', label: 'CSS' },
];

const toolOptions = [
  { value: 'Visual Studio Code', label: 'Visual Studio Code' },
  { value: 'Git', label: 'Git' },
  { value: 'Docker', label: 'Docker' },
  { value: 'Postman', label: 'Postman' },
];

function Project() {
  const { control, register, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience', // Match the form data structure
  });

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
                {...register(`experience.${index}.name`)} // Bind with register
              />
            </div>
            <div className="flex-1">
              <label>Job title</label>
              <Input
                type="text"
                placeholder="Job Title"
                {...register(`experience.${index}.title`)} // Bind with register
              />
            </div>
            <div className="flex-1">
              <label>Start Date</label>
              <Input
                type="date"
                placeholder="Start Date"
                {...register(`experience.${index}.startDate`)} // Bind with register
              />
            </div>
            <div className="flex-1">
              <label>End Date</label>
              <Input
                type="date"
                placeholder="End Date"
                {...register(`experience.${index}.endDate`)} // Bind with register
              />
            </div>
          </div>

          <div className="flex gap-1">
            <div className="mb-4 flex-1">
              <label>Skills</label>
              <Select
                options={skillOptions}
                isMulti
                placeholder="Select Skills"
                className="react-select-container"
                classNamePrefix="react-select"
                onChange={(selectedOptions) =>
                  setValue(
                    `experience.${index}.skills`,
                    selectedOptions.map((option) => option.value) // Store only values
                  )
                }
                defaultValue={(
                  getValues(`experience.${index}.skills`) || []
                ).map((value: string) =>
                  skillOptions.find((option) => option.value === value)
                )}
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
                onChange={(selectedOptions) =>
                  setValue(
                    `experience.${index}.tools`,
                    selectedOptions.map((option) => option.value) // Store only values
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
            <label>Description</label>
            <Textarea
              placeholder="Project Description"
              {...register(`experience.${index}.description`)} // Bind with register
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
            name: '',
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            skills: [],
            tools: [],
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
