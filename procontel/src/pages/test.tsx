import Head from "next/head"
import Link from "next/link"

export default function TestPage() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Head>
        <title>Test Page - Procontel SB</title>
      </Head>

      <h1>Test Page</h1>
      <p>If you can see this page, routing is working correctly!</p>

      <div style={{ marginTop: "20px" }}>
        <Link href="/">
          <a style={{ color: "blue", textDecoration: "underline" }}>Go back to home page</a>
        </Link>
      </div>
    </div>
  )
}
