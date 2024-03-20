import "./style.css";
import { Application, Assets } from "pixi.js";

const gameWidth = 1280;
const gameHeight = 720;

console.log(
    `%cPixiJS V7\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    "color: #ff66a1;",
);

const app = new Application();
app.init({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.canvas);

    resizeCanvas();

    console.log(await Assets.get("pixie"));
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "pixie",
                assets: [
                    {
                        alias: "pixie",
                        src: "./assets/spine-assets/pixie.json",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.load("pixie");
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}
