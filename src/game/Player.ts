// Liberapp 2019 - Tahiti Katagai
// プレイヤー　自機キャラ

class Player extends GameObject{

    static I:Player = null;

    radius:number;
    scrollSpeed:number;
    button:Button;
    buttonOffsetX:number = 0;
    buttonOffsetY:number = 0;
    state:()=>void = this.stateNone;
    step:number = 0;
    scale:number = 1;

    constructor( px:number, py:number ) {
        super();

        Player.I = this;
        this.radius = PLAYER_RADIUS_PER_W * Util.width;
        this.scrollSpeed = Util.height / (60 * 2);
        this.setDisplay( px, py );
        
        this.button = new Button( null, 0, 0, 0.5, 0.5, 1, 1, 0x000000, 0.0, null ); // 透明な全画面ボタン
    }

    onDestroy(){
        this.button.destroy();
        Player.I = null;
    }

    setDisplay( px:number, py:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;

        const r = this.radius * 0.75;
        shape.graphics.lineStyle(2, PLAYER_COLOR);
        // shape.graphics.beginFill(PLAYER_COLOR);
        shape.graphics.moveTo( 0.0*r,-6.5*r);
        shape.graphics.lineTo(-5.0*r,+3.5*r);
        shape.graphics.lineTo(+5.0*r,+3.5*r);
        shape.graphics.lineTo( 0.0*r,-6.5*r);
        // shape.graphics.endFill();
        
        shape.graphics.beginFill( PLAYER_COLOR );
        shape.graphics.drawCircle( 0, 0, this.radius * 1.25 );
        shape.graphics.endFill();
    }

    update() {
        this.state();
    }

    setStateNone(){
        this.state = this.stateNone;
    }
    stateNone(){}

    setStateMove(){
        this.state = this.stateMove;
        this.step = 0;
    }
    stateMove() {
        if( this.button.press ){
            this.buttonOffsetX = this.px - this.button.x;
            this.buttonOffsetY = this.py - this.button.y;
        }
        else{
            const rate = 1.25;
            let vx = this.button.x + this.buttonOffsetX - this.px;
            let vy = this.button.y + this.buttonOffsetY - this.py;
            this.px = Util.clamp( this.px + vx * rate, this.radius, Util.width  - this.radius );
            this.py = Util.clamp( this.py + vy * rate, this.radius, Util.h(0.9) - this.radius );
            this.buttonOffsetX = this.px - this.button.x;
            this.buttonOffsetY = this.py - this.button.y;
        }
    }

    stateGameOver(){}

    hit(){
        if( this.state != this.stateMove )
            return;
        new GameOver();
        new EffectCircle( this.px, this.py, this.radius*3, PLAYER_COLOR );
        EffectLine.create( this.px, this.py, this.radius*3, PLAYER_COLOR );
        this.state = this.stateGameOver;
    }
}
