
import play from "play-audio-notify";

export default class SoundEngine {
  sounds = {};
  player;
  sounds = {
    GAME_INTRO: { name: 'GAME_INTRO', player: play(['./sound/intro.mp3']) }, 
    SECTION_INTRO: { name: 'SECTION_INTRO', player: play(['./sound/section_entry.mp3']) },
    PIG_SOUND: { name: 'PIG_SOUND', player: play(['./sound/pig_sound.mp3']) }
  };

  initialActions() { 
    this.play(this.sounds.GAME_INTRO.name);
  }

  play(soundName){
    if(Object.keys(this.sounds).includes(soundName)) {
      this.sounds[soundName].player.controls().loop().play();
    }
  }

  playOnce(soundName){
    if(Object.keys(this.sounds).includes(soundName)) {
      this.sounds[soundName].player.play();
    }
  }

  stop(soundName) {
    if(Object.keys(this.sounds).includes(soundName)) {
      this.sounds[soundName].player.muted();
    }
  }
}
