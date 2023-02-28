import dayjs from 'dayjs';
import { z } from 'zod';
import FormBuilderTemplate, { FormBuilderConfig } from '../components/form-builder/FormBuilderTemplate';
import ProgressBar from '../components/form-builder/ProgressBar';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { useMultistepForm } from '../hooks/useMultiStep';

type genderOptions = 'Man' | 'Woman' | 'Prefer not to say';

interface CreateAccountBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: genderOptions;
    age: number;
    termsAgree: string;
    city: string;
    country: string;
}

const yesterday = dayjs().subtract(1, 'd');

const CREATE_ACCOUNT_FORM_CONFIG: FormBuilderConfig[][] = [
    [
        {
            label: 'First name',
            type: 'text',
            name: 'firstName',
            placeholder: 'Enter your first name',
            schema: z.string().min(2, 'First name must contain at least 2 characters'),
        },
        {
            label: 'Last name',
            type: 'text',
            name: 'lastName',
            placeholder: 'Enter your last name',
            schema: z.string().min(2, 'Last name must contain at least 2 characters'),
        },
        {
            label: 'Gender',
            type: 'radio',
            name: 'gender',
            placeholder: 'Enter your last name',
            options: { items: ['Man', 'Woman', 'Prefer not to say'], multiple: false },
        },
        {
            label: 'Date of birth',
            type: 'date',
            name: 'dateOfBirth',
            schema: z
                .date()
                .min(new Date('1900-01-01'), 'Date must be greater than 01/01/1900')
                .max(yesterday.toDate(), 'Date must be less than ' + yesterday.format('DD/MM/YYYY')),
        },
        {
            label: 'Age',
            type: 'number',
            name: 'age',
            placeholder: 'Enter your age',
            min: 18,
            max: 100,
            schema: z
                .number({ invalid_type_error: 'Age is required' })
                .min(18, 'Age must be greater or equal to 18')
                .max(100, 'Age must be less than or equal to 100'),
        },
        {
            label: 'I read terms and privacy policy',
            type: 'checkbox',
            name: 'termsAgree',
            schema: z.custom((data) => data === true, 'You must agree to terms and privacy'),
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
            optional: true,
        },
    ],
];

const titles = ['Create your account', 'Personal details', 'Residence details'];

export default function FormBuilder() {
    const [form, setForm, validateAll] = useFormBuilder<Record<keyof CreateAccountBody, { error: string; value: any }>>(
        {
            email: { value: '', error: '' },
            password: { value: '', error: '' },
            firstName: { value: '', error: '' },
            lastName: { value: '', error: '' },
            dateOfBirth: { value: '', error: '' },
            age: { value: '', error: '' },
            termsAgree: { value: false, error: '' },
            gender: { value: '', error: '' },
            city: { value: '', error: '' },
            country: { value: '', error: '' },
        },
    );

    const { steps, currentStepIndex, element, isFirstStep, isLastStep, back, next } = useMultistepForm(
        CREATE_ACCOUNT_FORM_CONFIG.map((config, k) => (
            <FormBuilderTemplate key={k} config={config} state={form} onChange={setForm} />
        )),
    );

    function submitFormHandler() {
        //
    }

    function continueHandler() {
        const validationResult = validateAll(CREATE_ACCOUNT_FORM_CONFIG[currentStepIndex]);
        if (validationResult) {
            next();
        }
    }

    console.log(form);

    return (
        <div className="relative m-auto flex min-h-screen flex-col items-center bg-[#ffeadb] py-4 xs:pt-10">
            <ProgressBar step={currentStepIndex} />
            <div className="relative m-4 flex w-11/12 max-w-md flex-col items-center bg-white py-6 px-2 shadow-m">
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
                        <button className="btn-builder" onClick={continueHandler}>
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
