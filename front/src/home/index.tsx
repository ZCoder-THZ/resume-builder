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
  portfolio: string;
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
  linkedin: string;
  facebook: string;
  twitter: string;
};

function ResumeBuilder() {
  const methods = useForm({
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        portfolio: '',
      },
      education: [{ institution: '', degree: '', year: '' }],
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

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormData) => {
    console.log('Resume Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="personalInfo.name"
                control={methods.control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                )}
              />
              <Controller
                name="personalInfo.email"
                control={methods.control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                )}
              />
              <Controller
                name="personalInfo.phone"
                control={methods.control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter your phone"
                    />
                  </div>
                )}
              />
              <Controller
                name="personalInfo.portfolio"
                control={methods.control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Portfolio
                    </label>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your portfolio"
                    />
                  </div>
                )}
              />
              <Controller
                name="personalInfo.address"
                control={methods.control}
                render={({ field }) => (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <Textarea {...field} placeholder="Enter your address" />
                  </div>
                )}
              />
            </div>
          </section>

          {/* Education Section */}
          <Education />

          {/* Experience Section */}
          <Project />

          {/* Skills Section */}
          <Skill />

          {/* Social Links Section */}
          <SocialLinks />

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <Button type="submit" className="bg-blue-600 text-white">
              Save Resume
            </Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

export default ResumeBuilder;
