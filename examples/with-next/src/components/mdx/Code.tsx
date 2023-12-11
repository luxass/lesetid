type HTMLCodeElement = HTMLElement;

export type CodeBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLCodeElement>,
  HTMLCodeElement
>;

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  return (
    <code
      className="rounded text-sm [letter-spacing:-0.02em] before:font-black before:text-blue-600 after:font-black after:text-blue-600"
      {...props}
    >
      {children}
    </code>
  );
}
