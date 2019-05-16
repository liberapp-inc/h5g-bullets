function rand(){return globalRandom.v()}function randF(e,t){return globalRandom.f(e,t)}function randI(e,t){return globalRandom.i(e,t)}function randBool(){return globalRandom.bool()}var __reflect=this&&this.__reflect||function(e,t,a){e.__class__=t,a?a.push(t):a=[t],e.__types__=e.__types__?a.concat(e.__types__):a},__extends=this&&this.__extends||function(e,t){function a(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);a.prototype=t.prototype,e.prototype=new a},GameObject=function(){function e(){this.display=null,e.objects.push(this)}return e.prototype.destroy=function(){this.deleteFlag=!0},e.prototype.onDestroy=function(){},Object.defineProperty(e.prototype,"px",{get:function(){return this.display.x},set:function(e){this.display.x=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return this.display.y},set:function(e){this.display.y=e},enumerable:!0,configurable:!0}),e.initial=function(t){e.display=t},e.process=function(){e.objects.forEach(function(e){return e.update()}),e.objects=e.objects.filter(function(e){return e.deleteFlag&&e._delete(),!e.deleteFlag}),e.transit&&(e.dispose(),e.transit(),e.transit=null)},e.dispose=function(){e.objects=e.objects.filter(function(e){return e.destroy(),e._delete(),!1})},e.prototype._delete=function(){this.onDestroy(),this.display&&(e.display.removeChild(this.display),this.display=null)},e.objects=[],e}();__reflect(GameObject.prototype,"GameObject");var Button=function(e){function t(t,a,i,r,s,n,o,p,y,d){var l=e.call(this)||this;l.text=null,l.onTap=null,l.press=!1,l.touch=!1,l.x=0,l.y=0;var h=new egret.Shape;GameObject.display.addChild(h),h.graphics.beginFill(p,y);var m=n*Util.width,c=o*Util.height;return h.graphics.drawRoundRect(-.5*m,-.5*c,m,c,.2*m),h.graphics.endFill(),h.touchEnabled=!0,h.x=r*Util.width,h.y=s*Util.height,l.display=h,t&&(l.text=Util.newTextField(t,a,i,r,s,!0,!1),GameObject.display.addChild(l.text)),l.onTap=d,l.onTap&&l.display.addEventListener(egret.TouchEvent.TOUCH_TAP,l.onTap,l),l.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,l.touchBegin,l),l.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,l.touchMove,l),l.display.addEventListener(egret.TouchEvent.TOUCH_END,l.touchEnd,l),l}return __extends(t,e),t.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.display.removeChild(this.text)},t.prototype.update=function(){var e=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(e-this.display.scaleX),this.press=!1},t.prototype.touchBegin=function(e){this.x=e.stageX,this.y=e.stageY,this.press=!0,this.touch=!0},t.prototype.touchMove=function(e){this.x=e.stageX,this.y=e.stageY,this.touch=!0},t.prototype.touchEnd=function(e){this.touch=!1},t}(GameObject);__reflect(Button.prototype,"Button");var EffectLine=function(e){function t(t,a,i,r,s){void 0===s&&(s=16760832);var n=e.call(this)||this;return n.frame=0,n.x=t,n.y=a,n.vx=i,n.vy=r,n.color=s,n.setShape(.01),n}return __extends(t,e),t.create=function(e,a,i,r,s){void 0===s&&(s=4);for(var n=0;s>n;n++){var o=rand()*Math.PI*2,p=Math.cos(o),y=-Math.sin(o),d=i*(2+n);new t(e+p*i,a+y*i,p*d,y*d,r)}},t.prototype.setShape=function(e){var t=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=t,GameObject.display.addChild(this.display),e=e*Math.PI*.5;var a=Math.sin(e),i=1-Math.cos(e);t.graphics.lineStyle(6,this.color),t.graphics.moveTo(this.x+this.vx*a,this.y+this.vy*a),t.graphics.lineTo(this.x+this.vx*i,this.y+this.vy*i)},t.prototype.update=function(){if(++this.frame>=t.maxFrame)return void this.destroy();var e=this.frame/t.maxFrame;this.setShape(e)},t.maxFrame=30,t}(GameObject);__reflect(EffectLine.prototype,"EffectLine");var Bullet=function(e){function t(t,a,i,r,s){var n=e.call(this)||this,o=i*Deg2Rad;return r*=Util.w(BULLET_SPEED_PER_W),n.vx=-Math.sin(o)*r,n.vy=Math.cos(o)*r,n.radius=Util.w(BULLET_RADIUS_PER_W)*s,n.setDisplay(t,a,BULLET_COLOR),n}return __extends(t,e),t.prototype.setDisplay=function(e,t,a){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChild(this.display),i.x=e,i.y=t,i.graphics.beginFill(a),i.graphics.drawCircle(0,0,this.radius),i.graphics.endFill()},t.prototype.update=function(){this.px+=this.vx,this.py+=this.vy;var e=Math.pow(Player.I.px-this.px,2)+Math.pow(Player.I.py-this.py,2);return e<Math.pow(Player.I.radius+this.radius,2)?(Player.I.hit(),void this.destroy()):void((Math.pow(this.px-Util.w(.5),2)>=Math.pow(Util.w(.5)+this.radius,2)||Math.pow(this.py-Util.h(.5),2)>=Math.pow(Util.h(.5)+this.radius,2))&&this.destroy())},t}(GameObject);__reflect(Bullet.prototype,"Bullet");var BType;!function(e){e[e.Ball=0]="Ball",e[e.Spear=1]="Spear",e[e.Laser=2]="Laser",e[e.None=100]="None",e[e.Loop=101]="Loop",e[e.Terminate=102]="Terminate"}(BType||(BType={}));var BAim;!function(e){e[e.Player=0]="Player",e[e.Direct=1]="Direct",e[e.Memory=2]="Memory",e[e.Random=3]="Random"}(BAim||(BAim={}));var BData=function(){function e(){this.aim=BAim.Player,this.degree360=0,this.way=0,this.range360=0,this.speed=1,this.size=1}return e}();__reflect(BData.prototype,"BData");var Enemy=function(e){function t(a,i,r){var s=e.call(this)||this;return s.listIndex=0,s.index=0,s.frame=0,s.degree360=0,s.loopIndex=0,s.loopCount=0,s.speed=1,t.total++,s.dataList=r,s.data=r[0],s.speed=1+3*Wave.hardRate,s.frame=s.speed,s.setDisplay(a,i,ENEMY_COLOR),s}return __extends(t,e),t.prototype.onDestroy=function(){t.total--},t.prototype.setDisplay=function(e,t,a){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChild(this.display),i.x=e,i.y=t;var r=Util.w(ENEMY_SIZE_PER_W),s=r;i.graphics.beginFill(a),i.graphics.drawRect(.5*-r,.5*-s,r,s),i.graphics.endFill(),i.rotation=45},t.prototype.update=function(){this.processData()},t.prototype.processData=function(){for(this.frame-=this.speed;this.frame<=0;){var e=this.data[this.index];switch(e.type){case BType.Terminate:return void this.terminate();case BType.Loop:this.loopIndex!=this.index&&(this.loopIndex=this.index,this.loopCount=e.size),--this.loopCount>0?this.index=0:(this.loopIndex=0,this.index++);break;case BType.None:this.degree360=this.getDegree(e),this.frame+=e.frame,this.index++;break;case BType.Ball:var t=this.getDegree(e);if(e.way<=1)new Bullet(this.px,this.py,t,e.speed*this.speed,e.size);else{var a=e.way,i=e.range360,r=i/(a-1);for(t-=i/2;a>0;)new Bullet(this.px,this.py,t,e.speed*this.speed,e.size),t+=r,a--}this.frame+=e.frame,this.index++}if(this.index>=this.data.length){if(this.listIndex++,!(this.listIndex<this.dataList.length))return void this.terminate();this.data=this.dataList[this.listIndex],this.index=0}}},t.prototype.getDegree=function(e){var t=0;switch(e.aim){case BAim.Player:var a=Player.I.px-this.px,i=Player.I.py-this.py;t=Math.atan2(-a,i)*Rad2Deg,t+=e.degree360;break;case BAim.Direct:t=e.degree360;break;case BAim.Memory:t=this.degree360+e.degree360;break;case BAim.Random:t=this.degree360+randF(-.5*e.range360,.5*e.range360)}return t},t.prototype.terminate=function(){this.destroy(),new EffectCircle(this.px,this.py,2*this.display.getBounds().width,EFFECT_COLOR),this.data=null,this.dataList=null},t.total=0,t.data0=[{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:60},{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:60},{type:BType.None,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:1,range360:0,speed:1,size:1,frame:20},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:15,speed:1,size:1,frame:20},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:3,range360:30,speed:1,size:1,frame:20},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:4,range360:45,speed:1,size:1,frame:20},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:5,range360:60,speed:1,size:1,frame:60},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:2,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList0=[t.data0],t.data1=[{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1.4,size:1,frame:8},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:20,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList1=[t.data1],t.data2=[{type:BType.Ball,aim:BAim.Player,degree360:0,way:2,range360:20,speed:1,size:1,frame:60},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:8,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList2=[t.data2],t.data3=[{type:BType.Ball,aim:BAim.Player,degree360:0,way:3,range360:40,speed:1,size:1,frame:75},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:4,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList3=[t.data3],t.data4=[{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1.4,size:1.5,frame:90},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:4,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList4=[t.data4],t.data50=[{type:BType.None,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:60}],t.data51=[{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:240,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:210,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:180,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:150,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:120,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:90,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:60,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:30,speed:1,size:1,frame:2},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:1,range360:0,speed:1,size:1.5,frame:74}],t.data52=[{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList5=[t.data50,t.data51,t.data50,t.data51,t.data50,t.data51,t.data52],t.data6=[{type:BType.Ball,aim:BAim.Direct,degree360:0,way:0,range360:0,speed:1.2,size:1,frame:20},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:6,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList6=[t.data6],t.data7=[{type:BType.Ball,aim:BAim.Direct,degree360:0,way:2,range360:20,speed:1.2,size:1,frame:20},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:4,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList7=[t.data7],t.data80=[{type:BType.None,aim:BAim.Direct,degree360:0,way:0,range360:0,speed:1,size:1,frame:60}],t.data81=[{type:BType.Ball,aim:BAim.Memory,degree360:45,way:4,range360:270,speed:1,size:1,frame:12},{type:BType.None,aim:BAim.Memory,degree360:0,way:0,range360:0,speed:1,size:1,frame:0},{type:BType.Loop,aim:0,degree360:0,way:0,range360:0,speed:1,size:18,frame:1}],t.data82=[{type:BType.Ball,aim:BAim.Memory,degree360:45,way:4,range360:270,speed:1,size:1,frame:12},{type:BType.None,aim:BAim.Memory,degree360:5,way:0,range360:0,speed:1,size:1,frame:0},{type:BType.Loop,aim:0,degree360:0,way:0,range360:0,speed:1,size:18,frame:1}],t.data83=[{type:BType.Ball,aim:BAim.Memory,degree360:45,way:4,range360:270,speed:1,size:1,frame:12},{type:BType.None,aim:BAim.Memory,degree360:-5,way:0,range360:0,speed:1,size:1,frame:0},{type:BType.Loop,aim:0,degree360:0,way:0,range360:0,speed:1,size:18,frame:1}],t.data84=[{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList8=[t.data80,t.data81,t.data82,t.data83,t.data84],t.data9=[{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:8},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:100,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList9=[t.data9],t.data10=[{type:BType.None,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:60},{type:BType.None,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:3,range360:60,speed:.8,size:1,frame:0},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:30,speed:.7,size:1.5,frame:16},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:3,range360:60,speed:1.1,size:1,frame:0},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:2,range360:30,speed:1,size:1.5,frame:44},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:2,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList10=[t.data10],t.data11_0=[{type:BType.None,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:60}],t.data11_1=[{type:BType.None,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:5,range360:120,speed:.7,size:1,frame:4},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:5,range360:120,speed:.8,size:1,frame:4},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:5,range360:120,speed:.9,size:1,frame:4},{type:BType.Ball,aim:BAim.Memory,degree360:0,way:5,range360:120,speed:1,size:1,frame:124},{type:BType.Loop,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:2,frame:0},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList11=[t.data11_0,t.data11_1],t.data12=[{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1.5,size:1.25,frame:0},{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1.4,size:1.25,frame:0},{type:BType.Ball,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1.3,size:1.25,frame:10},{type:BType.Terminate,aim:BAim.Player,degree360:0,way:0,range360:0,speed:1,size:1,frame:0}],t.dataList12=[t.data12],t}(GameObject);__reflect(Enemy.prototype,"Enemy");var PLAYER_RADIUS_PER_W=1/64,BULLET_RADIUS_PER_W=1/56,BULLET_SPEED_PER_W=1/160,ENEMY_SIZE_PER_W=.05,SAVE_KEY_BESTSCORE="bullets-bestScore",BACK_COLOR=41215,FONT_COLOR=65535,PLAYER_COLOR=15791352,BULLET_COLOR=15791352,ENEMY_COLOR=8451320,EFFECT_COLOR=FONT_COLOR,Game=function(){function e(){}return e.loadSceneGamePlay=function(){new Background,new Score,new Player(.5*Util.width,.8*Util.height),new Wave,new StartMessage},e}();__reflect(Game.prototype,"Game");var Player=function(e){function t(a,i){var r=e.call(this)||this;return r.buttonOffsetX=0,r.buttonOffsetY=0,r.state=r.stateNone,r.step=0,r.scale=1,t.I=r,r.radius=PLAYER_RADIUS_PER_W*Util.width,r.scrollSpeed=Util.height/120,r.setDisplay(a,i),r.button=new Button(null,0,0,.5,.5,1,1,0,0,null),r}return __extends(t,e),t.prototype.onDestroy=function(){this.button.destroy(),t.I=null},t.prototype.setDisplay=function(e,t){this.display&&GameObject.display.removeChild(this.display);var a=new egret.Shape;this.display=a,GameObject.display.addChild(this.display),a.x=e,a.y=t;var i=.75*this.radius;a.graphics.lineStyle(2,PLAYER_COLOR),a.graphics.moveTo(0*i,-6.5*i),a.graphics.lineTo(-5*i,3.5*i),a.graphics.lineTo(5*i,3.5*i),a.graphics.lineTo(0*i,-6.5*i),a.graphics.beginFill(PLAYER_COLOR),a.graphics.drawCircle(0,0,1.25*this.radius),a.graphics.endFill()},t.prototype.update=function(){this.state()},t.prototype.setStateNone=function(){this.state=this.stateNone},t.prototype.stateNone=function(){},t.prototype.setStateMove=function(){this.state=this.stateMove,this.step=0},t.prototype.stateMove=function(){this.button.press?(this.buttonOffsetX=this.px-this.button.x,this.buttonOffsetY=this.py-this.button.y):(this.px=Util.clamp(this.button.x+this.buttonOffsetX,this.radius,Util.width-this.radius),this.py=Util.clamp(this.button.y+this.buttonOffsetY,this.radius,Util.h(.9)-this.radius),this.buttonOffsetX=this.px-this.button.x,this.buttonOffsetY=this.py-this.button.y)},t.prototype.stateGameOver=function(){},t.prototype.hit=function(){this.state==this.stateMove&&(new GameOver,new EffectCircle(this.px,this.py,3*this.radius,PLAYER_COLOR),EffectLine.create(this.px,this.py,3*this.radius,PLAYER_COLOR),this.state=this.stateGameOver)},t.I=null,t}(GameObject);__reflect(Player.prototype,"Player");var Wave=function(e){function t(){var a=e.call(this)||this;return a.index=0,a.frame=0,a.count=0,a.type=-1,t.hardRate=0,a}return __extends(t,e),t.prototype.update=function(){if(Player.I.state!=Player.I.stateNone&&(this.frame-=1+3*t.hardRate,!(this.frame>=0))){this.count++,t.hardRate=Util.clamp(Score.I.point/90,0,1);var e=13,a=randI(0,e);switch(a==this.type&&(a=(a+1)%e),this.type=a,this.type){case 0:new Enemy(Util.w(randF(.2,.8)),Util.h(.1),Enemy.dataList0),this.frame=520;break;case 1:new Enemy(Util.w(.5),Util.h(.2),Enemy.dataList1),this.frame=160;break;case 2:new Enemy(Util.w(.25),Util.h(.1),Enemy.dataList2),new Enemy(Util.w(.75),Util.h(.1),Enemy.dataList2),this.frame=480;break;case 3:new Enemy(Util.w(.3),Util.h(.15),Enemy.dataList3),new Enemy(Util.w(.7),Util.h(.15),Enemy.dataList3),this.frame=300;break;case 4:new Enemy(Util.w(randF(.1,.9)),Util.h(randF(.05,.2)),Enemy.dataList4),this.frame=360;break;case 5:new Enemy(Util.w(randF(.4,.6)),Util.h(.2),Enemy.dataList5),this.frame=330;break;case 6:new Enemy(Util.w(.3),Util.h(.2),Enemy.dataList6),new Enemy(Util.w(.7),Util.h(.2),Enemy.dataList6),this.frame=120;break;case 7:new Enemy(Util.w(.25),Util.h(.1),Enemy.dataList7),new Enemy(Util.w(.75),Util.h(.1),Enemy.dataList7),this.frame=80;break;case 8:new Enemy(Util.w(.5),Util.h(.2),Enemy.dataList8),this.frame=924;break;case 9:new Enemy(Util.w(randF(.2,.8)),Util.h(randF(.1,.25)),Enemy.dataList9),this.frame=800;break;case 10:new Enemy(Util.w(randF(.2,.8)),Util.h(randF(.05,.25)),Enemy.dataList10),this.frame=240;break;case 11:new Enemy(Util.w(randF(.1,.9)),Util.h(randF(.05,.2)),Enemy.dataList11),new Enemy(Util.w(randF(.1,.9)),Util.h(randF(.05,.2)),Enemy.dataList11),this.frame=340;break;case 12:new Enemy(Util.w(randBool()?.3:.7),Util.h(.05),Enemy.dataList12),this.frame=10}0==(1&this.count)?this.frame+=240:this.frame*=1-.25*Math.pow(t.hardRate,2)}},t.hardRate=0,t}(GameObject);__reflect(Wave.prototype,"Wave");var EffectCircle=function(e){function t(a,i,r,s){void 0===s&&(s=16760832);var n=e.call(this)||this;return n.frame=t.maxFrame,n.radius=r,n.color=s,n.setShape(a,i,n.radius),n}return __extends(t,e),t.prototype.setShape=function(e,a,i){var r=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=r,GameObject.display.addChild(this.display),r.x=e,r.y=a,r.graphics.lineStyle(3+10*(this.frame/t.maxFrame),this.color),r.graphics.drawCircle(0,0,i)},t.prototype.update=function(){return--this.frame<=0?void this.destroy():(this.radius*=1.03,void this.setShape(this.display.x,this.display.y,this.radius))},t.maxFrame=30,t}(GameObject);__reflect(EffectCircle.prototype,"EffectCircle");var Main=function(e){function t(){var t=e.call(this)||this;return t.once(egret.Event.ADDED_TO_STAGE,t.addToStage,t),t}return __extends(t,e),t.prototype.addToStage=function(){Util.init(this),GameObject.initial(this.stage),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this)},t.prototype.tickLoop=function(e){return GameObject.process(),!1},t}(eui.UILayer);__reflect(Main.prototype,"Main");var Random=function(){function e(t){void 0===t&&(t=Math.floor(Math.random()*e.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=t}return e.prototype.v=function(){return(this.next()&e.max)/(e.max+1)},e.prototype.f=function(e,t){return e+this.v()*(t-e)},e.prototype.i=function(e,t){return Math.floor(this.f(e,t))},e.prototype.bool=function(){return 0!=(1&this.next())},e.prototype.next=function(){var e;return e=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(e^e>>>8)},e.max=268435455,e}();__reflect(Random.prototype,"Random");var globalRandom=new Random,Deg2Rad=Math.PI/180,Rad2Deg=180/Math.PI,Util=function(){function e(){}return e.w=function(t){return t*e.width},e.h=function(t){return t*e.height},e.init=function(e){this.width=e.stage.stageWidth,this.height=e.stage.stageHeight},e.clamp=function(e,t,a){return t>e&&(e=t),e>a&&(e=a),e},e.lerp=function(e,t,a){return e+(t-e)*a},e.color=function(e,t,a){return 65536*Math.floor(255*e)+256*Math.floor(255*t)+Math.floor(255*a)},e.colorLerp=function(e,t,a){var i=1-a,r=((16711680&e)*i+(16711680&t)*a&16711680)+((65280&e)*i+(65280&t)*a&65280)+((255&e)*i+(255&t)*a&255);return r},e.newTextField=function(t,a,i,r,s,n,o){var p=new egret.TextField;return p.text=t,p.bold=n,p.size=a,p.textColor=i,o?(p.x=(e.width-p.width)*r,p.y=(e.height-p.height)*s):(p.x=e.width*r-.5*p.width,p.y=e.height*s-.5*p.height),p},e}();__reflect(Util.prototype,"Util");var Background=function(e){function t(){var t=e.call(this)||this,a=new egret.Shape;return t.display=a,a.graphics.lineStyle(2,PLAYER_COLOR),a.graphics.drawRect(0,0,Util.width,Util.h(.9)),GameObject.display.addChild(a),t}return __extends(t,e),t.prototype.update=function(){},t}(GameObject);__reflect(Background.prototype,"Background");var GameOver=function(e){function t(){var t=e.call(this)||this;return t.textScore=null,t.retryButton=null,t.step=0,t.fadeInFrame=60,Score.I&&(Score.I.point>=Score.I.bestScore&&egret.localStorage.setItem(SAVE_KEY_BESTSCORE,Score.I.point.toFixed(1)),t.textScore=Util.newTextField("SCORE : "+Score.I.point.toFixed(1),Util.width/12,FONT_COLOR,.5,.35,!0,!1),GameObject.display.addChild(t.textScore)),t}return __extends(t,e),t.prototype.onDestroy=function(){this.textScore&&(GameObject.display.removeChild(this.textScore),this.textScore=null)},t.prototype.update=function(){if(this.step<this.fadeInFrame){this.step++;var e=this.step/this.fadeInFrame;this.textScore.alpha=e,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.65,.4,.1,FONT_COLOR,1,this.onTapRetry))}},t.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},t}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(e){function t(){var a=e.call(this)||this;a.point=0,a.bestScore=0,a.text=null,a.textBest=null,t.I=a,a.point=0,a.text=Util.newTextField("0",Util.width/22,FONT_COLOR,.5,0,!0,!0),GameObject.display.addChild(a.text);var i=egret.localStorage.getItem(SAVE_KEY_BESTSCORE);return null==i&&(i="15",egret.localStorage.setItem(SAVE_KEY_BESTSCORE,i)),a.bestScore=parseInt(i),a.textBest=Util.newTextField("BEST:"+i,Util.width/22,FONT_COLOR,0,0,!0,!0),GameObject.display.addChild(a.textBest),a}return __extends(t,e),t.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null,GameObject.display.removeChild(this.textBest),this.textBest=null,t.I=null},t.prototype.update=function(){Player.I.state==Player.I.stateMove&&(this.point+=1/60,this.text.text=""+this.point.toFixed(1),this.bestScore<this.point&&(this.bestScore=this.point,this.textBest.text="BEST:"+this.point.toFixed(1)))},t.I=null,t}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(e){function t(){var t=e.call(this)||this;return t.texts=[],t.texts[0]=Util.newTextField("弾幕よけろ！",Util.width/10,FONT_COLOR,.5,.3,!1,!1),t.texts.forEach(function(e){GameObject.display.addChild(e)}),GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN,t.tap,t),t}return __extends(t,e),t.prototype.onDestroy=function(){this.texts.forEach(function(e){GameObject.display.removeChild(e)}),this.texts=null},t.prototype.update=function(){},t.prototype.tap=function(e){Player.I.setStateMove(),this.destroy()},t}(GameObject);__reflect(StartMessage.prototype,"StartMessage");