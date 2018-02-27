module objects {
    export class Tank extends objects.GameObject {
      // private instance variables
      private assetManager : createjs.LoadQueue;
      private fuelConsumeRate : number = 10; // 10 default
      // public properties
      public bulletsCounter : number =0;
      public nextBulletCounter : number =0;
  
      // Constructor
      constructor(assetManager: createjs.LoadQueue, x, y) {
        super(assetManager, "tank");
        this.assetManager = assetManager;
        this.x=x;
        this.y=y;
        this.Start();
      }
  
      // private methods
  
      // public methods
  
      // Initializes variables and creates new objects
      public Start():void {
        
      }
  
      // updates the game object every frame
      public Update():void {
        this.Move();
        this.CheckBounds();
      }
  
      // reset the objects location to some value
      public Reset():void {
  
      }
  
      // move the object to some new location
      public Move():void {

        
        
        /* // Mouse Controls
        if(this.x != objects.Game.stage.mouseX){
          if(this.x < objects.Game.stage.mouseX)
          {
            this.rotation =90;
          }else{
            this.rotation =270;
          }
          //this.x  = objects.Game.stage.mouseX;
        }
        
        if(this.y != objects.Game.stage.mouseY){
          if(this.y < objects.Game.stage.mouseY)
          {
            this.rotation =180;
          }else{
            this.rotation =0;
          }
          this.y = objects.Game.stage.mouseY;
        }
        */

        // Keyboard Controls
        if(objects.Game.keyboardManager.moveLeft){
          if(objects.Game.scoreBoard.Fuel > 0){
            objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
            
            this.x-=5;
          }
          this.rotation =270;
        }
        if(objects.Game.keyboardManager.moveRight){
          if(objects.Game.scoreBoard.Fuel > 0){
            objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
            this.x+=5;
          }
          this.rotation =90;
        }
        if(objects.Game.keyboardManager.moveBackward){
          if(objects.Game.scoreBoard.Fuel > 0){
            objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
            this.y+=5;
          }
          this.rotation =180;
        }
        if(objects.Game.keyboardManager.moveForward){
          if(objects.Game.scoreBoard.Fuel > 0){
            objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
            this.y-=5;
          }
          this.rotation =0;
        }
        

      }
  
      // check to see if some boundary has been passed
      public CheckBounds():void {

        // right boundary
        if(this.x >= 1500 -  this.halfWidth) {
          this.x = 1500 - this.halfWidth;
        }
        // left boundary
        if(this.x <= this.halfWidth) {
          this.x = this.halfWidth;
        }
        
        // bottom boundary
        if(this.y >= 800 -  this.halfHeight) {
          this.y = 800 - this.halfHeight;
        }
  
        // top boundary
        if(this.y <= this.halfHeight) {
          this.y = this.halfHeight;
        }
      }

      public getAngle():number{

        if(this.rotation/90<=1) {
          return 90-this.rotation;
        } 
        else if (this.rotation/90 <=2) {
          return 270+180-this.rotation;
        }
        else if (this.rotation/90 <=3) {
          return 180+270-this.rotation;
        } else {
          return 90+360-this.rotation;
        }
        
      }

    }
  }
  