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
    var Barrier = /** @class */ (function (_super) {
        __extends(Barrier, _super);
        // Constructor
        function Barrier(assetManager, x, y) {
            var _this = _super.call(this, assetManager, "barrier") || this;
            _this.x = x;
            _this.y = y;
            _this.Start();
            return _this;
        }
        //Public Methods
        Barrier.prototype.Start = function () {
        };
        Barrier.prototype.Update = function () {
        };
        return Barrier;
    }(objects.GameObject));
    objects.Barrier = Barrier;
})(objects || (objects = {}));
//# sourceMappingURL=barrier.js.map