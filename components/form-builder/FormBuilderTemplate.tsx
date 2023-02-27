import { HTMLInputTypeAttribute, useId } from 'react';
import { UseFormSetFunctionType } from '../../hooks/useFormBuilder';

export interface FormBuilderConfig {
    type: HTMLInputTypeAttribute;
    name: string;
    placeholder?: string;
    label?: string;
    // Use optional instead of required (default required true), because optional parameter rarely occurs
    optional?: boolean;
    options?: { items: string[]; multiple: boolean };
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
            {config.map((el, k) => {
                const key = id + '-' + k;
                const label = el.label || el.name.charAt(0).toUpperCase() + el.name.slice(1);

                let radioInput;
                if (el.type === 'radio' && el.options) {
                    radioInput = el.options.items.map((e) => (
                        <div key={e} className="flex items-center gap-2">
                            <input
                                className="peer absolute h-4 w-4"
                                name={el.name}
                                key={e}
                                type="radio"
                                value={e}
                                onChange={onChange}
                            />
                            <span className="pointer-events-none z-10 inline-block h-4 w-4 rounded-full peer-checked:bg-orange-m"></span>
                            <label className="hover:cursor-pointer" htmlFor={key}>
                                {e}
                            </label>
                        </div>
                    ));
                }

                return (
                    <div key={el.name} className="my-2 flex flex-col">
                        <label className="hover:cursor-pointer" htmlFor={key}>
                            {label}
                        </label>
                        {radioInput || (
                            <input
                                className="mt-1 w-64 border-1 border-gray-400 py-3 px-2 focus:outline-cyan-m"
                                id={key}
                                type={el.type}
                                placeholder={el.placeholder}
                                name={el.name}
                                onChange={onChange}
                                value={state[el.name]}
                                required={!el.optional}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
