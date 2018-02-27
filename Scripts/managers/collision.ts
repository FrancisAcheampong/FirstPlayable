module managers{
    export class Collision{

        public static Check(object1:objects.GameObject, object2: objects.GameObject){
            //create 2 Vec2 Objects
            let P1: math.Vec2 = new math.Vec2(object1.x, object1.y);
            let P2: math.Vec2 = new math.Vec2(object2.x, object2.y);

            if(math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)){
                if(!object2.isColliding){
                    object2.isColliding = true;
                    switch(object2.name){
                        case "bullet":
                            objects.Game.scoreBoard.Score += 100;
                            if(objects.Game.HighScore <= objects.Game.scoreBoard.Score){
                                objects.Game.scoreBoard.HighScore = objects.Game.scoreBoard.Score;
                                objects.Game.HighScore = objects.Game.scoreBoard.HighScore;
                            }
                            if(object1.name=="tank") objects.Game.scoreBoard.Health -= 1;
                        break;
                        case "tank":
                            object2.isColliding = true;
                            if(object1.name=="tank") objects.Game.scoreBoard.Health -= 1;
                        break;
                    }
                }
            }
            else{
                object2.isColliding = false;
            }
        }
    }
}