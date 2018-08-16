var Score = function () {
    this.score = 0;
};
//渲染分数
Score.prototype.render = function () {
    // ctx.fillRect(0, 5, COL_WIDTH * 2, 30);
    ctx.clearRect(0, 5, COL_WIDTH * 2, 30);
    ctx.font = "30px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("Score: " + this.score, 0, 30, COL_WIDTH * 2);
};
//玩家移动，分数改变
Score.prototype.personageMovement = function () {
    this.score += 1;
};
//防止玩家在不加分的情况下加分
Score.prototype.minusPoints = function () {
    this.score -= 1;
}
//到达河流后，分数改变
Score.prototype.reachDestination = function () {
    this.score += 10;
};
//玩家与虫子碰撞，分数改变
Score.prototype.collidingInsects = function () {
    this.score -= 5;
    //分数不为负数
    if(this.score<0){
        this.score = 0;
    }
};
//玩家吃到钥匙
Score.prototype.receiveKey = function () {
    this.score += 3;
};
//玩家吃到蓝宝石
Score.prototype.receiveGemBlue = function () {
    this.score += 3;
};
//玩家吃到绿宝石
Score.prototype.receiveGemGreen = function () {
    this.score += 3;
};
//玩家吃到黄宝石
Score.prototype.receiveGemOrange = function () {
    this.score += 3;
};
//玩家吃到星
Score.prototype.receiveStar = function () {
    this.score += 3;
};