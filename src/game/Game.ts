// Liberapp 2019 - Tahiti Katagai
// ゲームシーン

const PLAYER_RADIUS_PER_W = 1/64;
const BULLET_RADIUS_PER_W = 1/56;
const BULLET_SPEED_PER_W = 1/128;
const ENEMY_SIZE_PER_W = 1/20;

const SAVE_KEY_BESTSCORE = "bullets-bestScore";

const BACK_COLOR = 0xf0f4f8;    // index.htmlで設定
const FONT_COLOR = 0x00c0ff;
const PLAYER_COLOR = 0x00c0ff;
const PLAYER_COLOR2 = 0x00c0ff;
const BULLET_COLOR = 0x00c0ff;
const ENEMY_COLOR1 = 0x80e0ff;

class Game {

    static loadSceneGamePlay() {
        new Score();
        new Player( Util.width * 0.5, Util.height * 0.80 );
        new Wave();
        new StartMessage();

        // new Enemy( Util.width * 0.5, Util.height * 0.2, Enemy.data0 );

        // new Bullet( Util.w(0.2), Util.h(0.0), Math.PI* 0.0, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
        // new Bullet( Util.w(0.5), Util.h(0.0), Math.PI*+0.1, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
        // new Bullet( Util.w(0.5), Util.h(0.0), Math.PI*-0.1, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
        // new Bullet( Util.w(0.8), Util.h(0.0), Math.PI* 0.0, Util.w(0.01), Util.w(BULLET_RADIUS_PER_W), BULLET_COLOR );
    }
}
