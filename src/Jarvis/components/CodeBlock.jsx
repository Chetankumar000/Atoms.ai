import { useState, useRef } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const CodeBlock = ({ className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative max-w-[46rem] my-4">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-500 transition-colors"
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <FaClipboardCheck size={20} /> : <FaClipboard size={20} />}
      </button>

      {/* Code Block */}
      <pre className="bg-gray-900 text-white p-2 rounded text-sm">
        <code ref={codeRef} className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
