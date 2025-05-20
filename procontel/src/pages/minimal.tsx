export default function MinimalPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Procontel SB</h1>
      <p>Minimal page loaded successfully</p>
      <p>
        <a href="/" style={{ color: "blue", marginRight: "15px" }}>
          Home
        </a>
        <a href="/test" style={{ color: "blue" }}>
          Test Page
        </a>
      </p>
    </div>
  )
}
