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
        if (this.y < ROW_WIDTH * (numRow - 1)){
            score.minusPoints();
        }
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
                score.collidingInsects();
                this.reset();
                live.collidingInsects(score);
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
                    player.receiveKey(allObstacle);
                } else if (allTreasure[i].id == 2) {
                    score.receiveGemBlue();
                    player.receiveGemBlue(allEnemies);
                } else if (allTreasure[i].id == 3) {
                    score.receiveGemGreen();
                    player.receiveGemGreen(allEnemies);
                } else if (allTreasure[i].id == 4) {
                    score.receiveGemOrange();
                    player.receiveGemOrange(allEnemies);
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
//算2点之间的距离
function Distance(x1,y1,x2,y2) {
    var a = Math.abs(x1 - x2);
    var b = Math.abs(y1 - y2);
    var s = Math.pow((a * a + b * b), 0.5);
    return s;
}
//玩家吃掉钥匙
Player.prototype.receiveKey = function (allObstacle) {
    if(allObstacle.length>0){
        var distance = Distance(this.x, this.y, allObstacle[0].x, allObstacle[0].y);
        var coordinate = 0;
    }
    for (let i = 0; i < allObstacle.length; i++) {
        var d = Distance(this.x, this.y, allObstacle[i].x, allObstacle[i].y);
        if (distance > d)
        {
            distance = d;
            coordinate = i;
        }
        if(i == allObstacle.length-1){
            position[allObstacle[coordinate].y / ROW_WIDTH][allObstacle[coordinate].x / COL_WIDTH] = true;
            allObstacle.splice(coordinate, 1);
        }
    }
};
//玩家吃到蓝宝石
Player.prototype.receiveGemBlue = function (enemies) {
    for (const enemy of enemies) {
        enemy.x = -COL_WIDTH * 2;
    }
};
//玩家吃到绿宝石
Player.prototype.receiveGemGreen = function (enemies) {
    for (const enemy of enemies) {
        enemy.speed *= 2;
    }
};
//玩家吃到黄宝石
Player.prototype.receiveGemOrange = function (enemies) {
    for (const enemy of enemies) {
        enemy.speed /= 2;
    }
};
//选择人物
function selectPlayer1() {
    player.sprite = 'images/char-boy.png';
    player.render();
}

function selectPlayer2() {
    player.sprite = 'images/char-cat-girl.png';
    player.render();
}

function selectPlayer3() {
    player.sprite = 'images/char-horn-girl.png';
    player.render();
}

function selectPlayer4() {
    player.sprite = 'images/char-pink-girl.png';
    player.render();
}

function selectPlayer5() {
    player.sprite = 'images/char-princess-girl.png';
    player.render();
}