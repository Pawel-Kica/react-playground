import { z } from 'zod';
import FormBuilderTemplate from '../components/form-builder/FormBuilderTemplate';
import ProgressBar from '../components/form-builder/ProgressBar';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { useMultistepForm } from '../hooks/useMultiStep';

interface CreateAccountBody {
    email: string;
    password: string;
}

const CREATE_ACCOUNT_FORM_CONFIG = [
    [
        {
            label: 'First name',
            type: 'text',
            name: 'firstName',
            placeholder: 'Enter your first name',
            required: true,
            schema: z.string(),
        },
        {
            label: 'Last name',
            type: 'text',
            name: 'lastName',
            placeholder: 'Enter your password',
            required: true,
        },
    ],
    [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email address',
            required: true,
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Enter your password',
            required: true,
        },
    ],
    [
        {
            type: 'text',
            name: 'country',
            placeholder: 'Enter your country',
            required: true,
        },
        {
            type: 'text',
            name: 'city',
            placeholder: 'Enter your city',
            required: true,
        },
    ],
];

export default function FormBuilder() {
    const [form, setForm] = useFormBuilder<CreateAccountBody>({ email: '', password: '' });

    const { steps, currentStepIndex, element, isFirstStep, isLastStep, back, next } = useMultistepForm(
        CREATE_ACCOUNT_FORM_CONFIG.map((config, k) => (
            <FormBuilderTemplate key={k} config={config} state={form} onChange={setForm} />
        )),
    );

    function submitFormHandler() {
        //
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center bg-[#ffeadb] pt-20">
            <ProgressBar step={currentStepIndex} />
            <div className="relative bg-white shadow-m">
                <div>FormBuilder</div>
                {element}
                {isFirstStep || <button onClick={back}>Back</button>}
                <button onClick={next}>Continue</button>
                <button onClick={submitFormHandler}>Submit</button>
            </div>
        </div>
    );
}
