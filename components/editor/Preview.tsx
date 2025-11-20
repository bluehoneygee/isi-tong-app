import React from "react";
import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};
const Preview = ({ content }: { content: string }) => {
  const formattedContent = content.replace(/\\/g, "").replace(/&#x20;/g, "");

  return (
    <section className="markdown prose grid wrap-break-word">
      <MDXRemote
        source={formattedContent}
        components={{
          pre: (props) => (
            <Code
              {...props}
              lineNumbers
              className="shadow-[10px_10px_20px_0px_rgba(218_213_213_0.1)] dark:shadow-[2px_0px_20px_0px_rgba(39_36_36_0.04)]"
            />
          ),
        }}
      />
    </section>
  );
};

export default Preview;
