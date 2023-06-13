import './App.css';
import Form from './components/useFormContext/forms/Form';

// useFormContext call
import { useForm, FormProvider } from "react-hook-form";

function App() {
  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <Form methods={methods} />
      </FormProvider>
    </>
  );
}

export default App;
