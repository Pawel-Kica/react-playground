import { HTMLInputTypeAttribute, useId } from 'react';
import { UseFormSetFunctionType } from '../../hooks/useFormBuilder';

export interface FormBuilderConfig {
    type: HTMLInputTypeAttribute;
    name: string;
    placeholder: string;
    // Optional
    optional?: boolean;
    label?: string;
}

export default function FormBuilderTemplate({
    config,
    state,
    onChange,
}: {
    config: FormBuilderConfig[];
    state: Record<string, any>;
    onChange: UseFormSetFunctionType;
}) {
    const id = useId();
    return (
        <div className="p-4">
            {config.map((el) => {
                const key = id + '-' + el.name;
                const label = el.label || el.name.charAt(0).toUpperCase() + el.name.slice(1);
                return (
                    <div key={el.name}>
                        <label htmlFor={key}>{label}</label>
                        <input
                            id={key}
                            type={el.type}
                            placeholder={el.placeholder}
                            name={el.name}
                            onChange={onChange}
                            value={state[el.name]}
                        />
                    </div>
                );
            })}
        </div>
    );
}
