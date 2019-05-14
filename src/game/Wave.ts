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

        this.frame -= 1 + 3 * Wave.hardRate;

        if( this.frame >= 0 ) return;

        this.count++;
        Wave.hardRate = Util.clamp( this.count / 30, 0, 1 );
        
        switch( randI( 0, 8 ) ){
            case 0:
            new Enemy( Util.w(0.5), Util.h(0.1), Enemy.dataList0 );
            this.frame = 60*3+80;
            break;

            case 1:
            new Enemy( Util.w(0.5), Util.h(0.2), Enemy.dataList1 );
            this.frame = 8*100;
            break;

            case 2:
            new Enemy( Util.w(0.25), Util.h(0.1), Enemy.dataList2 );
            new Enemy( Util.w(0.75), Util.h(0.1), Enemy.dataList2 );
            this.frame = 60*8;
            break;

            case 3:
            new Enemy( Util.w(0.30), Util.h(0.15), Enemy.dataList3 );
            new Enemy( Util.w(0.70), Util.h(0.15), Enemy.dataList3 );
            this.frame = 75*4;
            break;

            case 4:
            new Enemy( Util.w(randF(0.1,0.9)), Util.h(randF(0.05,0.15)), Enemy.dataList4 );
            this.frame = 0; // 90*4;
            break;

            case 5:
            new Enemy( Util.w(randF(0.4,0.6)), Util.h(0.2), Enemy.dataList5 );
            this.frame = 75*3;
            break;

            case 6:
            new Enemy( Util.w(0.28), Util.h(0.2), Enemy.dataList6 );
            new Enemy( Util.w(0.72), Util.h(0.2), Enemy.dataList6 );
            this.frame = 20*6;
            break;

            case 7:
            new Enemy( Util.w(0.25), Util.h(0.10), Enemy.dataList7 );
            new Enemy( Util.w(0.85), Util.h(0.10), Enemy.dataList7 );
            this.frame = 20*4;
            break;
        }

        if( (this.count & 1) == 0 )
            this.frame *= 0.75;
        else
            this.frame += 60*2;
    }
}

