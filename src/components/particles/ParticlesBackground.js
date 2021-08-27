import React from "react";
import Particles from "react-tsparticles";

const ParticlesBackground = () => {
    const particleStyledOption = {
        background: {
            color: {
                value: "#ffffff",
            },
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "repulse",
                },
                onHover: {
                    enable: true,
                    mode: "bubble",
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    duration: 1,
                    opacity: 0.5,
                    size: 10,
                    color: "#888888",
                },
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.25,
                },
            },
        },
        particles: {
            color: {
                value: "#000000",
            },
            links: {
                color: "#000000",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 0.5,
                straight: true,
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800,
                },
                value: 150,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                random: true,
                value: 5,
            },
        },
        detectRetina: true,
    };
    return (
        <Particles
            className="particles-background"
            options={particleStyledOption}
            width="100vw"
            height="100vh"
        ></Particles>
    );
};

export default ParticlesBackground;
