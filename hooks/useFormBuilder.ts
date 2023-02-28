import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import { ZodAny } from 'zod';
import { FormBuilderConfig } from './../components/form-builder/FormBuilderTemplate';

export type UseFormSetFunctionType = (e: ChangeEvent<HTMLInputElement>, schema?: ZodAny) => void;

export function useFormBuilder<T>(initialValues: T): [T, UseFormSetFunctionType, any] {
    const [values, _setValues] = useState(initialValues);

    function validateAll(config: FormBuilderConfig[]) {
        let updatePayload: Record<string, any> = {};
        for (const key of config) {
            //@ts-ignore
            const value = values[key.name].value;
            const error = validateSingle(value, key.type, key.schema);
            if (error) {
                updatePayload[key.name] = { value, error };
            }
        }
        console.log(updatePayload, 'paylooooad');
        if (Object.keys(updatePayload).length) {
            _setValues((prev) => ({ ...prev, ...updatePayload }));
            return false;
        }
        return true;
    }

    function validateSingle(value: any, type: HTMLInputTypeAttribute, schema?: any) {
        if (schema) {
            switch (type) {
                case 'date':
                    value = new Date(value);
                    break;
                default:
                    break;
            }
            const result = schema.safeParse(value);
            if (!result.success) {
                return result.error.issues[0].message;
            }
        }
    }

    function setValues(e, schema) {
        let error = '';
        let update_value: any = e.target.value;

        switch (e.target.type) {
            case 'checkbox':
                update_value = e.target.checked;
                break;
            case 'number':
                update_value = parseFloat(e.target.value);
            default:
                break;
        }
        error = validateSingle(update_value, e.target.type, schema);

        _setValues((prev) => ({
            ...prev,
            [e.target.name]: { value: update_value, error },
        }));
    }

    return [values, setValues, validateAll];
}
