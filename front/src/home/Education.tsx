import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
function Education() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <>
      <h6 className="text-2xl">Education</h6>
      {fields.map((field, index) => (
        <div style={{ display: 'flex', marginBottom: '16px' }} key={field.id}>
          <div style={{ flex: 1, marginRight: '8px' }}>
            <label htmlFor={`education.${index}.institution`}>
              Institution
            </label>
            <Input
              type="text"
              id={`education.${index}.institution`}
              {...register(`education.${index}.institution`)}
              defaultValue={field.institution || ''}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ flex: 1, marginRight: '8px' }}>
            <label htmlFor={`education.${index}.degree`}>Degree</label>
            <Input
              type="text"
              id={`education.${index}.degree`}
              {...register(`education.${index}.degree`)}
              defaultValue={field.degree || ''}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ flex: 1, marginRight: '8px' }}>
            <label htmlFor={`education.${index}.year`}>Year</label>
            <Input
              type="text"
              id={`education.${index}.year`}
              {...register(`education.${index}.year`)}
              defaultValue={field.year || ''}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            style={{
              color: 'red',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              alignSelf: 'center',
            }}
          >
            <span role="img" aria-label="Remove">
              ❌
            </span>
          </button>
        </div>
      ))}
      <Button
        variant={'main'}
        onClick={() => append({ institution: '', degree: '', year: '' })}
        style={{ padding: '8px 16px', cursor: 'pointer' }}
      >
        Add Education
      </Button>
    </>
  );
}

export default Education;
