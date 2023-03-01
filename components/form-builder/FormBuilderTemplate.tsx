import { HTMLInputTypeAttribute, useId } from 'react';
import { ZodSchema } from 'zod';
import { UseFormSetFunctionType } from '../../hooks/useFormBuilder';

export interface FormBuilderField {
    type: HTMLInputTypeAttribute;
    name: string;
    placeholder?: string;
    label?: string;
    // Zod any type
    schema?: ZodSchema;
    // Use optional instead of required (default required true), because optional parameter rarely occurs
    optional?: boolean;
    // Number
    min?: number;
    max?: number;
    // Radio
    options?: { items: string[]; multiple: boolean };
}

export default function FormBuilderTemplate({
    fields,
    state,
    onChange,
}: {
    fields: FormBuilderField[];
    state: Record<string, any>;
    onChange: UseFormSetFunctionType;
}) {
    const id = useId();
    return (
        <div className="w-full p-4">
            {fields.map((el, k) => {
                const key = id + '-' + k;
                const label = el.label || el.name.charAt(0).toUpperCase() + el.name.slice(1);

                let radioInput;
                if (el.type === 'radio') {
                    if (!el.options) return <></>;
                    radioInput = el.options.items.map((e) => (
                        <div key={key + e} className="flex items-center gap-2">
                            <input
                                id={key + e}
                                className="peer absolute h-4 w-4"
                                name={el.name}
                                type="radio"
                                value={e}
                                onChange={onChange}
                                checked={state[el.name].value === e}
                            />
                            <span className="pointer-events-none z-10 inline-block h-4 w-4 rounded-full peer-checked:bg-orange-m"></span>
                            <label className="hover:cursor-pointer" htmlFor={key + e}>
                                {e}
                            </label>
                        </div>
                    ));
                }
                const error = state[el.name].error;

                return (
                    <div key={key}>
                        <div className={`my-2 flex flex-col input-${el.type}`}>
                            <label className="hover:cursor-pointer" htmlFor={key}>
                                {label}
                            </label>
                            {radioInput || (
                                <input
                                    className="mt-1 w-full border-1 border-gray-400 py-3 px-2 focus:outline-cyan-m"
                                    id={key}
                                    type={el.type}
                                    placeholder={el.placeholder}
                                    name={el.name}
                                    onChange={(e) => onChange(e, el.schema)}
                                    value={state[el.name].value}
                                    required={!el.optional}
                                    min={el.min}
                                    max={el.max}
                                    checked={state[el.name].value}
                                />
                            )}
                        </div>
                        {error && <div className="error-message text-xs font-semibold text-red-700">{error}</div>}
                    </div>
                );
            })}
        </div>
    );
}
