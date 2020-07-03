// Liberapp 2019 - Tahiti Katagai

const SDK = true;

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private async addToStage() {
        Util.init( this );
        GameObject.initial( this.stage );

        if( SDK ){
            await Social.init();
        }

        Game.loadSceneGamePlay();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        GameObject.process();
        return false;
    }
}

