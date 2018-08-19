//道具
var Prop = function () {
    //防止道具重叠，防止道具与玩家的位置重叠
    do {
        var col = Math.round(Math.random() * 4);
        var row = Math.round(Math.random() * 3) + 1;
        this.x = col * COL_WIDTH;
        this.y = row * ROW_WIDTH;
    } while (position[row][col] == false || (this.x == x && this.y == y));
};
//障碍物
var Obstacle = function () {
    Prop.call(this);
    position[this.y/ROW_WIDTH][this.x/COL_WIDTH] = false;
    this.sprite = 'images/Rock.png';
};
Obstacle.prototype = new Prop();
Obstacle.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x+10 , this.y,80,136);
};
//宝物
var Treasure = function () {
    Prop.call(this);
    position[this.y / ROW_WIDTH][this.x / COL_WIDTH] = false;
    this.id = Math.round(Math.random() * 5);
    switch (this.id) {
        case 0:
            this.sprite = 'images/Heart.png';
            break;
        case 1:
            this.sprite = 'images/Key.png';
            break;
        case 2:
            this.sprite = 'images/Gem Blue.png';
            break;
        case 3:
            this.sprite = 'images/Gem Green.png';
            break;
        case 4:
            this.sprite = 'images/Gem Orange.png';
            break;
        case 5:
            this.sprite = 'images/Star.png';
        default:
            break;
    }
};
Treasure.prototype = new Prop();
Treasure.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x+22, this.y+20,60,102);
};
