import { useMDXComponent } from "next-contentlayer/hooks";
import { CodeBlock } from "~/components/mdx/Code";

const components = {
  pre: CodeBlock,
};

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
