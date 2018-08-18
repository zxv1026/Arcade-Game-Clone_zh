// 这是我们的玩家要躲避的敌人 
var Enemy = function () {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.iscollision = testCollision;
    this.reset();
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    //当检查玩家和虫子的碰撞，虫子的位置
    if(this.iscollision){
        this.x = COL_WIDTH * 2;
        this.y = ROW_WIDTH * 3;
        this.speed = 0;
    }
};
//初始化Enemy的位置和速度和重置Enemy的位置和速度
Enemy.prototype.reset = function () {
    this.x = -COL_WIDTH;
    this.y = (Math.round(Math.random() * 3) + 1) * ROW_WIDTH;
    this.speed = Math.random() * 100 + 50;
};
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    //虫子超出边界，重新初始化虫子的位置和速度
    if(this.x > COL_WIDTH * numCol){
        this.reset();
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y-20);
};