import Link from "next/link";

const localeRedirect = `(function () {
  var lang = (navigator.language || "en").toLowerCase();
  var target = lang.indexOf("es") === 0 ? "/es" : "/en";
  window.location.replace(target + window.location.hash);
})();`;

// output: "export" cannot emit a server redirect for "/", so this page ships
// real HTML: a language-aware client redirect plus visible links as fallback.
export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: localeRedirect }} />
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/en" />
      </noscript>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <Link href="/en">English</Link>
        <span aria-hidden="true">·</span>
        <Link href="/es">Español</Link>
      </main>
    </>
  );
}
