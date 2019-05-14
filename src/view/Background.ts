// Liberapp 2019 - Tahiti Katagai

class Background extends GameObject{

    constructor() {
        super();

        let shape = new egret.Shape();
        this.display = shape;
        shape.graphics.lineStyle(2, PLAYER_COLOR2);
        // shape.graphics.beginFill(BACK_COLOR);
        shape.graphics.drawRect( 0, 0, Util.width, Util.h(0.9) );
        // shape.graphics.endFill();
        GameObject.display.addChild(shape);
    }
    
    update() {}
}

