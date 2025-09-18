import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadFull } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,
        background: {
          color: "transparent",
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 40,
            density: { enable: true, value_area: 800 },
          },
          color: { value: ["#ea5a19", "#fff", "#666"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.15,
            random: true,
            anim: { enable: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false },
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          links: {
            enable: true,
            distance: 120,
            color: "#fff",
            opacity: 0.08,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
} 