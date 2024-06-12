import { Assets} from 'pixi.js';

type Asset = {
    name: string;
    url: string;
    ext: string;
    category: string;
    group: string;
}

const assetUrls: string[] =
    [
        `static/VaultLocked/Images/bg.png`,
        'static/VaultLocked/Images/door.png',
        'static/VaultLocked/Images/handle.png',
        'static/VaultLocked/Images/handleShadow.png',
        'static/VaultOpen/Images/doorOpen.png',
        'static/VaultOpen/Images/doorOpenShadow.png',
        'static/VaultOpen/Images/blink.png'
    ]

export class AssetLoader {
    private static manifest: Asset[] = [];

    public static Initialize(){
        this.manifest = this.generateManifest();
    }

    private static generateManifest(): Asset[] {
        const assetsManifest: Asset[] = [];
        const assetPathRegexp = /static\/(?<group>[\w.-]+)\/(?<category>[\w.-]+)\/(?<name>[\w.-]+)\.(?<ext>\w+)$/;

        assetUrls.forEach((path) => {
            const match = assetPathRegexp.exec(path);
            
            if (!match || !match.groups) {
                return console.error(
                    `Invalid asset path: ${path}, should match ${assetPathRegexp}`
                );
            }

            const { group, category, name, ext } = match.groups;

            if (category === "spritesheets" && ext !== "json") {
                return;
            }

            if (category === "spine" && ext !== "json" && ext !== "skel") {
                return;
            }

            assetsManifest.push({
                group,
                category,
                name,
                ext,
                url: path.replace(/.*static/, ""),
            });
        })

        return assetsManifest;
    }

    public static async loadAssetsGroup(group: string) {
        const sceneAssets = AssetLoader.manifest.filter((asset) => asset.group === group);

        for (const asset of sceneAssets) {
            Assets.add(asset.name, asset.url);
        }

        const resources = await Assets.load(sceneAssets.map((asset) => asset.name));

        return resources;
    }

}
