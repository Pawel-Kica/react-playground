import FormBuilderTemplate from './FormBuilderTemplate';

const CREATE_ACCOUNT_FORM_CONFIG = {
    STEP_1: [
        {
            label: 'First name',
            type: 'text',
            name: 'firstName',
            placeholder: 'Enter your first name',
            required: true,
        },
        {
            label: 'Last name',
            type: 'text',
            name: 'lastName',
            placeholder: 'Enter your password',
            required: true,
        },
    ],
    STEP_2: [
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
};

export function FormBuilderStep1({ form, setForm }) {
    return (
        <>
            <FormBuilderTemplate
                config={CREATE_ACCOUNT_FORM_CONFIG.STEP_1}
                state={form}
                onChange={setForm}
                title="123"
            />
        </>
    );
}
