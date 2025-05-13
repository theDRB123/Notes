import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const base_url = import.meta.env.VITE_SERVER_URL || "http://localhost:8081";

export default function MarkdownPage() {
    const { file } = useParams();
    const [content, setContent] = useState<string>('Loading...');

    useEffect(() => {
        fetch(`${base_url}/md/file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ path: file?.toString() })
        })
            .then(res => res.text())
            .then(txt => {
                const processed = txt.replace(/!\[\[(.*?)\]\]/g, '![]($1)');
                setContent(processed);
            })
            .catch(() => setContent('# 404\nFile not found.'));
    }, [file])


    const renderers = {
        img: ({ node, ...props }: any) => {
            const encodedSrc = props.src ? encodeURIComponent(props.src) : '';
            return (
                <img
                    {...props}
                    src={`${base_url}/img/${encodedSrc}`}
                    alt={props.alt}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = '/path/to/placeholder.png';
                    }}
                />
            );
        }
    }; 

    return (
        <div className="markdown-body">
            <div className='file-header'>{file}</div>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={renderers}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
