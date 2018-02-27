module managers {
    export class ScoreBoard {
        // private instance variables
        private _health:number;
        private _score:number;
        private _highScore:number;
        private _fuel;

        // public Instance variables
        public HealthLabel: objects.Label;
        public ScoreLabel: objects.Label;
        public HighScoreLabel: objects.Label;
        public FuelLabel: objects.Label;

        // public properties
        get Health():number{
            return this._health;
        }

        set Health(newHealth:number){
            this._health = newHealth;
            this.HealthLabel.text = "Health: " + this._health + "/10";
        }

        get Score():number{
            return this._score;
        }

        set Score(newScore:number){
            this._score = newScore;
            this.ScoreLabel.text = "Score: " + this._score;
        }

        get HighScore():number{
            return this._highScore;
        }

        set HighScore(newHighScore:number){
            this._highScore = newHighScore;
            this.HighScoreLabel.text = "HighScore: " + this._highScore;
        }

        get Fuel():number{
            return this._fuel;
        }

        set Fuel(newFuel:number){
            this._fuel = newFuel;
            this.FuelLabel.text = "Fuel: " + Math.round(this._fuel/1000) + "/100";
        }

        // constructors
        constructor(){
            this._initalize();
        }

        // private methods
        private _initalize():void{
            this.HealthLabel = new objects.Label("Health: 0/10", "20px", "Consolas", "#00FF00", 10, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Consolas", "#F0F000", 1350, 100 /* use 10 here for final build*/, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "40px", "Consolas", "#00FF00", 800, 380, true);
            this.FuelLabel = new objects.Label("Fuel: 0/100", "20px", "Consolas", "#0000FF", 10, 40, false);

            this.Health = 10;
            this.Score = 0;
            this.HighScore = 0;
            this.Fuel = 100000;
        }

        // public methods

    }
}