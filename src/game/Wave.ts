// Liberapp 2019 - Tahiti Katagai
// 敵配置
// 敵キャラを生成して、その敵キャラが弾を撃つ

class Wave extends GameObject{

    static hardRate:number = 0;

    data:number[];
    index:number = 0;
    frame:number = 0;
    
    count:number = 0;

    constructor() {
        super();
        Wave.hardRate = 0;
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;
        if( Enemy.total > 0 ) return;
        if( (--this.frame) >= 0 ) return;

        switch( randI( 0, 3 ) ){
            case 0:
            new Enemy( Util.w(0.5), Util.h(0.1), Enemy.data0 );
            break;

            case 1:
            new Enemy( Util.w(0.5), Util.h(0.2), Enemy.data1 );
            break;

            case 2:
            new Enemy( Util.w(0.25), Util.h(0.1), Enemy.data2 );
            new Enemy( Util.w(0.75), Util.h(0.1), Enemy.data2 );
            break;

        }
        this.count++;
        this.frame = 60;
        Wave.hardRate = Util.clamp( this.count / 30, 0, 1 );
    }
}

