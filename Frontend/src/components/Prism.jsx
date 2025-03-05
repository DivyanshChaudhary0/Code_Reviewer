import React, { useEffect, useState } from "react";
import Prism from "prismjs"; // Import Prism correctly
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript"; // Ensure JS language support
import Editor from "react-simple-code-editor";

const EditablePrismEditor = () => {
    const [code, setCode] = useState(`
const add = (a, b) => {
    return a + b;
};
`);

    useEffect(() => {
        Prism.highlightAll(); // Ensure Prism is applied after each update
    }, [code]);

    return (
        <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            className="w-full h-full border border-gray-300 rounded text-white bg-gray-900"
            style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14
            }}
        />
    );
};

export default EditablePrismEditor;
