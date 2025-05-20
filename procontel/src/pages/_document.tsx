import Document, { Html, Head, Main, NextScript, type DocumentContext } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Procontel SB - Soluciones de facturación electrónica" />
          <meta name="theme-color" content="#2563eb" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2563eb" />
          <meta name="msapplication-tap-highlight" content="no" />
          <link rel="canonical" href="https://procontel-sb.vercel.app" />
          <base href="/" />

          {/* PWA manifest */}
          <link rel="manifest" href="/manifest.json" />

          {/* Apple touch icons */}
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="167x167" href="/favicon.ico" />

          {/* Preconnect to domains */}
          <link rel="preconnect" href="https://via.placeholder.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.youtube.com" />
          <link rel="preconnect" href="https://i.ytimg.com" />

          {/* Optimized font loading */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Social media meta tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://procontel-sb.vercel.app" />
          <meta property="og:title" content="Procontel SB - Soluciones de Facturación Electrónica" />
          <meta property="og:description" content="Soluciones de facturación electrónica para empresas en Colombia" />
          <meta property="og:image" content="https://via.placeholder.com/1200x630?text=Procontel+SB" />

          {/* Twitter meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://procontel-sb.vercel.app" />
          <meta name="twitter:title" content="Procontel SB - Soluciones de Facturación Electrónica" />
          <meta name="twitter:description" content="Soluciones de facturación electrónica para empresas en Colombia" />
          <meta name="twitter:image" content="https://via.placeholder.com/1200x630?text=Procontel+SB" />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Service Worker Registration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(
                      function(registration) {
                        console.log('Service Worker registration successful with scope: ', registration.scope);
                      },
                      function(err) {
                        console.log('Service Worker registration failed: ', err);
                      }
                    );
                  });
                }
              `,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
