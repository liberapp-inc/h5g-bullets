// Liberapp 2019 - Tahiti Katagai
// 敵キャラ

enum BType{
    Ball,
    Spear,
    Laser,
    Set = 0x100,
    Loop,
    Terminate,
}

enum BAim{
    Player,
    Direct,     // 真下方向がゼロ (時計回り)
    Memory,     // BType.Noneのとき方向を記録。BBase.Memory指定で参照する
}

// bullet data
class BData {
    type:BType;
    aim:BAim = BAim.Player;
    degree360:number = 0;
    way:number = 0;
    range360:number = 0;
    speed:number = 1.0;
    size:number = 1;
    frame:number;
}

class Enemy extends GameObject{

    static total:number = 0;

    data:BData[];
    index:number = 0;
    frame:number = 0;
    degree360:number = 0;
    loop:number = 0;

    constructor( px:number, py:number, data:BData[] ) {
        super();

        Enemy.total++;
        this.data = data;
        this.setDisplay( px, py, ENEMY_COLOR1 );
    }

    onDestroy( ){
        Enemy.total--;
    }

    setDisplay( px:number, py:number, color:number ){
        if( this.display )
            GameObject.display.removeChild( this.display );

        const shape = new egret.Shape();
        this.display = shape;
        GameObject.display.addChild(this.display);
        shape.x = px;
        shape.y = py;
        const w = Util.w(ENEMY_SIZE_PER_W);
        const h = w;
        shape.graphics.beginFill( color );
        shape.graphics.drawRect( -w*0.5, -h*0.5, w, h );
        shape.graphics.endFill();
        shape.rotation = 45;
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        this.frame--;
        while( this.frame <= 0 ){
            const data = this.data[this.index];

            this.frame = data.frame;

            if( data.type == BType.Terminate ){
                this.destroy();
                new EffectCircle( this.px, this.py, this.display.getBounds().width * 2, ENEMY_COLOR1 );
                break;
            }

            if( data.type == BType.Loop ){

            }

            if( data.type == BType.Set ){
                this.degree360 = this.getDegree( data );
            }
            else{
                let degree360 = this.getDegree( data );

                if( data.way <= 1 ){
                    new Bullet( this.px, this.py, degree360, data.speed, data.size );
                }
                else{
                    let way = data.way;
                    let range = data.range360;
                    const delta = range / (way-1);
                    degree360 -= range / 2;
                    while( way > 0 ){
                        new Bullet( this.px, this.py, degree360, data.speed, data.size );
                        degree360 += delta;
                        way--;
                    }
                }
            }

            this.index++;
            if( this.index >= this.data.length ){
                this.index = 0;
            }
        }
    }

    getDegree( data:BData ):number{
        let deg360 = 0;
        switch( data.aim ){
            case BAim.Player:
            let x = Player.I.px - this.px;
            let y = Player.I.py - this.py;
            deg360 = Math.atan2( -x, y ) * Rad2Deg;
            deg360 += data.degree360;
            break;

            case BAim.Direct:
            deg360 = data.degree360;
            break;

            case BAim.Memory:
            deg360 = this.degree360 + data.degree360;
            break;
        }
        return deg360;
    }

    static data0:BData[] = [
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },

        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },
        
        { type:BType.Set, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:10, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:3, range360:20, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:4, range360:30, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:5, range360:40, speed:1.0, size:1, frame:60 },
        
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },

        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },
        
        { type:BType.Set, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:10, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:3, range360:20, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:4, range360:30, speed:1.0, size:1, frame:12 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:5, range360:40, speed:1.0, size:1, frame:60 },
        
        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];

    static data1:BData[] = [
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    
    static data2:BData[] = [
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
}

