import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
function SocialLinks() {
  const { control, setValue, getValues } = useFormContext();

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="githhub">githhub</label>
        <Input
          className="mb-3"
          id="github"
          type="text"
          placeholder="Enter your github profile URL"
          value={getValues('github')}
          onChange={(e) => setValue('github', e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="linkedin">LinkedIn</label>
        <Input
          className="mb-3"
          id="linkedin"
          type="text"
          placeholder="Enter your LinkedIn profile URL"
          value={getValues('linkedin')}
          onChange={(e) => setValue('linkedin', e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="facebook">Facebook</label>
        <Input
          className="mb-3"
          id="facebook"
          type="text"
          placeholder="Enter your Facebook profile URL"
          value={getValues('facebook')}
          onChange={(e) => setValue('facebook', e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="twitter">Twitter</label>
        <Input
          className="mb-3"
          id="twitter"
          type="text"
          placeholder="Enter your Twitter handle"
          value={getValues('twitter')}
          onChange={(e) => setValue('twitter', e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
        />
      </div>
    </>
  );
}

export default SocialLinks;
