module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _terrain1: objects.Terrain;
    private _terrain2: objects.Terrain;
    private _tank: objects.Tank;
    private _enemy: objects.Enemy;
    private _bullets : objects.Bullet[];
    private _labelTankDegree : objects.Label;
    private _labelTankX : objects.Label;
    private _labelTankY : objects.Label;
    private _labelBulletsQty : objects.Label;
    private _labelBulletsAnglesList:objects.Label;
    private _scoreBoard : managers.ScoreBoard;
    private _colidedBullets: number[];
    private _barrier1 : objects.Barrier ; 
    private _barrier2 : objects.Barrier ; 
    private _barrier3 : objects.Barrier ; 
    private _barrier4 : objects.Barrier ; 
    private _barrier5 : objects.Barrier ; 

    public areaTop: number=0;
    public areaLeft:number=0;
    public areaRight:number=0;
    public areaBottom:number=0;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.areaTop = 0;
      this.areaBottom = 800;
      this.areaLeft= 0;
      this.areaRight= 1400;


      this.Start();
    }

    // Private Mathods

    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._bullets = new Array<objects.Bullet>();
      this._bullets[0] = new objects.Bullet(this.assetManager, 0, 0,this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
      this._bullets[1] = new objects.Bullet(this.assetManager, 0, 0,this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
      this._bullets[2] = new objects.Bullet(this.assetManager, 0, 0,this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
      this._bullets[3] = new objects.Bullet(this.assetManager, 0, 0,this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
      this._bullets[4] = new objects.Bullet(this.assetManager, 0, 0,this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);

      this._terrain1 = new objects.Terrain(this.assetManager);
      this._terrain2 = new objects.Terrain(this.assetManager);
      this._barrier1 = new objects.Barrier(this.assetManager,750, 450);
      this._barrier2 = new objects.Barrier(this.assetManager,350,400);
      this._barrier3 = new objects.Barrier(this.assetManager,1000,250);
      this._barrier4 = new objects.Barrier(this.assetManager,1000,700);
      this._barrier5 = new objects.Barrier(this.assetManager,200,650);
      this._tank = new objects.Tank(this.assetManager, (this.areaLeft+this.areaRight)*0.5, this.areaBottom*0.9);
      this._enemy = new objects.Enemy(this.assetManager);
      this._labelTankDegree = new objects.Label("Tank Rotation :", "10px","Arial", "#ff0000",1400,10, false );
      this._labelTankX = new objects.Label("Tank X (axis) :", "10px","Arial", "#ff0000",1400,25, false );
      this._labelTankY = new objects.Label("Tank Y (axis) :", "10px","Arial", "#ff0000",1400,40, false );
      this._labelBulletsQty = new objects.Label("Bullets Qty :", "10px","Arial", "#ff0000",1400,55, false );
      this._labelBulletsAnglesList = new objects.Label("Bullets Degree :", "10px","Arial", "#ff0000",1400,70, false );

      this._terrain1.x=0;
      this._terrain1.y=0;
      this._terrain2.x=this._terrain1.getBounds().width;
      this._terrain2.y=0;

      // create scoreboard UI for scene
      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoard = this._scoreBoard;
      
      this.Main();
    }

    public Update(): void {
      //this._terrain.Update();
      let tank_previous_x = this._tank.x; 
      let tank_previous_y = this._tank.y; 
      this._tank.Update();

      managers.Collision.Check(this._enemy, this._tank);
      if(this._tank.isColliding){
        this._tank.x =  tank_previous_x;
        this._tank.y =  tank_previous_y; 
        this._tank.isColliding = false;
      }
      this.checkTankBarrierColision(tank_previous_x, tank_previous_y)
      this._tank.nextBulletCounter++;
      if(this._tank.nextBulletCounter>10){
        if(objects.Game.keyboardManager.shoot){
          this._tank.bulletsCounter ++;
          this._bullets.forEach(bullet=>{
            if(!bullet.isFired){
              bullet.fire(this._tank.x +this._tank.halfWidth, this._tank.y,this._tank.getAngle());
              this.addChild(bullet);
            }
          });
          console.log(this._tank.rotation)
          // this._tank.nextBulletCounter=0;
          // this.addChild( this._bullets[this._tank.bulletsCounter] as (objects.Bullet));
          this.supportLabels();
        }
      }

      this._bullets.forEach(bullet => {
        bullet.updateCache();
        managers.Collision.Check(this._enemy, bullet);
        if(bullet.isColliding) bullet.destroyBullet();
        this.checkBulletBarrierCollision(bullet);
      });


      // let colidedBullets: number[];
      // let BulletsArraycounter : number =0;
      // let counter: number=0;

      // // Mapping the colided bulltes and throwing into another array
      // if(this._bullets!= null){
      //   this._bullets.forEach( bullet => {
      //     BulletsArraycounter++;
      //     if (bullet.isColliding){
      //       counter ++;
      //       this._colidedBullets[counter]= BulletsArraycounter;
      //     }
      //   });
      // }

      // // Deleting colided bullet from the bullets colletion after mapping
      // if(colidedBullets!=null){
      //   let array_test : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38 ];
      //   for(counter=0; counter < colidedBullets.length; counter++){
      //     array_test.slice(colidedBullets[counter],0); // just for debugging
      //     this._bullets.slice(colidedBullets[counter],0);
      //   }
      // }


      // If lives fall below 0 swith to game over scene
      if(this._scoreBoard.Health <= 0){
        objects.Game.currentScene = config.Scene.OVER;
      }

    }

    private supportLabels(){
      this._labelTankDegree.text="Tank Rotation : " + this._tank.rotation + "o";
      this._labelTankX.text = "Tank X (axis) :" + this._tank.x;
      this._labelTankY.text = "Tank Y (axis) :" + this._tank.y;
      this._labelBulletsQty.text = "Bullets Qty :"+ this._tank.bulletsCounter;
      this._labelBulletsAnglesList.text = "Bullets Degree :" + this._tank.getAngle();
    }

    // This is where the fun happens
    public Main(): void {

      this.addChild(this._terrain1);
      this.addChild(this._terrain2);
      this.addChild(this._barrier1);
      this.addChild(this._barrier2);
      this.addChild(this._barrier3);
      this.addChild(this._barrier4);
      this.addChild(this._barrier5);


      // add the tank to the scene
      this.addChild(this._tank);

      this.addChild(this._enemy);

      this.addChild(this._labelTankDegree);
      this.addChild(this._labelTankX);
      this.addChild(this._labelTankY);
      this.addChild(this._labelBulletsQty);
      this.addChild(this._labelBulletsAnglesList);

      // add scoreboard labels to the scene
      this.addChild(this._scoreBoard.HealthLabel);
      this.addChild(this._scoreBoard.ScoreLabel);
      this.addChild(this._scoreBoard.FuelLabel);
    }

    public checkTankBarrierColision(tank_previous_x:number, tank_previous_y:number){
      
      managers.Collision.Check(this._barrier1, this._tank);
      if(this._tank.isColliding){
        this._tank.x =  tank_previous_x;
        this._tank.y =  tank_previous_y; 
        this._tank.isColliding = false;
      }
      managers.Collision.Check(this._barrier2, this._tank);
      if(this._tank.isColliding){
        this._tank.x =  tank_previous_x;
        this._tank.y =  tank_previous_y; 
        this._tank.isColliding = false;
      }
      managers.Collision.Check(this._barrier3, this._tank);
      if(this._tank.isColliding){
        this._tank.x =  tank_previous_x;
        this._tank.y =  tank_previous_y; 
        this._tank.isColliding = false;
      }
      managers.Collision.Check(this._barrier4, this._tank);
      if(this._tank.isColliding){
        this._tank.x =  tank_previous_x;
        this._tank.y =  tank_previous_y; 
        this._tank.isColliding = false;
      }
      managers.Collision.Check(this._barrier5, this._tank);
      if(this._tank.isColliding){
        this._tank.x =  tank_previous_x;
        this._tank.y =  tank_previous_y; 
        this._tank.isColliding = false;
      }
    }
    
    public checkBulletBarrierCollision(bullet : objects.Bullet){
      managers.Collision.Check(this._barrier1, bullet);
      if(bullet.isColliding) bullet.destroyBullet();
      managers.Collision.Check(this._barrier2, bullet);
      if(bullet.isColliding) bullet.destroyBullet();
      managers.Collision.Check(this._barrier3, bullet);
      if(bullet.isColliding) bullet.destroyBullet();
      managers.Collision.Check(this._barrier4, bullet);
      if(bullet.isColliding) bullet.destroyBullet();
      managers.Collision.Check(this._barrier5, bullet);
      if(bullet.isColliding) bullet.destroyBullet();

    }
  }
}
