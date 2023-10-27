export type CodeBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  raw?: string
};

export function CodeBlock({ children, raw, ...props }: CodeBlockProps) {
  return (
    <div className="codeblock">
      <pre
        className="[tab-size:2] overflow-x-auto rounded p-4 text-sm [&code]:text-base [&code]:after:content-none [&code]:before:content-none [letter-spacing:unset]"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
