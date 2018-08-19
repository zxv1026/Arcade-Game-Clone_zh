var Live = function () {
    this.reset();
    this.sprite = 'images/Heart.png';
};
//渲染玩家相关数据
Live.prototype.render = function () {
    // ctx.fillRect(COL_WIDTH * 5 - 30 * this.live, 5, COL_WIDTH * 5, 30);
    ctx.clearRect(COL_WIDTH * 5 - 30 * (this.live+1), 5, COL_WIDTH * 5, 30);
    for(let i = 1; i<= this.live ; i++){
        ctx.drawImage(Resources.get(this.sprite), COL_WIDTH * 5 - 30 * i, 0, 101 / 4, 171 / 4);
    }
};
//玩家与虫子碰撞，生命改变
Live.prototype.collidingInsects = function (score) {
    if(this.live>1){
        this.live -= 1;
    }else{
        alert("游戏结束，"+"本次得分：" +score.score);
        this.reset();
        score.reset();
    }
};
//玩家吃到爱心
Live.prototype.receiveHeart = function () {
    this.live += 1;
    if(this.live>5){
        this.live = 5;
    }
};
//生命初始化和重置
Live.prototype.reset = function () {
    this.live = 3;
}