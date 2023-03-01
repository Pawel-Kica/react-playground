import { ValueOf } from 'next/dist/shared/lib/constants';
import { useEffect, useState } from 'react';
import {
    CREATE_ACCOUNT_FORM_FIELDS,
    CREATE_ACCOUNT_FORM_TITLES,
    GenderOptionsEnum,
} from '../components/form-builder/config';
import FormBuilderTemplate from '../components/form-builder/FormBuilderTemplate';
import ProgressBar from '../components/form-builder/ProgressBar';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { useMultistepForm } from '../hooks/useMultiStep';

interface CreateAccountBody {
    // Step 1
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: GenderOptionsEnum;
    age: number;
    termsAgree: boolean;
    // Step 2
    email: string;
    password: string;
    phone: string;
    // Step 3
    city: string;
    country: string;
}
interface FormField {
    value: ValueOf<CreateAccountBody>;
    error: string;
}

export default function FormBuilder() {
    const [pass, setPass] = useState<boolean>(false);

    const { form, setForm, validateAll, canContinue } = useFormBuilder<Record<keyof CreateAccountBody, FormField>>({
        firstName: { value: '', error: '' },
        lastName: { value: '', error: '' },
        gender: { value: '', error: '' },
        dateOfBirth: { value: '', error: '' },
        age: { value: '', error: '' },
        termsAgree: { value: false, error: '' },
        email: { value: '', error: '' },
        password: { value: '', error: '' },
        phone: { value: '', error: '' },
        city: { value: '', error: '' },
        country: { value: '', error: '' },
    });

    const { currentStepIndex, element, isFirstStep, isLastStep, back, next } = useMultistepForm(
        CREATE_ACCOUNT_FORM_FIELDS.map((fields, k) => (
            <FormBuilderTemplate key={k} fields={fields} state={form} onChange={setForm} />
        )),
    );

    useEffect(() => {
        const result = canContinue(CREATE_ACCOUNT_FORM_FIELDS[currentStepIndex]);
        if (result !== pass) setPass(result);
    }, [canContinue, currentStepIndex, pass]);

    function continueHandler() {
        if (pass) return next();
        validateAll(CREATE_ACCOUNT_FORM_FIELDS[currentStepIndex]);
    }

    return (
        <div className="relative m-auto flex min-h-screen flex-col items-center bg-[#ffeadb] py-4 xs:pt-10">
            <ProgressBar step={currentStepIndex} />
            <div className="relative m-4 flex w-11/12 max-w-md flex-col items-center bg-white py-6 px-2 shadow-m">
                <div className="text-xl uppercase text-gray-m">{CREATE_ACCOUNT_FORM_TITLES[currentStepIndex]}</div>
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
