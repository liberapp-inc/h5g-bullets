// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_RADIUS_PER_W = 1/48;

const SAVE_KEY_BESTSCORE = "bullets-bestScore";

const BACK_COLOR = 0x00f090;    // index.htmlで設定
const FONT_COLOR = 0xffffff;
const PLAYER_COLOR = 0xffffff;
const BULLET_COLOR = 0x004060;

class Game {

    static loadSceneGamePlay() {
        new Score();
        new Player( Util.width * 0.5, Util.height * 0.55 );
        new StartMessage();
    }
}
