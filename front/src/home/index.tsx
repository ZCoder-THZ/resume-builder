import { useForm, Controller, FormProvider } from 'react-hook-form';
import Education from './Education';
import SocialLinks from './SocialLinks';
import Skill from './Skill';
import Project from './Experience';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type EducationType = { institution: string; degree: string; year: string };
type Skills = string;

type FormData = {
  personalInfo: PersonalInfo;
  education: EducationType[];
  skill: Skills[];
  experience: Array<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }>;
  github: string;
};

function ResumeBuilder() {
  const methods = useForm({
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      education: [{ institution: '', degree: '', year: '' }],
      github: '',
      experience: [
        {
          name: '',
          description: '',
          startDate: '',
          endDate: '',
        },
      ],
    },
  });

  const { handleSubmit, reset, watch } = methods;
  const formData = watch();

  const onSubmit = (data: FormData) => {
    console.log('Resume Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side form */}
        <div className="w-full md:w-2/5 p-4 md:p-8 border-b md:border-b-0 md:border-r">
          <h4 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Resume Builder
          </h4>

          <h6 className="text-lg font-semibold mb-4">Personal Information</h6>

          <Controller
            name="personalInfo.name"
            control={methods.control}
            render={({ field }) => (
              <div className="mb-3">
                <label className="block font-medium">Name</label>
                <Input {...field} type="text" placeholder="Enter name" />
              </div>
            )}
          />
          <Controller
            name="personalInfo.email"
            control={methods.control}
            render={({ field }) => (
              <div className="mb-3">
                <label className="block font-medium">Email</label>
                <Input {...field} type="email" placeholder="Enter email" />
              </div>
            )}
          />
          <Controller
            name="personalInfo.phone"
            control={methods.control}
            render={({ field }) => (
              <div className="mb-3">
                <label className="block font-medium">Phone</label>
                <Input {...field} type="tel" placeholder="Enter phone" />
              </div>
            )}
          />
          <Controller
            name="personalInfo.address"
            control={methods.control}
            render={({ field }) => (
              <div className="mb-3">
                <label className="block font-medium">Address</label>
                <Textarea {...field} placeholder="Enter address" />
              </div>
            )}
          />

          <Education />
          <Project />
          <Skill />
          <SocialLinks />

          <div className="flex mt-6">
            <Button onClick={handleSubmit(onSubmit)} className="mr-4">
              Generate Resume
            </Button>
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </div>

        {/* Right side preview */}
        <div className="w-full md:w-3/5 p-4 md:p-8 bg-gray-50">
          <h4 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
            Resume Preview
          </h4>
          <div className="border p-4 md:p-6 rounded-lg shadow-lg bg-white">
            <div className="text-center mb-4 md:mb-6">
              <h5 className="text-xl md:text-2xl font-semibold text-blue-700">
                {formData.personalInfo?.name || 'Your Name'}
              </h5>
              <p className="text-gray-600">
                {formData.personalInfo?.email || 'Your Email'}
              </p>
              <p className="text-gray-600">
                {formData.personalInfo?.phone || 'Your Phone'}
              </p>
              <p className="text-gray-600">
                {formData.personalInfo?.address || 'Your Address'}
              </p>
            </div>

            <hr className="my-2 md:my-4" />

            <section className="mb-4 md:mb-6">
              <h6 className="text-lg md:text-xl font-semibold text-blue-700">
                Education
              </h6>
              {formData.education.map((edu, index) => (
                <div key={index} className="my-2">
                  <p className="font-medium text-gray-800">
                    {edu.institution || 'Institution'}
                  </p>
                  <p className="text-gray-600">
                    {edu.degree || 'Degree'}, {edu.year || 'Year'}
                  </p>
                </div>
              ))}
            </section>

            <section className="mb-4 md:mb-6">
              <h6 className="text-lg md:text-xl font-semibold text-blue-700">
                Experience
              </h6>
              {formData.experience.map((exp, index) => (
                <div key={index} className="my-2">
                  <p className="font-medium text-gray-800">
                    {exp.name || 'Position'}
                  </p>
                  <p className="text-gray-600">
                    {exp.startDate || 'Start Date'} -{' '}
                    {exp.endDate || 'End Date'}
                  </p>
                  <p className="text-gray-600">
                    {exp.description || 'Description'}
                  </p>
                </div>
              ))}
            </section>

            <section className="mb-4 md:mb-6">
              <h6 className="text-lg md:text-xl font-semibold text-blue-700">
                Skills
              </h6>
              <ul className="list-disc ml-6 text-gray-600">
                {formData.skill?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                )) || 'Skills List'}
              </ul>
            </section>

            <section>
              <h6 className="text-lg md:text-xl font-semibold text-blue-700">
                Social Links
              </h6>
              <p className="mb-3 text-gray-600">
                GitHub: {formData.github || 'Your GitHub'}
              </p>
              <p className="mb-3 text-gray-600">
                portfolio: {formData.portFolio_website || 'Your portfolio'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default ResumeBuilder;
