// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.x = COL_WIDTH * 2;
    this.y = ROW_WIDTH * 5;
    this.sprite = 'images/char-boy.png';
};
//更新玩家相关数据
Player.prototype.update = function () {

};
//渲染玩家相关数据
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 10);
};
//获取键盘操作并作出数据更新
Player.prototype.handleInput = function (Keys) {
    switch (Keys) {
        case 'left':
            this.x -= COL_WIDTH;
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case 'right':
            this.x += COL_WIDTH;
            if (this.x > COL_WIDTH * (numCol - 1)) {
                this.x = COL_WIDTH * (numCol - 1);
            }
            break;
        case 'up':
            this.y -= ROW_WIDTH;
            if (this.y < 0) {
                this.y = 0;
            }
            break;
        case 'down':
            this.y += ROW_WIDTH;
            if (this.y > ROW_WIDTH * (numRow - 1)) {
                this.y = ROW_WIDTH * (numRow - 1);
            }
            break;
        default:
            break;
    }
};