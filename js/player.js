// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.reset();
    this.sprite = 'images/char-boy.png';
};
//更新玩家相关数据
Player.prototype.update = function () {
    this.isConficted_T(allTreasure);
    this.isConficted(allEnemies);
};
//渲染玩家相关数据
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 10);
};
//获取键盘操作并作出数据更新
Player.prototype.handleInput = function (Keys) {
    if(!Keys){
        return ;
    }
    var lastx = this.x;
    var lasty = this.y;
    switch (Keys) {
        case 'left':
            this.x -= COL_WIDTH;
            if (this.x < 0) {
                this.x = 0;
                //防止玩家超出最左边边界还加上分数
                if (this.y < ROW_WIDTH * (numRow - 1)){
                    score.minusPoints();
                }
            }
            break;
        case 'right':
            this.x += COL_WIDTH;
            if (this.x > COL_WIDTH * (numCol - 1)) {
                this.x = COL_WIDTH * (numCol - 1);
                //防止玩家超出最右边边界还加上分数
                if (this.y < ROW_WIDTH * (numRow - 1)){
                    score.minusPoints();
                }
            }
            break;
        case 'up':
            this.y -= ROW_WIDTH;
            //到达河流重置玩家位置
            if (this.y == 0) {
                score.reachDestination();
                this.reset();
            }
            break;
        case 'down':
            this.y += ROW_WIDTH;
            if (this.y > ROW_WIDTH * (numRow - 1)) {
                this.y = ROW_WIDTH * (numRow - 1);
            }
            break;
        default:
            return;
    }
    if (this.isConficted_O(allObstacle)) {
        this.x = lastx;
        this.y = lasty;
        //防止玩家与障碍物碰撞还继续加分数
        score.minusPoints();
    }
    if (this.x >= 0 && this.x <= COL_WIDTH * (numCol - 1) 
    && this.y >0 && this.y < ROW_WIDTH * (numRow - 1) ) {
        score.personageMovement();
    }
    x = this.x;
    y = this.y;
};
//检查碰撞
Player.prototype.isConficted = function (enemies) {
    for (const enemy of enemies) {
        if(this.y == enemy.y){
            if (Math.abs(this.x - enemy.x) < 80){
                live.collidingInsects();
                score.collidingInsects();
                this.reset();
            }
        }
    }
};
//检查与障碍物的碰撞
Player.prototype.isConficted_O = function (obstacles) {
    for (const obstacle of obstacles) {
        if (this.y == obstacle.y && this.x == obstacle.x) {
            return true;
        }
    }
    return false;
};
//检查与宝物的碰撞
Player.prototype.isConficted_T = function (allTreasure) {
    for (let i=0;i<allTreasure.length;i++) {
        if (this.y == allTreasure[i].y) {
            if (Math.abs(this.x - allTreasure[i].x) < 80) {
                if (allTreasure[i].id == 0) {
                    live.receiveHeart();
                } else if (allTreasure[i].id == 1) {
                    score.receiveKey();
                } else if (allTreasure[i].id == 2) {
                    score.receiveGemBlue();
                } else if (allTreasure[i].id == 3) {
                    score.receiveGemGreen();
                } else if (allTreasure[i].id == 4) {
                    score.receiveGemOrange();
                } else if (allTreasure[i].id == 5) {
                    score.receiveStar();
                }
                position[allTreasure[i].y / ROW_WIDTH][allTreasure[i].x / COL_WIDTH] = true;
                allTreasure.splice(i, 1);
            }
        }
    }
};
//初始化和重置人物的位置
Player.prototype.reset = function () {
    this.x = COL_WIDTH * 2;
    this.y = ROW_WIDTH * 5;
};