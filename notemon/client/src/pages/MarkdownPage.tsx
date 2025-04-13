// src/pages/MarkdownPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
const base_url = import.meta.env.SERVER_URL || "http://localhost:5174";
export default function MarkdownPage() {
    const { file } = useParams();
    const [content, setContent] = useState<string>('Loading...');

    useEffect(() => {
        fetch(`${base_url}/md/file`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ path: file?.toString() })
        })
            .then(res => res.text())
            .then((txt) => setContent(txt))
            .catch(() => setContent('# 404\nFile not found.'));
    }, [file]);
    
    return (
        <div className="markdown-body">
            <div className='file-header'>
                {file}
            </div>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
