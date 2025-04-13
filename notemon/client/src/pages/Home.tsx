// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const base_url = import.meta.env.VITE_SERVER_URL || "http://localhost:8081";
type MarkdownFile = {
    name: string;
    path: string;
};

export default function Home() {
    const [files, setFiles] = useState<MarkdownFile[]>([]);

    useEffect(() => {
        fetch(base_url + '/md/getDirectory')
            .then(res => res.json())
            .then(data => setFiles(data))
            .catch(err => console.error('Failed to fetch file list:', err));
    }, []);

    return (
        <div className="home">
            <h1>Notemon Server</h1>
            <ul>
                {files.map(file => (
                    <li key={file.path}>
                        <Link to={`/${encodeURIComponent(file.path)}`}>{file.path}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
