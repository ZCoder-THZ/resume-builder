import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formDataSchema } from '@/lib/formModel';
import Education from './Education';
import SocialLinks from './SocialLinks';
import Skill from './Skill';
import Project from './Experience';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { toast } from 'react-toastify';
type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  portfolio: string;
  summary: string;
};

type EducationType = {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  location: string;
  fieldOfStudy: string;
};
type Skills = [];
export type ExperienceType = {
  jobTitle: string;
  companyName: string;
  location?: string; // Make optional if not always required

  description: string;
  startDate: string;
  endDate?: string; // Make optional if not always required
  skills?: string[]; // Make optional
  tools?: string[]; // Make optional
};

type FormData = {
  personalInfo: PersonalInfo;
  education: EducationType[];
  skills: Skills[];
  experience: Array<ExperienceType>;
  github: string;
  linkedin: string;
  facebook: string;
  twitter: string;
};

function ResumeBuilder() {
  const methods = useForm({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        portfolio: '',
        summary: 'someone',
      },
      education: [
        {
          institution: '',
          degree: '',
          startYear: '',
          endYear: '',
          location: '',
          fieldOfStudy: '',
        },
      ],
      experience: [
        {
          description: '',
          startDate: '',
          jobTitle: '',
          companyName: '',
          location: '',

          endDate: '',
        },
      ],
      // skill: [],
      github: '',
      linkedin: '',
      facebook: '',
      twitter: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  console.log(errors);
  const onSubmit = (data: FormData) => {
    console.log('Resume Data:', data);
    console.log(errors);
    try {
      const res = axios
        .post('http://localhost:4000/resumes', data)
        .then((response) => {
          console.log('Resume created successfully:', response.data);
          reset();
          console.log(res);
        });
      console.log('form submitted');
      toast('Success', {
        position: 'bottom-right',
        className: 'foo-bar',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast('Custom Style Notification with css class!', {
          position: 'bottom-right',
          className: 'foo-bar',
        });
      }
    }
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
                    {errors.personalInfo?.name && (
                      <p className="text-red-500">
                        {errors.personalInfo.name.message}
                      </p>
                    )}
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
                    {errors.personalInfo?.email && (
                      <p className="text-red-500">
                        {errors.personalInfo.email.message}
                      </p>
                    )}
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
                    {errors.personalInfo?.email && (
                      <p className="text-red-500">
                        {errors.personalInfo.phone?.message}
                      </p>
                    )}
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
                    {errors.personalInfo?.email && (
                      <p className="text-red-500">
                        {errors.personalInfo.portfolio?.message}
                      </p>
                    )}
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
                    {errors.personalInfo?.email && (
                      <p className="text-red-500">
                        {errors.personalInfo.address?.message}
                      </p>
                    )}
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
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                toast('Success', {
                  position: 'bottom-right',
                  className: 'foo-bar',
                });
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

export default ResumeBuilder;
