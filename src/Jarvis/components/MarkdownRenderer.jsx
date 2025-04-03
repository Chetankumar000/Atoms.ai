import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import CodeBlock from "./CodeBlock";

export const MarkdownRenderer = ({ text }) => (
  <ReactMarkdown
    children={text}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight]}
    components={{
      // Headings are rendered with specific styling.
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold text-white mt-4 mb-2">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-semibold text-white mt-3 mb-2">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-medium text-white mt-2 mb-1">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-medium text-white mt-2 mb-1">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-md font-semibold text-white mt-1 mb-1">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="text-sm font-semibold text-white mt-1 mb-1">
          {children}
        </h6>
      ),
      // Paragraphs with normal text.
      p: ({ children }) => (
        <p className="text-lg text-gray-200 leading-relaxed">{children}</p>
      ),
      strong: ({ children }) => (
        <strong className="text-lg font-bold text-white">{children}</strong>
      ),
      li: ({ children }) => (
        <li className="ml-6 list-disc text-lg text-gray-200 mb-1">
          {children}
        </li>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-300 my-2 text-sm">
          {children}
        </blockquote>
      ),
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline"
        >
          {children}
        </a>
      ),
      img: ({ src, alt }) => (
        <img src={src} alt={alt} className="max-w-full h-auto rounded my-2" />
      ),
      // Code element handling.
      code({ node, className, children, ...props }) {
        const isInline = !className;

        return isInline ? (
          <code className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
            {children}
          </code>
        ) : (
          <CodeBlock className={className} children={children} props={props} />
        );
      },

      // Tables and other elements.
      table: ({ children }) => (
        <table className="table-auto border-collapse w-full text-left text-sm text-gray-200 my-4">
          {children}
        </table>
      ),
      thead: ({ children }) => (
        <thead className="bg-gray-700 font-semibold">{children}</thead>
      ),
      tbody: ({ children }) => <tbody>{children}</tbody>,
      tr: ({ children }) => (
        <tr className="border-b border-gray-600">{children}</tr>
      ),
      th: ({ children }) => <th className="p-2">{children}</th>,
      td: ({ children }) => <td className="p-2">{children}</td>,
    }}
  />
);
