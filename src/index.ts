/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./style.css";
import "@pixi/spine-pixi";
import { Spine } from "@pixi/spine-pixi";
import { Application, Assets, Container, Sprite, Texture } from "pixi.js";

const app = new Application();
app.init({
    width: 1920,
    height: 1080,
    preference: "webgl",
    backgroundColor: 0x000000,
    backgroundAlpha: 0,
}).then(async () => {
    document.body.appendChild(app.canvas);
    //@ts-ignore
    globalThis.__PIXI_APP__ = app;

    await loadGameAssets();

    const spine = Spine.from({ skeleton: "characterData", atlas: "characterAtlas", scale: 1 });
    spine.position.set(750, 750);
    spine.state.setAnimation(0, "walk", true);

    const blueBunny = new Sprite(Texture.from("bunnyBlue"));
    blueBunny.position.set(450, 333);
    const greenBunny = new Sprite(Texture.from("bunnyGreen"));

    const slotName = spine.skeleton.findSlot("mouth")?.data.name;
    const container = new Container();
    const anotherContainer = new Container();
    anotherContainer.addChild(greenBunny);

    if (slotName) {
        spine.addSlotObject(slotName, container.addChild(anotherContainer));
    }

    const yetAnotherContainer = new Container();
    yetAnotherContainer.addChild(blueBunny);

    blueBunny.cursor = "pointer";
    blueBunny.eventMode = "static";
    blueBunny.on("pointertap", () => {
        console.log("i can interact with the blue bunny");
    });

    greenBunny.cursor = "pointer";
    greenBunny.eventMode = "static";
    greenBunny.on("pointertap", () => {
        console.log("i can't interact with the green bunny");
    });

    app.stage.addChild(spine);
    app.stage.addChild(yetAnotherContainer);
});

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "bundle",
                assets: [
                    {
                        alias: "characterData",
                        src: "./assets/spineboy-pro.json",
                    },
                    {
                        alias: "characterAtlas",
                        src: "./assets/spineboy-pro.atlas",
                    },
                    {
                        alias: "bunnyBlue",
                        src: "./assets/bunny_blue.png",
                    },
                    {
                        alias: "bunnyGreen",
                        src: "./assets/bunny_green.png",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.load(["characterData", "characterAtlas", "bunnyBlue", "bunnyGreen"]);
}
