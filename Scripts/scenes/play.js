var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public Properties
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.areaTop = 0;
            _this.areaLeft = 0;
            _this.areaRight = 0;
            _this.areaBottom = 0;
            _this.areaTop = 0;
            _this.areaBottom = 800;
            _this.areaLeft = 0;
            _this.areaRight = 1400;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._bullets = new Array();
            this._bullets[0] = new objects.Bullet(this.assetManager, 0, 0, this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
            this._bullets[1] = new objects.Bullet(this.assetManager, 0, 0, this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
            this._bullets[2] = new objects.Bullet(this.assetManager, 0, 0, this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
            this._bullets[3] = new objects.Bullet(this.assetManager, 0, 0, this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
            this._bullets[4] = new objects.Bullet(this.assetManager, 0, 0, this.areaLeft, this.areaTop, this.areaRight, this.areaBottom);
            this._terrain1 = new objects.Terrain(this.assetManager);
            this._terrain2 = new objects.Terrain(this.assetManager);
            this._barrier1 = new objects.Barrier(this.assetManager, 750, 450);
            this._barrier2 = new objects.Barrier(this.assetManager, 350, 400);
            this._barrier3 = new objects.Barrier(this.assetManager, 1000, 250);
            this._barrier4 = new objects.Barrier(this.assetManager, 1000, 700);
            this._barrier5 = new objects.Barrier(this.assetManager, 200, 650);
            this._tank = new objects.Tank(this.assetManager, (this.areaLeft + this.areaRight) * 0.5, this.areaBottom * 0.9);
            this._enemy = new objects.Enemy(this.assetManager);
            this._labelTankDegree = new objects.Label("Tank Rotation :", "10px", "Arial", "#ff0000", 1400, 10, false);
            this._labelTankX = new objects.Label("Tank X (axis) :", "10px", "Arial", "#ff0000", 1400, 25, false);
            this._labelTankY = new objects.Label("Tank Y (axis) :", "10px", "Arial", "#ff0000", 1400, 40, false);
            this._labelBulletsQty = new objects.Label("Bullets Qty :", "10px", "Arial", "#ff0000", 1400, 55, false);
            this._labelBulletsAnglesList = new objects.Label("Bullets Degree :", "10px", "Arial", "#ff0000", 1400, 70, false);
            this._terrain1.x = 0;
            this._terrain1.y = 0;
            this._terrain2.x = this._terrain1.getBounds().width;
            this._terrain2.y = 0;
            // create scoreboard UI for scene
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            //this._terrain.Update();
            var tank_previous_x = this._tank.x;
            var tank_previous_y = this._tank.y;
            this._tank.Update();
            managers.Collision.Check(this._enemy, this._tank);
            if (this._tank.isColliding) {
                this._tank.x = tank_previous_x;
                this._tank.y = tank_previous_y;
                this._tank.isColliding = false;
            }
            this.checkTankBarrierColision(tank_previous_x, tank_previous_y);
            this._tank.nextBulletCounter++;
            if (this._tank.nextBulletCounter > 10) {
                if (objects.Game.keyboardManager.shoot) {
                    this._tank.bulletsCounter++;
                    this._bullets.forEach(function (bullet) {
                        if (!bullet.isFired) {
                            bullet.fire(_this._tank.x + _this._tank.halfWidth, _this._tank.y, _this._tank.getAngle());
                            _this.addChild(bullet);
                        }
                    });
                    console.log(this._tank.rotation);
                    // this._tank.nextBulletCounter=0;
                    // this.addChild( this._bullets[this._tank.bulletsCounter] as (objects.Bullet));
                    this.supportLabels();
                }
            }
            this._bullets.forEach(function (bullet) {
                bullet.updateCache();
                managers.Collision.Check(_this._enemy, bullet);
                if (bullet.isColliding)
                    bullet.destroyBullet();
                _this.checkBulletBarrierCollision(bullet);
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
            if (this._scoreBoard.Health <= 0) {
                objects.Game.currentScene = config.Scene.OVER;
            }
        };
        PlayScene.prototype.supportLabels = function () {
            this._labelTankDegree.text = "Tank Rotation : " + this._tank.rotation + "o";
            this._labelTankX.text = "Tank X (axis) :" + this._tank.x;
            this._labelTankY.text = "Tank Y (axis) :" + this._tank.y;
            this._labelBulletsQty.text = "Bullets Qty :" + this._tank.bulletsCounter;
            this._labelBulletsAnglesList.text = "Bullets Degree :" + this._tank.getAngle();
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
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
        };
        PlayScene.prototype.checkTankBarrierColision = function (tank_previous_x, tank_previous_y) {
            managers.Collision.Check(this._barrier1, this._tank);
            if (this._tank.isColliding) {
                this._tank.x = tank_previous_x;
                this._tank.y = tank_previous_y;
                this._tank.isColliding = false;
            }
            managers.Collision.Check(this._barrier2, this._tank);
            if (this._tank.isColliding) {
                this._tank.x = tank_previous_x;
                this._tank.y = tank_previous_y;
                this._tank.isColliding = false;
            }
            managers.Collision.Check(this._barrier3, this._tank);
            if (this._tank.isColliding) {
                this._tank.x = tank_previous_x;
                this._tank.y = tank_previous_y;
                this._tank.isColliding = false;
            }
            managers.Collision.Check(this._barrier4, this._tank);
            if (this._tank.isColliding) {
                this._tank.x = tank_previous_x;
                this._tank.y = tank_previous_y;
                this._tank.isColliding = false;
            }
            managers.Collision.Check(this._barrier5, this._tank);
            if (this._tank.isColliding) {
                this._tank.x = tank_previous_x;
                this._tank.y = tank_previous_y;
                this._tank.isColliding = false;
            }
        };
        PlayScene.prototype.checkBulletBarrierCollision = function (bullet) {
            managers.Collision.Check(this._barrier1, bullet);
            if (bullet.isColliding)
                bullet.destroyBullet();
            managers.Collision.Check(this._barrier2, bullet);
            if (bullet.isColliding)
                bullet.destroyBullet();
            managers.Collision.Check(this._barrier3, bullet);
            if (bullet.isColliding)
                bullet.destroyBullet();
            managers.Collision.Check(this._barrier4, bullet);
            if (bullet.isColliding)
                bullet.destroyBullet();
            managers.Collision.Check(this._barrier5, bullet);
            if (bullet.isColliding)
                bullet.destroyBullet();
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map