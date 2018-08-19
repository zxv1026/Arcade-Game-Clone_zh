var Life = function () {
    this.reset();
    this.sprite = 'images/Heart.png';
};
//渲染玩家相关数据
Life.prototype.render = function () {
    // ctx.fillRect(COL_WIDTH * 5 - 30 * this.life, 5, COL_WIDTH * 5, 30);
    ctx.clearRect(COL_WIDTH * 5 - 30 * (this.life+1), 5, COL_WIDTH * 5, 30);
    for(let i = 1; i<= this.life ; i++){
        ctx.drawImage(Resources.get(this.sprite), COL_WIDTH * 5 - 30 * i, 0, 101 / 4, 171 / 4);
    }
};
//玩家与虫子碰撞，生命改变
Life.prototype.collidingInsects = function (score) {
    if(this.life>1){
        this.life -= 1;
    }else{
        alert("游戏结束，"+"本次得分：" +score.score);
        this.reset();
        score.reset();
    }
};
//玩家吃到爱心
Life.prototype.receiveHeart = function () {
    this.life += 1;
    if(this.life>5){
        this.life = 5;
    }
};
//生命初始化和重置
Life.prototype.reset = function () {
    this.life = 3;
}