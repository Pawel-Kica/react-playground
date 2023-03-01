import { ChangeEvent, HTMLInputTypeAttribute, useCallback, useState } from 'react';
import { ZodAnyDef, ZodSchema } from 'zod';
import { FormBuilderField } from './../components/form-builder/FormBuilderTemplate';

export type UseFormSetFunctionType = (e: ChangeEvent<HTMLInputElement>, schema?: ZodSchema) => void;

export function useFormBuilder<T>(initialValues: T) {
    const [form, _setForm] = useState(initialValues);

    function validateAll(fields: FormBuilderField[]) {
        let updatePayload: Record<string, any> = {};
        for (const key of fields) {
            const value = form[key.name].value;
            const error = validateSingle(value, key.type, key.schema);
            if (error) {
                updatePayload[key.name] = { value, error };
            }
        }
        if (Object.keys(updatePayload).length) {
            _setForm((prev) => ({ ...prev, ...updatePayload }));
            return false;
        }
        return true;
    }

    const canContinue = useCallback(
        (fields: FormBuilderField[]) => {
            for (const key of fields) {
                const value = form[key.name].value;
                const error = validateSingle(value, key.type, key.schema);
                if (error) {
                    return false;
                }
            }
            return true;
        },
        [form],
    );

    function validateSingle(value: any, type: HTMLInputTypeAttribute, schema?: ZodAnyDef) {
        if (!schema) return '';

        switch (type) {
            case 'date':
                value = new Date(value);
                break;
            default:
                break;
        }
        const result = schema.safeParse(value);
        if (result.success) return '';

        return result.error.issues[0].message;
    }

    function setForm(e: ChangeEvent<HTMLInputElement>, schema?: any) {
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
        const error = validateSingle(update_value, e.target.type, schema);

        _setForm((prev) => ({
            ...prev,
            [e.target.name]: { value: update_value, error },
        }));
    }

    return { form, setForm, validateAll, canContinue };
}
