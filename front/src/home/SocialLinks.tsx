import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

function SocialLinks() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="github">GitHub</label>
        <Input
          className="mb-3"
          id="github"
          type="text"
          placeholder="Enter your GitHub profile URL"
          {...register('github')}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
        {errors.github && (
          <p className="text-red-500" style={{ fontSize: '12px' }}>
            {errors.github?.message as string}
          </p>
        )}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="linkedin">LinkedIn</label>
        <Input
          className="mb-3"
          id="linkedin"
          type="text"
          placeholder="Enter your LinkedIn profile URL"
          {...register('linkedin')}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
        {errors.linkedin && (
          <p className="text-red-500" style={{ fontSize: '12px' }}>
            {errors.linkedin?.message as string}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="facebook">Facebook</label>
        <Input
          className="mb-3"
          id="facebook"
          type="text"
          placeholder="Enter your Facebook profile URL"
          {...register('facebook')}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
        {errors.facebook && (
          <p className="text-red-500" style={{ fontSize: '12px' }}>
            {errors.facebook?.message as string}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="twitter">Twitter</label>
        <Input
          className="mb-3"
          id="twitter"
          type="text"
          placeholder="Enter your Twitter handle"
          {...register('twitter')}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
        {errors.twitter && (
          <p className="text-red-500" style={{ fontSize: '12px' }}>
            {errors.twitter?.message as string}
          </p>
        )}
      </div>
    </>
  );
}

export default SocialLinks;
