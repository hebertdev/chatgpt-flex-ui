export function Loader() {
  return (
    <section style={{ flex: "1 1 25%" }}>
      <div
        style={{
          width: "60px",
          margin: "auto",
          textAlign: "center",
          marginTop: "5px",
        }}
        className="sk-three-bounce"
      >
        <div
          style={{
            width: "0.8em",
            height: "0.8em",
            backgroundColor: "#75ab9d",
            borderRadius: "100%",
            display: "inline-block",
            animation: "sk-three-bounce 1.4s ease-in-out 0s infinite both",
          }}
          className="sk-child sk-bounce-1"
        ></div>
        <div
          style={{
            width: "0.8em",
            height: "0.8em",
            backgroundColor: "#75ab9d",
            borderRadius: "100%",
            display: "inline-block",
            animation: "sk-three-bounce 1.4s ease-in-out 0s infinite both",
            animationDelay: "-0.32s",
          }}
          className="sk-child sk-bounce-2"
        ></div>
        <div
          style={{
            width: "0.8em",
            height: "0.8em",
            backgroundColor: "#75ab9d",
            borderRadius: "100%",
            display: "inline-block",
            animation: "sk-three-bounce 1.4s ease-in-out 0s infinite both",
            animationDelay: "-0.16s",
          }}
          className="sk-child sk-bounce-3"
        ></div>
      </div>
      <style>{`
              @keyframes sk-three-bounce {
                0%, 80%, 100% {
                  transform: scale(0);
                }
                40% {
                  transform: scale(1.0);
                }
              }
            `}</style>
    </section>
  );
}
