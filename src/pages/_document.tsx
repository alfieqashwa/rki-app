import Document, { Head, Html, Main, NextScript } from "next/document";
import { fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";

export default class _Document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <Main />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextScript />
        </body>
      </Html>
    );
  }
}
