var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        // constructors
        function ScoreBoard() {
            this._initalize();
        }
        Object.defineProperty(ScoreBoard.prototype, "Health", {
            // public properties
            get: function () {
                return this._health;
            },
            set: function (newHealth) {
                this._health = newHealth;
                this.HealthLabel.text = "Health: " + this._health + "/10";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (newScore) {
                this._score = newScore;
                this.ScoreLabel.text = "Score: " + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newHighScore) {
                this._highScore = newHighScore;
                this.HighScoreLabel.text = "HighScore: " + this._highScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Fuel", {
            get: function () {
                return this._fuel;
            },
            set: function (newFuel) {
                this._fuel = newFuel;
                this.FuelLabel.text = "Fuel: " + Math.round(this._fuel / 1000) + "/100";
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        ScoreBoard.prototype._initalize = function () {
            this.HealthLabel = new objects.Label("Health: 0/10", "20px", "Consolas", "#00FF00", 10, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Consolas", "#F0F000", 1350, 100 /* use 10 here for final build*/, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "40px", "Consolas", "#00FF00", 800, 380, true);
            this.FuelLabel = new objects.Label("Fuel: 0/100", "20px", "Consolas", "#0000FF", 10, 40, false);
            this.Health = 10;
            this.Score = 0;
            this.HighScore = 0;
            this.Fuel = 100000;
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map