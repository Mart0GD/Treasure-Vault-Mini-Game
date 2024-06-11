import { VaultLocked } from './Scenes/VaultLocked';
import { AssetLoader } from './core/AssetLoader';
import { SceneManager } from './core/SceneManager'

SceneManager.Initialize(window.outerWidth,window.outerHeight, 0x64224d);
AssetLoader.Initialize();

const firstScene: VaultLocked = new VaultLocked();
SceneManager.changeScene(firstScene);

