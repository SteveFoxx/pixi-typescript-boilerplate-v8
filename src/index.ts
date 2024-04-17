import "./style.css";
import "@pixi/spine-pixi";
import { Spine } from "@pixi/spine-pixi";
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

    // const spine = getSpine("running", "pixie_skeleton", "pixie_atlas");

    const sp = Spine.from({
        skeleton: "pixie_skeleton",
        atlas: "pixie_atlas",
        scale: 1,
    });

    sp.state.setAnimation(0, "running");
    console.log(await Assets.get("pixie_skeleton"));
    console.log(await Assets.get("pixie_atlas"));

    app.stage.addChild(sp);

    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "pixie",
                assets: [
                    {
                        alias: "pixie_skeleton",
                        src: "./assets/spine-assets/pixie.json",
                    },
                    {
                        alias: "pixie_atlas",
                        src: "./assets/spine-assets/pixie.atlas",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.load(["pixie_skeleton", "pixie_atlas"]);
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
