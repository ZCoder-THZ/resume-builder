import HomePage from './home';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <>
      <ToastContainer />
      <HomePage />
    </>
  );
}
