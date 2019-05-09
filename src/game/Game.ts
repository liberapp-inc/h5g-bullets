// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_RADIUS_PER_W = 1/48;
const BULLET_RADIUS_PER_W = 1/56;

const SAVE_KEY_BESTSCORE = "bullets-bestScore";

const BACK_COLOR = 0xf0f4f8;    // index.htmlで設定
const FONT_COLOR = 0x00c0ff;
const PLAYER_COLOR = 0xffffff;
const PLAYER_COLOR2 = 0x00c0ff;
const BULLET_COLOR = 0x00c0ff;

class Game {

    static loadSceneGamePlay() {
        new Score();
        new Player( Util.width * 0.5, Util.height * 0.80 );
        new StartMessage();

        new Bullet( Util.w(0.2), Util.h(0.0), Math.PI* 0.0, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
        new Bullet( Util.w(0.5), Util.h(0.0), Math.PI*+0.1, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
        new Bullet( Util.w(0.5), Util.h(0.0), Math.PI*-0.1, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
        new Bullet( Util.w(0.8), Util.h(0.0), Math.PI* 0.0, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
    }
}
