import InputEngine from "./InputEngine"
import PhysicsEngine from "./PhysicsEngine"
import PlayerEngine from "./PlayerEngine"
import RenderEngine from "./RenderEngine"
import SoundEngine from "./SoundEngine"
import SwingEngine from "./SwingEngine"
import AssetLoaderEngine from "./AssetLoaderEngine";
import PlacerEngine from "./PlacerEngine";

export const engines = {
    renderEngine: new RenderEngine(),
    physicEngine: new PhysicsEngine(),
    playerEngine: new PlayerEngine(),
    swingEngine: new SwingEngine(),
    inputEngine: new InputEngine(),
    assetEngine: new AssetLoaderEngine(),
    placerEngine: new PlacerEngine()
    // soundEngine: new SoundEngine()
}