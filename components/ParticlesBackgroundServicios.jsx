import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadFull } from "@tsparticles/engine";

export default function ParticlesBackgroundServicios() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-servicios"
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
            value: 120,
            density: { enable: true, value_area: 800 },
          },
          color: { value: ["#ea5a19", "#fff"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false },
          },
          size: {
            value: 3.5,
            random: true,
            anim: { enable: false },
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          links: {
            enable: true,
            distance: 130,
            color: "#ea5a19",
            opacity: 0.18,
            width: 1.2,
          },
        },
        detectRetina: true,
      }}
    />
  );
} 