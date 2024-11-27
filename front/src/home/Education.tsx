import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea from ShadCN

type EducationField = {
  institution?: string;
  degree?: string;
  startYear?: string;
  endYear?: string;
  fieldOfStudy?: string;
  location?: string;
};
type FormData = {
  education: EducationField[];
};
function Education() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  // console.log(errors.education[0], 'error log');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <div className="space-y-6">
      <h6 className="text-2xl font-semibold">Education</h6>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col space-y-4 p-4 border border-gray-300 rounded-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`education.${index}.institution`}
                className="block text-sm font-medium text-gray-700"
              >
                Institution
              </label>
              <Input
                id={`education.${index}.institution`}
                type="text"
                {...register(`education.${index}.institution`)}
                defaultValue={field.institution || ''}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.education &&
                errors.education[index] &&
                errors.education[index].institution && (
                  <p className="text-red-500">
                    {errors.education[index].institution.message}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor={`education.${index}.degree`}
                className="block text-sm font-medium text-gray-700"
              >
                Degree
              </label>
              <Input
                id={`education.${index}.degree`}
                type="text"
                {...register(`education.${index}.degree`)}
                defaultValue={field.degree || ''}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.education &&
                errors.education[index] &&
                errors.education[index].institution && (
                  <p className="text-red-500">
                    {errors.education[index].degree?.message}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor={`education.${index}.startYear`}
                className="block text-sm font-medium text-gray-700"
              >
                Start Year
              </label>
              <Input
                id={`education.${index}.startYear`}
                type="date"
                {...register(`education.${index}.startYear`)}
                defaultValue={field.startYear || ''}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.education &&
                errors.education[index] &&
                errors.education[index].institution && (
                  <p className="text-red-500">
                    {errors.education[index].startYear?.message}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor={`education.${index}.endYear`}
                className="block text-sm font-medium text-gray-700"
              >
                End Year
              </label>
              <Input
                id={`education.${index}.endYear`}
                type="date"
                {...register(`education.${index}.endYear`)}
                defaultValue={field.endYear || ''}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.education &&
                errors.education[index] &&
                errors.education[index].institution && (
                  <p className="text-red-500">
                    {errors.education[index].endYear?.message}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor={`education.${index}.fieldOfStudy`}
                className="block text-sm font-medium text-gray-700"
              >
                Field of Study
              </label>
              <Input
                id={`education.${index}.fieldOfStudy`}
                type="text"
                {...register(`education.${index}.fieldOfStudy`)}
                defaultValue={field.fieldOfStudy || ''}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.education &&
                errors.education[index] &&
                errors.education[index].institution && (
                  <p className="text-red-500">
                    {errors.education[index].fieldOfStudy?.message}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor={`education.${index}.location`}
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <Textarea
                id={`education.${index}.location`}
                {...register(`education.${index}.location`)}
                defaultValue={field.location || ''}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.education &&
                errors.education[index] &&
                errors.education[index].institution && (
                  <p className="text-red-500">
                    {errors.education[index].fieldOfStudy?.message}
                  </p>
                )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 hover:text-red-800 mt-4"
          >
            <span role="img" aria-label="Remove">
              ❌ Remove
            </span>
          </button>
        </div>
      ))}

      <Button
        type="button"
        variant="main"
        onClick={(): void =>
          append({
            institution: '',
            degree: '',
            startYear: '',
            endYear: '',
            fieldOfStudy: '',
            location: '',
          })
        }
        className="mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add Education
      </Button>
    </div>
  );
}

export default Education;
