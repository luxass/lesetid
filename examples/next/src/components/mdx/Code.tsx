type HTMLCodeElement = HTMLElement;

export type CodeBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLCodeElement>,
  HTMLCodeElement
>;

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  return (
    <code
      className="[letter-spacing:-0.02em] rounded text-sm after:font-black before:font-black after:text-blue-600 before:text-blue-600"
      {...props}
    >
      {children}
    </code>
  );
}
