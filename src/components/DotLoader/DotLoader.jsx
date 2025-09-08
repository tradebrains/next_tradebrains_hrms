import React from "react";

function DotLoader({ loaderData }) {
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        width: "100%",
        height: loaderData ? "25vh" : "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222323",
      }}
    >
      <script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
      ></script>

      <dotlottie-player
        src="https://lottie.host/e9306afb-fcb3-4acf-a8fd-43f5135f803f/P6515YnbYr.json"
        background="transparent"
        speed="1"
        style={{
          width: "500px",
          height: loaderData ? "250px" : "500px",
          direction: "1",
          playMode: "normal",
        }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
}

export default DotLoader;
