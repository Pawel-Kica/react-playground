import { ChangeEvent, useState } from 'react';

export type UseFormSetFunctionType = (e: ChangeEvent<HTMLInputElement>) => void;

export function useFormBuilder<T>(initialValues: T): [T, UseFormSetFunctionType] {
    const [values, _setValues] = useState(initialValues);

    function setValues(e: ChangeEvent<HTMLInputElement>) {
        _setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    return [values, setValues];
}
