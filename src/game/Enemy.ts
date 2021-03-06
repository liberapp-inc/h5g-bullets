// Liberapp 2019 - Tahiti Katagai
// 敵キャラ

enum BType{
    Ball,
    Spear,
    Laser,
    None = 100,
    Loop,
    Terminate,
}

enum BAim{
    Player,
    Direct,     // 真下方向がゼロ (時計回り)
    Memory,     // BType.Noneのとき記録した方向に撃つ
    Random,     // ランダム方向(degree360方向+range360範囲ランダム)
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

    dataList:BData[][];
    listIndex:number = 0;
    data:BData[];
    index:number = 0;
    frame:number = 0;
    degree360:number = 0;
    loopIndex:number = 0;
    loopCount:number = 0;
    speed:number = 1.0;

    constructor( px:number, py:number, dataList:BData[][] ) {
        super();

        Enemy.total++;
        this.dataList = dataList;
        this.data = dataList[0];
        this.speed = 1 + 3 * Wave.hardRate;
        this.frame = this.speed;
        this.setDisplay( px, py, ENEMY_COLOR );
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
        // if( Player.I.state == Player.I.stateNone ) return;
        
        this.processData();
    }

    processData(){
        this.frame -= this.speed;

        while( this.frame <= 0 ){
            const data = this.data[this.index];

            switch( data.type ){
                case BType.Terminate:
                this.terminate();
                return;

                case BType.Loop:
                // start loop
                if( this.loopIndex != this.index ){
                    this.loopIndex = this.index;
                    this.loopCount = data.size;     // size = loop count
                }
                if( (--this.loopCount) > 0 ){
                    this.index = 0;
                }else{
                    // end loop
                    this.loopIndex = 0;
                    this.index++;
                }
                //this.frame = 1; // 重複予防 ループではかならず１フレ経過させる    
                break;

                case BType.None:
                this.degree360 = this.getDegree( data );
                this.frame += data.frame;
                this.index++;
                break;

                case BType.Ball:
                let degree360 = this.getDegree( data );
                if( data.way <= 1 ){
                    new Bullet( this.px, this.py, degree360, data.speed*this.speed, data.size );
                }
                else{
                    // N way
                    let way = data.way;
                    let range = data.range360;
                    const delta = range / (way-1);
                    degree360 -= range / 2;
                    while( way > 0 ){
                        new Bullet( this.px, this.py, degree360, data.speed*this.speed, data.size );
                        degree360 += delta;
                        way--;
                    }
                }
                this.frame += data.frame;
                this.index++;
                break;
            }

            if( this.index >= this.data.length ){
                this.listIndex++;
                if( this.listIndex < this.dataList.length ){
                    this.data = this.dataList[ this.listIndex ];
                    this.index = 0;
                }else{
                    this.terminate();
                    return;
                }
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

            case BAim.Random:
            deg360 = this.degree360 + randF( -0.5*data.range360, +0.5*data.range360 );
            break;
        }
        return deg360;
    }

    terminate(){
        this.destroy();
        new EffectCircle( this.px, this.py, this.display.getBounds().width * 2, EFFECT_COLOR );
        this.data = null;
        this.dataList = null;
    }

    //----------------------

    // 1way 1way 1,2,3,4,5way  260*2
    static data0:BData[] = [
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },

        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },
        
        { type:BType.None, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:1, range360:0, speed:1.0, size:1, frame:20 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:15, speed:1.0, size:1, frame:20 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:3, range360:30, speed:1.0, size:1, frame:20 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:4, range360:45, speed:1.0, size:1, frame:20 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:5, range360:60, speed:1.0, size:1, frame:60 },
        
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:2, frame:0 },
        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList0:BData[][] = [Enemy.data0];


    // rapid 100  8*20
    static data1:BData[] = [
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.4, size:1, frame:8 },
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:20, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList1:BData[][] = [Enemy.data1];


    // 2way x 8times  60*8
    static data2:BData[] = [
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:2, range360:20, speed:1.0, size:1, frame:60 },
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:8, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList2:BData[][] = [Enemy.data2];
    

    // 3way x 4times  75*4
    static data3:BData[] = [
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:3, range360:40, speed:1.0, size:1, frame:75 },
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:4, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList3:BData[][] = [Enemy.data3];
    

    // 中 1way x 4times   90*4
    static data4:BData[] = [
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.4, size:1.5, frame:90 },
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:4, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList4:BData[][] = [Enemy.data4];
    

    // 15way x 3times  60+90*3
    static data50:BData[] = [
        { type:BType.None, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },
    ];
    static data51:BData[] = [
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:240, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:210, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:180, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:150, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:120, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:90, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:60, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:30, speed:1.0, size:1, frame:2 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:1, range360:0, speed:1.0, size:1.5, frame:90-16 },
    ];
    static data52:BData[] = [
        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList5:BData[][] = [Enemy.data50,Enemy.data51, Enemy.data50,Enemy.data51, Enemy.data50,Enemy.data51, Enemy.data52];
    

    // 真下 列弾  20*6
    static data6:BData[] = [
        { type:BType.Ball, aim:BAim.Direct, degree360:0, way:0, range360:0, speed:1.2, size:1, frame:20 },
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:6, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList6:BData[][] = [Enemy.data6];
    
    
    // ハの字 列弾  20*4
    static data7:BData[] = [
        { type:BType.Ball, aim:BAim.Direct, degree360:0, way:2, range360:20, speed:1.2, size:1, frame:20 },
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:4, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList7:BData[][] = [Enemy.data7];
    
    
    // うずまき弾  60+(16*18)*3
    static data80:BData[] = [
        { type:BType.None,  aim:BAim.Direct, degree360:0,    way:0, range360:0,      speed:1.0, size:1, frame:60 },
    ];
    static data81:BData[] = [
        { type:BType.Ball, aim:BAim.Memory, degree360:0+45, way:4, range360:360-90, speed:1.0, size:1, frame:12 },
        { type:BType.None,  aim:BAim.Memory, degree360:0,   way:0, range360:0,      speed:1.0, size:1, frame:0 },
        { type:BType.Loop, aim:0, degree360:0,    way:0, range360:0,      speed:1.0, size:18, frame:1 },
    ];
    static data82:BData[] = [
        { type:BType.Ball, aim:BAim.Memory, degree360:0+45, way:4, range360:360-90, speed:1.0, size:1, frame:12 },
        { type:BType.None,  aim:BAim.Memory, degree360:+5,   way:0, range360:0,      speed:1.0, size:1, frame:0 },
        { type:BType.Loop, aim:0, degree360:0,    way:0, range360:0,      speed:1.0, size:18, frame:1 },
    ];
    static data83:BData[] = [
        { type:BType.Ball, aim:BAim.Memory, degree360:0+45, way:4, range360:360-90, speed:1.0, size:1, frame:12 },
        { type:BType.None, aim:BAim.Memory, degree360:-5,   way:0, range360:0,      speed:1.0, size:1, frame:0 },
        { type:BType.Loop, aim:0, degree360:0,    way:0, range360:0,      speed:1.0, size:18, frame:1 },
    ];
    static data84:BData[] = [
        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList8:BData[][] = [Enemy.data80, Enemy.data81, Enemy.data82, Enemy.data83, Enemy.data84];
    
    
    // rapid 100  8*100
    static data9:BData[] = [
        //
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:8 },
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:100, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList9:BData[][] = [Enemy.data9];
    
    
    // 5way ２重拡散弾  120*2
    static data10:BData[] = [
        //
        { type:BType.None, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },
        
        { type:BType.None, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:3, range360:60, speed:0.8, size:1, frame:0 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:30, speed:0.7, size:1.5, frame:16 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:3, range360:60, speed:1.1, size:1, frame:0 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:2, range360:30, speed:1.0, size:1.5, frame:60-16 },

        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:2, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList10:BData[][] = [Enemy.data10];
    
    
    // 5way 列弾　60+140*2
    static data11_0:BData[] = [
        { type:BType.None, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:60 },
    ];
    static data11_1:BData[] = [
        { type:BType.None, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:5, range360:120, speed:0.7, size:1, frame:4 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:5, range360:120, speed:0.8, size:1, frame:4 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:5, range360:120, speed:0.9, size:1, frame:4 },
        { type:BType.Ball, aim:BAim.Memory, degree360:0, way:5, range360:120, speed:1.0, size:1, frame:4 + 120 },
        
        { type:BType.Loop, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:2, frame:0 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList11:BData[][] = [Enemy.data11_0, Enemy.data11_1];


    // 中 スピード
    static data12:BData[] = [
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.5, size:1.25, frame:0 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.4, size:1.25, frame:0 },
        { type:BType.Ball, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.3, size:1.25, frame:10 },

        { type:BType.Terminate, aim:BAim.Player, degree360:0, way:0, range360:0, speed:1.0, size:1, frame:0 },
    ];
    static dataList12:BData[][] = [Enemy.data12];    
}

