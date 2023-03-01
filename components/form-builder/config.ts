import dayjs from 'dayjs';
import { z } from 'zod';
import { FormBuilderField } from './FormBuilderTemplate';

export enum GenderOptionsEnum {
    Man = 'Man',
    Woman = 'Woman',
    Prefer_not_to_say = 'Prefer not to say',
}

const yesterday = dayjs().subtract(1, 'd');

export const CREATE_ACCOUNT_FORM_FIELDS: FormBuilderField[][] = [
    [
        {
            label: 'First name',
            type: 'text',
            name: 'firstName',
            placeholder: 'Enter your first name',
            schema: z.string().min(2, 'First name must contain at least 2 characters'),
        },
        {
            label: 'Last name (optional)',
            type: 'text',
            name: 'lastName',
            placeholder: 'Enter your last name',
            optional: true,
            // schema: z.string().min(2, 'Last name must contain at least 2 characters'),
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
            schema: z.string().min(8, 'Password must contain at least 2 characters'),
        },
        {
            label: 'Phone number',
            type: 'phone',
            name: 'phone',
            placeholder: 'XXX-YYY-ZZZ',
            schema: z.string().regex(new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/), 'Required format: XXX-YYY-ZZZ'), // Normal regex
            // .regex(new RegExp(/^\d{3}-\d{3}-\d{3}$/), 'Phone number must be in format xxx-yyy-zzz'), // Fancy regex
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

export const CREATE_ACCOUNT_FORM_TITLES = ['Create your account', 'Personal details', 'Residence details'];
