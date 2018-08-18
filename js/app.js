// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var score = new Score();
var live = new Live();
var allTreasure = [];
var allObstacle = [];
function addObstacle() {
    if(allObstacle.length<5){
        const obstacle = new Obstacle();
        allObstacle.push(obstacle);
    }
}
function addTreasure() {
    if (allTreasure.length < 7) {
        const treasure = new Treasure();
        allTreasure.push(treasure);
    }
}
setInterval("addObstacle()", "7000");
setInterval("addTreasure()", "5000");
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
