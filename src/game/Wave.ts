// Liberapp 2019 - Tahiti Katagai
// 敵配置
// 敵キャラを生成して、その敵キャラが弾を撃つ

class Wave extends GameObject{

    static hardRate:number = 0;

    data:number[];
    index:number = 0;
    frame:number = 0;
    count:number = 0;
    type:number=-1;

    constructor() {
        super();
        Wave.hardRate = 0;
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        this.frame -= 1 + 3 * Wave.hardRate;
        if( this.frame >= 0 ) return;

        this.count++;
        Wave.hardRate = Util.clamp( Score.I.point / 90, 0, 1 );
        
        let typeMax = 13;
        let type = randI( 0, typeMax );
        if( type == this.type )
            type = (type + 1) % typeMax;
        this.type = type;

        switch( this.type ){
            case 0:
            new Enemy( Util.w(randF(0.2,0.8)), Util.h(0.1), Enemy.dataList0 );
            this.frame = 260*2;
            break;

            case 1:
            new Enemy( Util.w(0.5), Util.h(0.2), Enemy.dataList1 );
            this.frame = 8*20;
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
            new Enemy( Util.w(randF(0.1,0.9)), Util.h(randF(0.05,0.20)), Enemy.dataList4 );
            this.frame = 90*4;
            break;

            case 5:
            new Enemy( Util.w(randF(0.4,0.6)), Util.h(0.2), Enemy.dataList5 );
            this.frame = 60+90*3;
            break;

            case 6:
            new Enemy( Util.w(0.3), Util.h(0.2), Enemy.dataList6 );
            new Enemy( Util.w(0.7), Util.h(0.2), Enemy.dataList6 );
            this.frame = 20*6;
            break;

            case 7:
            new Enemy( Util.w(0.25), Util.h(0.10), Enemy.dataList7 );
            new Enemy( Util.w(0.75), Util.h(0.10), Enemy.dataList7 );
            this.frame = 20*4;
            break;

            case 8:
            new Enemy( Util.w(0.5), Util.h(0.20), Enemy.dataList8 );
            this.frame = 60+(16*18)*3;
            break;

            case 9:
            new Enemy( Util.w(randF(0.2, 0.8)), Util.h(randF(0.1, 0.25)), Enemy.dataList9 );
            this.frame = 8*100;
            break;

            case 10:
            new Enemy( Util.w(randF(0.2, 0.8)), Util.h(randF(0.05, 0.25)), Enemy.dataList10 );
            this.frame = 120*2;
            break;

            case 11:
            new Enemy( Util.w(randF(0.1, 0.9)), Util.h(randF(0.05, 0.2)), Enemy.dataList11 );
            new Enemy( Util.w(randF(0.1, 0.9)), Util.h(randF(0.05, 0.2)), Enemy.dataList11 );
            this.frame = 60+140*2;
            break;

            case 12:
            new Enemy( Util.w( randBool() ? 0.3 : 0.7 ), Util.h(0.05), Enemy.dataList12 );
            this.frame = 10;
            break;
        }

        if( (this.count & 1) == 0 )
            this.frame += 60*4;
        else
            this.frame *= 1 - (0.25 * Wave.hardRate**2);
    }
}

