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
var objects;
(function (objects) {
    var Tank = /** @class */ (function (_super) {
        __extends(Tank, _super);
        // Constructor
        function Tank(assetManager, x, y) {
            var _this = _super.call(this, assetManager, "tank") || this;
            _this.fuelConsumeRate = 10; // 10 default
            // public properties
            _this.bulletsCounter = 0;
            _this.nextBulletCounter = 0;
            _this.assetManager = assetManager;
            _this.x = x;
            _this.y = y;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Tank.prototype.Start = function () {
        };
        // updates the game object every frame
        Tank.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // reset the objects location to some value
        Tank.prototype.Reset = function () {
        };
        // move the object to some new location
        Tank.prototype.Move = function () {
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
            if (objects.Game.keyboardManager.moveLeft) {
                if (objects.Game.scoreBoard.Fuel > 0) {
                    objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
                    this.x -= 5;
                }
                this.rotation = 270;
            }
            if (objects.Game.keyboardManager.moveRight) {
                if (objects.Game.scoreBoard.Fuel > 0) {
                    objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
                    this.x += 5;
                }
                this.rotation = 90;
            }
            if (objects.Game.keyboardManager.moveBackward) {
                if (objects.Game.scoreBoard.Fuel > 0) {
                    objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
                    this.y += 5;
                }
                this.rotation = 180;
            }
            if (objects.Game.keyboardManager.moveForward) {
                if (objects.Game.scoreBoard.Fuel > 0) {
                    objects.Game.scoreBoard.Fuel -= this.fuelConsumeRate;
                    this.y -= 5;
                }
                this.rotation = 0;
            }
        };
        // check to see if some boundary has been passed
        Tank.prototype.CheckBounds = function () {
            // right boundary
            if (this.x >= 1500 - this.halfWidth) {
                this.x = 1500 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            // bottom boundary
            if (this.y >= 800 - this.halfHeight) {
                this.y = 800 - this.halfHeight;
            }
            // top boundary
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        Tank.prototype.getAngle = function () {
            if (this.rotation / 90 <= 1) {
                return 90 - this.rotation;
            }
            else if (this.rotation / 90 <= 2) {
                return 270 + 180 - this.rotation;
            }
            else if (this.rotation / 90 <= 3) {
                return 180 + 270 - this.rotation;
            }
            else {
                return 90 + 360 - this.rotation;
            }
        };
        return Tank;
    }(objects.GameObject));
    objects.Tank = Tank;
})(objects || (objects = {}));
//# sourceMappingURL=tank.js.map