// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.reset();
    this.score = 0;
    this.numlive = 3;
    this.live = 'images/Heart.png'
    this.sprite = 'images/char-boy.png';
};
//更新玩家相关数据
Player.prototype.update = function () {
    this.isConficted(allEnemies);
};
//渲染玩家相关数据
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 10);
    // ctx.fillRect(0, 5, COL_WIDTH * 5, 30);
    ctx.clearRect(0, 5, COL_WIDTH * 5, 30);
    ctx.font = "30px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("Score: "+this.score, 0, 30 , COL_WIDTH*2);
    for(let i = 1; i<= this.numlive ; i++){
        ctx.drawImage(Resources.get(this.live),COL_WIDTH * 5 - 30 * i,0,101/4,171/4);
    }
};
//获取键盘操作并作出数据更新
Player.prototype.handleInput = function (Keys) {
    if(!Keys){
        return ;
    }
    switch (Keys) {
        case 'left':
            this.x -= COL_WIDTH;
            if (this.x < 0) {
                this.x = 0;
                //防止玩家超出最左边边界还加上分数
                this.score -= 1;
            }
            break;
        case 'right':
            this.x += COL_WIDTH;
            if (this.x > COL_WIDTH * (numCol - 1)) {
                this.x = COL_WIDTH * (numCol - 1);
                //防止玩家超出最右边边界还加上分数
                this.score -= 1;
            }
            break;
        case 'up':
            this.y -= ROW_WIDTH;
            //到达河流重置玩家位置
            if (this.y == 0) {
                this.score += 10;
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
    if (this.x >= 0 && this.x <= COL_WIDTH * (numCol - 1) 
    && this.y >0 && this.y < ROW_WIDTH * (numRow - 1) ) {
        this.score += 1;
    }
};
//检查碰撞
Player.prototype.isConficted = function (enemies) {
    for (const enemy of enemies) {
        if(this.y == enemy.y){
            if (Math.abs(this.x - enemy.x) < 80){
                if (this.numlive > 1){
                    this.numlive -= 1;
                    this.reset();
                }else{
                    alert("游戏结束");
                }
                this.score -= 5;
                if(this.score<0){
                    this.score = 0;
                }
            }
        }
    }
};
//初始化和重置人物的位置
Player.prototype.reset = function () {
    this.x = COL_WIDTH * 2;
    this.y = ROW_WIDTH * 5;
};