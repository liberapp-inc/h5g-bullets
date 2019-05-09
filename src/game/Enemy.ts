// Liberapp 2019 - Tahiti Katagai
// 敵キャラ

class Enemy extends GameObject{

    data:number[];
    index:number = 0;
    frame:number = 0;

    constructor( px:number, py:number, data:number[] ) {
        super();

        this.data = data;
    }

    setDisplay( px:number, py:number, color:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;
        const w = Util.w(1/20);
        const h = Util.h(1/30);
        shape.graphics.beginFill( color );
        shape.graphics.drawRect( -w*0.5, -h*0.5, w, h );
        shape.graphics.endFill();
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        while( (--this.frame) <= 0 ){
            this.frame = this.data[ this.index + 9 ];



            this.index += 10;
            if( this.index >= this.data.length ){
                this.index = 0;
            }
        }
    }

    static data0:number[] = [
        // type,     size,      aim,            degree360,  way,range360,   speed,  part,   level   wait
        BType.Ball,  BSize.S,   BAim.Player,    0,          0,      0,      1.0,    0,      0,      60,

        BType.None,  0,         BAim.Player,    0,          0,      0,      0.0,    0,      0,      0,
        BType.Ball,  BSize.S,   BAim.Memory,    0,          0,      0,      1.0,    0,      0,      6,
        BType.Ball,  BSize.S,   BAim.Memory,    0,          0,      0,      1.0,    0,      0,      6,
        BType.Ball,  BSize.S,   BAim.Memory,    0,          0,      0,      1.0,    0,      0,      6,
        BType.Ball,  BSize.S,   BAim.Memory,    0,          0,      0,      1.0,    0,      0,      6,
        BType.Ball,  BSize.S,   BAim.Memory,    0,          0,      0,      1.0,    0,      0,      6,
        BType.Ball,  BSize.S,   BAim.Memory,    0,          2,     40,      1.0,    0,      0,      60,
    ];
}

// bullet data
// type,     size,      aim,            degree360,  way,range360,   speed,  part,   level   wait
class BData {

}

enum BType{
    None,
    Ball,
    Spear,
    Laser,
}

enum BSize{
    S,
    M,
    L,
    XL,
}

enum BAim{
    Player,
    Zero,       // 真下方向がゼロ (時計回り)
    Memory,     // BType.Noneのとき方向を記録。BBase.Memory指定で参照する
}
