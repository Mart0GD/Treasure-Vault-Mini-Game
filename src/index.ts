//import { VaultLocked } from './Scenes/VaultLocked';
import { VaultUnlocked } from './Scenes/VaultUnlocked';
import { SceneManager } from './core/SceneManager'

SceneManager.Initialize(1920,1080, 0x644d);

//const firstScene: VaultLocked = new VaultLocked();
const secondScene: VaultUnlocked = new VaultUnlocked();
SceneManager.changeScene(secondScene);
