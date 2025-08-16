import React, {useState} from 'react';

/**
 * @typedef {{name: string; formId?:string; text: string; onChange: (val: any) => void; title?: string}} Props
 * @param {Props} props
 * @constructor
 */
export default function ParagraphEditable({name, formId, text, onChange, title}) {
    const [inputMode, setInputMode] = useState(false);

    const handleDoubleClick = () => setInputMode(true);

    const handleChange = (evt) => {
        onChange(evt.target.value);
    };
    const handleBlur = (evt) => {
        onChange(evt.target.value);
        setInputMode(false);
    };

    return (
        <>
            {!inputMode &&
                <span onDoubleClick={handleDoubleClick} className="can-update" title={title}>
                    {text}
                </span>
            }

            <input
                name={name}
                type={inputMode ? "text" : "hidden"}
                form={formId}
                defaultValue={text}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </>
    );
}
