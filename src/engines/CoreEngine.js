import InputEngine from "./InputEngine"
import PhysicEngine from "./PhysicEngine"
import PlayerEngine from "./PlayerEngine"
import RenderEngine from "./RenderEngine"
import SoundEngine from "./SoundEngine"
import SwingEngine from "./SwingEngine"

export const engines = {
    renderEngine: new RenderEngine(),
    physicEngine: new PhysicEngine(),
    playerEngine: new PlayerEngine(),
    swingEngine: new SwingEngine(),
    inputEngine: new InputEngine(),
    // soundEngine: new SoundEngine()
}