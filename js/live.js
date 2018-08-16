var Live = function () {
    this.live = 3;
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
Live.prototype.collidingInsects = function () {
    if(this.live>1){
        this.live -= 1;
    }else{
        alert("游戏结束");
    }
};