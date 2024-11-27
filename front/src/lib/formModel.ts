import * as z from 'zod';

const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  address: z.string().min(1, 'Address is required'),
  portfolio: z.string().url('Invalid portfolio URL').optional(),
  summary: z.string().optional(),
});

const educationSchema = z.array(
  z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree is required'),
    startYear: z.string().min(4, 'Invalid start year'),
    endYear: z.string().min(4, 'Invalid end year'),
    location: z.string().min(5, 'field must be filled'),
    fieldOfStudy: z.string().min(5, 'field must be filled'),
  })
);

const experienceSchema = z.array(
  z.object({
    jobTitle: z.string().min(1, 'Job title is required'),
    companyName: z.string().min(1, 'Company name is required'),
    location: z.string().optional(),
    position: z.string().min(1, 'position is required'),
    description: z.string().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
  })
);

// const socialLinksSchema = z.object({
//   github: z.string().url('Invalid GitHub URL').optional(),
//   linkedin: z.string().url('Invalid LinkedIn URL').optional(),
//   facebook: z.string().url('Invalid Facebook URL').optional(),
//   twitter: z.string().url('Invalid Twitter URL').optional(),
// });

export const formDataSchema = z.object({
  personalInfo: personalInfoSchema,
  education: educationSchema,
  skills: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        id: z.number(),
      })
    )
    .min(1, 'At least one skill must be selected'),
  experience: experienceSchema,
  github: z.string().url('Invalid GitHub URL').optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  facebook: z.string().url('Invalid Facebook URL').optional(),
  twitter: z.string().url('Invalid Twitter URL').optional(),
});
