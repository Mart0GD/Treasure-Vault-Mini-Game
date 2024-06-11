import { Mouse } from './Input/Mouse';
import { VaultLocked } from './Scenes/VaultLocked';
import { AssetLoader } from './core/AssetLoader';
import { SceneManager } from './core/SceneManager'

SceneManager.Initialize(1920,1080, 0x644d);
AssetLoader.Initialize();
Mouse.initialize();

const firstScene: VaultLocked = new VaultLocked();
SceneManager.changeScene(firstScene);
