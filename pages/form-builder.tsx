import FormBuilderTemplate, { FormBuilderConfig } from '../components/form-builder/FormBuilderTemplate';
import ProgressBar from '../components/form-builder/ProgressBar';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { useMultistepForm } from '../hooks/useMultiStep';

interface CreateAccountBody {
    email: string;
    password: string;
}

const CREATE_ACCOUNT_FORM_CONFIG: FormBuilderConfig[][] = [
    [
        {
            label: 'First name',
            type: 'text',
            name: 'firstName',
            placeholder: 'Enter your first name',
        },
        {
            label: 'Last name',
            type: 'text',
            name: 'lastName',
            placeholder: 'Enter your last name',
        },
        {
            label: 'Gender',
            type: 'radio',
            name: 'gender',
            placeholder: 'Enter your last name',
            options: { items: ['Man', 'Woman', 'I prefer not to say'], multiple: false },
        },
        {
            label: 'Date of birth',
            type: 'date',
            name: 'dateOfBirth',
        },
    ],
    [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email address',
        },
        {
            type: 'password',
            name: 'password',
            placeholder: 'Enter your password',
        },
    ],
    [
        {
            type: 'text',
            name: 'country',
            placeholder: 'Enter your country',
        },
        {
            type: 'text',
            name: 'city',
            placeholder: 'Enter your city',
        },
    ],
];

const titles = ['Create your account', 'Personal details', 'Social profiles'];

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
            <div className="relative flex flex-col items-center bg-white p-12 py-8 shadow-m">
                <div className="text-xl uppercase text-gray-m">{titles[currentStepIndex]}</div>
                {element}
                <div className="flex gap-3">
                    {isFirstStep || (
                        <button className="btn-builder" onClick={back}>
                            Back
                        </button>
                    )}
                    {isLastStep ? (
                        <button className="btn-builder" onClick={submitFormHandler}>
                            Submit
                        </button>
                    ) : (
                        <button className="btn-builder" onClick={next}>
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
