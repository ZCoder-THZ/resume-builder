import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

function Project() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience', // Make sure this matches the form data structure
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
          append({ name: '', description: '', startDate: '', endDate: '' })
        }
        variant="main"
      >
        Add Experience
      </Button>
    </div>
  );
}

export default Project;
