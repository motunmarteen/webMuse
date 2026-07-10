export const OG_ALT = "WEBMUSE — Where Ideas Become Digital Reality";
export const OG_SIZE = { width: 1200, height: 630 };

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#030303",
        backgroundImage:
          "radial-gradient(circle at 25% 20%, rgba(0,112,243,0.25), transparent 45%), radial-gradient(circle at 75% 80%, rgba(168,85,247,0.22), transparent 45%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 20,
            height: 20,
            borderRadius: 9999,
            background: "#0070f3",
          }}
        />
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#f4f4f5",
          }}
        >
          WEBMUSE
        </div>
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#f4f4f5",
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.15,
        }}
      >
        Where Ideas Become Digital Reality
      </div>
      <div
        style={{
          fontSize: 26,
          color: "#8e9196",
          marginTop: 24,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Software Engineering · AI · Web3 · Product Design
      </div>
    </div>
  );
}
