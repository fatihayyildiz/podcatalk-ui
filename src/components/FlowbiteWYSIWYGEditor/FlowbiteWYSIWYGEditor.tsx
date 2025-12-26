'use client';

import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

type FlowbiteWYSIWYGEditorProps = {
    value?: string;
    onChange?: (content: string) => void;
};

export const FlowbiteWYSIWYGEditor = ({ value, onChange }: FlowbiteWYSIWYGEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        
        if (!editorRef.current || quillRef.current) return;

        console.log('Initializing Quill editor');

        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    [{ direction: 'rtl' }],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ align: [] }],
                    ['link', 'image', 'video'],
                    ['clean'],
                ],
            },
        });

        console.log('Quill editor initialized/n', quill.container.textContent);

        if (value) {
            quill.root.innerText = value;
        }

        quill.on('text-change', () => {
            onChange?.(quill.root.innerText);
        });

        quillRef.current = quill;
    }, [value]);

    return (
        <div className="bg-white rounded-md shadow-md p-4 min-h-[500px]">
            {/* Only one editor container, ensure it's stable */}
            <div ref={editorRef} className="min-h-[150px] max-h-[390px] text-black" />
        </div>
    );
};