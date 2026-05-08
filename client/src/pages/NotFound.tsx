import { useLocation } from "wouter";
import { WREN_STILLS, LOGOS } from "../assets";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "oklch(0.16 0.04 255)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.78 0.16 65 / 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <a href="/" style={{ marginBottom: "3rem", position: "relative", zIndex: 1 }}>
        <img src={LOGOS.stackedDark} alt="Continuary" style={{ height: "2rem" }} />
      </a>

      {/* Wren peeking */}
      <img
        src={WREN_STILLS.peekSide}
        alt="Wren looking curious"
        style={{
          width: "200px",
          filter: "drop-shadow(0 0 40px oklch(0.78 0.16 65 / 0.4))",
          marginBottom: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      />

      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        fontWeight: 700,
        color: "oklch(0.96 0.02 80)",
        marginBottom: "1rem",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        Wren can't find this page.
      </h1>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "1.0625rem",
        color: "oklch(0.65 0.02 80)",
        marginBottom: "2.5rem",
        textAlign: "center",
        maxWidth: "400px",
        lineHeight: 1.7,
        position: "relative",
        zIndex: 1,
      }}>
        The page you're looking for doesn't exist — but your story is still here.
      </p>

      <button
        onClick={() => setLocation("/")}
        className="btn-amber"
        style={{ position: "relative", zIndex: 1 }}
      >
        Back to Continuary
      </button>
    </div>
  );
}
