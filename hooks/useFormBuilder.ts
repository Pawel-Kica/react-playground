import { ChangeEvent, HTMLInputTypeAttribute, useCallback, useState } from 'react';
import { ZodAny } from 'zod';
import { FormBuilderConfig } from './../components/form-builder/FormBuilderTemplate';

export type UseFormSetFunctionType = (e: ChangeEvent<HTMLInputElement>, schema?: ZodAny) => void;

export function useFormBuilder<T>(initialValues: T) {
    const [form, _setForm] = useState(initialValues);

    function validateAll(config: FormBuilderConfig[]) {
        let updatePayload: Record<string, any> = {};
        for (const key of config) {
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
        (config: FormBuilderConfig[]) => {
            for (const key of config) {
                const value = form[key.name].value;
                const error = validateSingle(value, key.type, key.schema);
                console.log(error, 'error', key.name);
                if (error) {
                    return false;
                }
            }
            return true;
        },
        [form],
    );

    function validateSingle(value: any, type: HTMLInputTypeAttribute, schema?: any) {
        if (!schema) return '';

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

    function setForm(e: ChangeEvent<HTMLInputElement>, schema: any) {
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

        _setForm((prev) => ({
            ...prev,
            [e.target.name]: { value: update_value, error },
        }));
    }

    return { form, setForm, validateAll, canContinue };
}
