import { VaultLocked } from './Scenes/VaultLocked';
import { SceneManager } from './core/SceneManager'

SceneManager.Initialize(1920,1080, 0x644d);

const firstScene: VaultLocked = new VaultLocked();
SceneManager.changeScene(firstScene);
