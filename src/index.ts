/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./style.css";
import "@pixi/spine-pixi";
import { Spine } from "@pixi/spine-pixi";
import { Application, Assets } from "pixi.js";

const gameWidth = 1280;
const gameHeight = 720;

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com %c❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    "color: #ff66a1;",
);

const app = new Application();
app.init({
    width: gameWidth,
    height: gameHeight,
    preference: "webgl",
    backgroundColor: 0xd3d3d3,
}).then(async () => {
    document.body.appendChild(app.canvas);
    //@ts-ignore
    globalThis.__PIXI_APP__ = app;

    resizeCanvas();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stage = app.stage as any;

    await loadGameAssets();

    // Assets.add({
    //     alias: "boss_skel",
    //     src: "./assets/character@1.5x.json",
    // });
    // Assets.add({
    //     alias: "boss_atlas",
    //     src: "./assets/character@1.5x.atlas",
    // });

    // await Assets.load(["boss_skel", "boss_atlas"]);

    const sp = Spine.from({
        skeleton: "character_skeleton",
        atlas: "character_atlas",
    });

    sp.position.set(850, 330);
    sp.scale.set(0.75);
    sp.state.setAnimation(0, "fs_hit", true);
    stage.addChild(sp);
});

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "pixie",
                assets: [
                    {
                        alias: "character_skeleton",
                        src: "./assets/character@1.5x.json",
                    },
                    {
                        alias: "character_atlas",
                        src: "./assets/character@1.5x.atlas",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.load(["character_skeleton", "character_atlas"]);
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
