import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import FormBuilderTemplate, { FormBuilderConfig } from '../components/form-builder/FormBuilderTemplate';
import ProgressBar from '../components/form-builder/ProgressBar';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { useMultistepForm } from '../hooks/useMultiStep';

type genderOptions = 'Man' | 'Woman' | 'Prefer not to say';
enum GenderOptionsEnum {
    Man = 'Man',
    Woman = 'Woman',
    Prefer_not_to_say = 'Prefer not to say',
}

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
            options: { items: Object.values(GenderOptionsEnum), multiple: false },
            schema: z.nativeEnum(GenderOptionsEnum, {
                // https://stackoverflow.com/questions/73557949/zod-error-handling-with-custom-error-messages-on-enums
                errorMap: (issue, _ctx) => {
                    switch (issue.code) {
                        case 'invalid_enum_value':
                            return { message: 'Gender is required' };
                        default:
                            return { message: 'Gender is required' };
                    }
                },
            }),
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
            schema: z.string().email(),
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
    const [pass, setPass] = useState<boolean>(false);

    const { form, setForm, validateAll, canContinue } = useFormBuilder<
        Record<keyof CreateAccountBody, { error: string; value: any }>
    >({
        firstName: { value: '', error: '' },
        lastName: { value: '', error: '' },
        gender: { value: '', error: '' },
        dateOfBirth: { value: '', error: '' },
        age: { value: '', error: '' },
        termsAgree: { value: false, error: '' },
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        city: { value: '', error: '' },
        country: { value: '', error: '' },
    });

    const { currentStepIndex, element, isFirstStep, isLastStep, back, next } = useMultistepForm(
        CREATE_ACCOUNT_FORM_CONFIG.map((config, k) => (
            <FormBuilderTemplate key={k} config={config} state={form} onChange={setForm} />
        )),
    );

    useEffect(() => {
        const result = canContinue(CREATE_ACCOUNT_FORM_CONFIG[currentStepIndex]);
        if (result !== pass) setPass(result);
    }, [canContinue, currentStepIndex, pass]);

    function continueHandler() {
        if (!pass) {
            validateAll(CREATE_ACCOUNT_FORM_CONFIG[currentStepIndex]);
        } else {
            next();
        }
    }

    console.log(pass, 'lol pass');

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
                        <button className="btn-builder" onClick={() => alert('submitted!')}>
                            Submit
                        </button>
                    ) : (
                        <button className={`btn-builder ${pass || 'disabled'}`} onClick={continueHandler}>
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
