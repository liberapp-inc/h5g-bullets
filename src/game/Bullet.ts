// Liberapp 2019 - Tahiti Katagai
// 敵弾

class Bullet extends GameObject{

    vx:number;
    vy:number;
    radius:number;

    constructor( px:number, py:number, degree:number, speed:number, size:number ) {
        super();

        const radian = degree * Deg2Rad;
        speed *= Util.w(BULLET_SPEED_PER_W);
        this.vx = -Math.sin(radian) * speed;
        this.vy =  Math.cos(radian) * speed;
        this.radius = Util.w(BULLET_RADIUS_PER_W) * size;
        this.setDisplay( px, py, BULLET_COLOR );
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
