// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_RADIUS_PER_W = 1/64;
const BULLET_RADIUS_PER_W = 1/56;
const BULLET_SPEED_PER_W = 1/160;
const ENEMY_SIZE_PER_W = 1/20;

const SAVE_KEY_BESTSCORE = "bullets-bestScore";

// const BACK_COLOR = 0xf0f4f8;    // index.htmlで設定
// const FONT_COLOR = 0x00a0ff;
// const PLAYER_COLOR = 0x00c0ff;
// const PLAYER_COLOR2 = 0x00c0ff;
// const BULLET_COLOR = 0x00c0ff;
// const ENEMY_COLOR1 = 0x80e0ff;

const BACK_COLOR = 0x00a0ff;    // index.htmlで設定
const FONT_COLOR = 0x00ffff;
const PLAYER_COLOR = 0xf0f4f8;
const BULLET_COLOR = 0xf0f4f8;
const ENEMY_COLOR = 0x80f4f8;
const EFFECT_COLOR = FONT_COLOR;

class Game {

    static loadSceneGamePlay() {
        new Background();
        new Score();
        new Player( Util.width * 0.5, Util.height * 0.80 );
        new Wave();
        new StartMessage();
    }
}
