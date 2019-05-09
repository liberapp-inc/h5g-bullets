// Liberapp 2019 - Tahiti Katagai
// 敵弾

class Bullet extends GameObject{

    vx:number;
    vy:number;
    radius:number;

    get px():number { return this.display.x; }
    get py():number { return this.display.y; }
    set px(x:number) { this.display.x = x; }
    set py(y:number) { this.display.y = y; }

    constructor( px:number, py:number, angle:number, speed:number, radius:number, color:number ) {
        super();

        this.vx = Math.sin(angle) * speed;
        this.vy = Math.cos(angle) * speed;
        this.radius = radius;
        this.setDisplay( px, py, color );
    }

    setDisplay( px:number, py:number, color:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;
        shape.graphics.beginFill( color );
        shape.graphics.drawCircle( 0, 0, this.radius );
        shape.graphics.endFill();
    }

    update() {
        // move
        this.px += this.vx;
        this.py += this.vy;

        // hit
        let d = (Player.I.px - this.px)**2 + (Player.I.py - this.py)**2;
        if( d < (Player.I.radius + this.radius)**2 ){
            Player.I.hit();
            this.destroy();
            return;
        }

        // out
        if( (this.px-Util.w(0.5))**2 >= (Util.w(0.5)+this.radius)**2 ||
            (this.py-Util.h(0.5))**2 >= (Util.h(0.5)+this.radius)**2 ){
            this.destroy();
        }
    }
}
