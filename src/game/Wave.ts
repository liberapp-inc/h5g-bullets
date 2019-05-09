// Liberapp 2019 - Tahiti Katagai
// 敵配置
// 敵キャラを生成して、その敵キャラが弾を撃つ

class Wave extends GameObject{

    static hardRate:number = 0;

    data:number[];
    count:number = 0;
    frame:number = 0;

    constructor() {
        super();
        Wave.hardRate = 0;
    }

    update() {
        if( Player.I.state == Player.I.stateNone ) return;

        Wave.hardRate = Util.clamp( this.count / 30, 0, 1 );

        if( (--this.frame) <= 0 ){
            

        }

        /*

        hardRate = Util.clamp( this.scroll / (10 * Util.height), 0, 1 );
        this.speedY = Util.height * Util.lerp( Wave.speedMin,  Wave.speedMax, hardRate );
        this.scroll += this.speedY;
        this.period += this.speedY;

        const length = Util.height / BLOCK_IN_H;
        this.wave = Math.floor( this.scroll / length );
        if( this.period >= length ){
            this.period -= length;

            const bw = BLOCK_SIZE_PER_W * Util.width;
            const bh = bw;//BLOCK_SIZE_PER_H * Util.height;
            for( let i=0 ; i<BLOCK_IN_W ; i++ ){
                const data = this.map[this.mapIndex * BLOCK_IN_W + i];
                const type = data & 0xf;
                if( type != 0 ){
                    const x = (0.5 + i) * bw;
                    const y = -2.0 * bh;
                    const scale = ((data >>  4) & 0xf) * 0.5 + 1;
                    const angle = ((data >>  8) & 0xf) * (Math.PI*2/16);
                    const move  = ((data >> 12) & 0xf) * (Math.PI*2/16);   // 真下０度、時計回り0~15
                    const speed = ((data >> 16) & 0xf) * (bw*2/15);
                    const vx = Math.sin(move) * -speed;
                    const vy = Math.cos(move) *  speed;
                    switch( type ){
                        case 1: Obstacle.newBox( x, y, scale, angle, vx, vy );      break;
                        case 2: Obstacle.newBar( x, y, scale, angle, vx, vy );      break;
                        case 3: Obstacle.newLong( x, y, scale, angle, vx, vy );     break;
                        case 4: Obstacle.newBall( x, y, scale,        vx, vy );     break;
                        case 5: Obstacle.newCross( x, y, scale, angle, vx, vy );    break;
                    }

                }
            }

            if( (--this.mapIndex) < 0 ){
                this.map = this.maps[ this.random.i( 0, this.maps.length ) ];
                this.mapIndex = this.map.length / BLOCK_IN_W - 1;
                this.period -= length * Util.lerp( 8, 1, hardRate );
            }
        }
        */
    }
}

