import { useMDXComponent } from "next-contentlayer/hooks";
import { CodeBlock } from "./Code";

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Component components={{
      code: CodeBlock,
    }}
    />
  );
}
