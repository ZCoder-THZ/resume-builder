import { SWRConfig } from 'swr';
import HomePage from './home';
export default function App() {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 100,
        refreshInterval: 100,
        fallback: { a: 1, b: 1 },
      }}
    >
      <SWRConfig
        value={{
          dedupingInterval: 200, // will override the parent value since the value is primitive
          fallback: { a: 2, c: 2 }, // will merge with the parent value since the value is a mergeable object
        }}
      >
        <HomePage />
      </SWRConfig>
    </SWRConfig>
  );
}
