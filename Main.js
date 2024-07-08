function run(canvas, obj) {

    obj = obj || {}
    this.canvas = canvas
    this.cvs = canvas.getContext("2d")
    this.bgColor = obj.bgColor || "#e8e8e8"
    this.clickedColor = obj.clickedColor || "#00ffff"
    this.boxSize = obj.boxSize || 30
    this.bgWidthLength = 0
    this.bgHeightLength = 0
    this.clickedArr = []
    this.start()
    this.click()
    return this
}
run.prototype.start = function() {

    this.bgWidthLength = parseInt(this.canvas.width / this.boxSize)
    this.bgHeightLength = parseInt(this.canvas.height / this.boxSize)
    this.drawBg()

}
run.prototype.click = function() {

    let move = this.mousemove.bind(this)
    this.canvas.addEventListener("mousedown", function(e) {

        let o = this.computedXY(e.offsetX, e.offsetY)
        this.toggleClick(o)
        this.canvas.addEventListener("mousemove", move)

    }.bind(this))

    this.canvas.addEventListener("mouseup", function(e) {
        this.canvas.removeEventListener("mousemove", move)
    }.bind(this))
}
run.prototype.mousemove = function(e) {
    console.log(e.offsetX, e.offsetY)
    let o = this.computedXY(e.offsetX, e.offsetY)
    this.toggleClick(o, true)
}
run.prototype.computedXY = function(x, y) {

    for (let i = 0; i < this.bgWidthLength; i++) {
        if (x > i * this.boxSize && x < (i + 1) * this.boxSize) {
            x = i
            break;
        }
    }
    for (let i = 0; i < this.bgHeightLength; i++) {
        if (y > i * this.boxSize && y < (i + 1) * this.boxSize) {
            y = i
            break;
        }
    }

    return {
        x,
        y
    }
}
run.prototype.toggleClick = function(o, draw) {
    let has = {}
    has.is = true

    this.clickedArr.forEach(function(item, index) {

        if (item.x === o.x && item.y === o.y) {
            has.is = false
            has.index = index
        }
    })

    if (has.is && time_out >= 1) {
        this.clickedArr.push(o)
        this.drawBgBox(o.x * this.boxSize, o.y * this.boxSize, true)
        time_out = time_out -1;
    }
    if (!has.is && !draw) {
        this.clickedArr.splice(has.index, 1)
        this.drawBgBox(o.x * this.boxSize, o.y * this.boxSize)
    }

}
run.prototype.clean = function() {

    this.clickedArr.forEach(function(o, index) {
        this.drawBgBox(o.x * this.boxSize, o.y * this.boxSize)
    }.bind(this))

    this.clickedArr = []
}
run.prototype.drawBg = function() {

    for (let i = 0; i < this.bgHeightLength; i++) {
        for (let j = 0; j < this.bgWidthLength; j++) {
            this.drawBgBox(j * this.boxSize, i * this.boxSize)
        }
    }
}
run.prototype.drawBgBox = function(x, y, z) {
    //if (time_out >= 1){}
    this.cvs.beginPath()
    this.cvs.fillStyle = z ? rgb: this.bgColor;
    this.cvs.fillRect(x + 1, y + 1, this.boxSize - 1, this.boxSize - 1);
    this.cvs.fill()
    this.cvs.stroke()
    this.cvs.closePath()
    //time_out = time_out - 1;

}

let canvas = document.querySelector(".main canvas")
let cvs = canvas.getContext("2d")
let a = new run(canvas)

let clean = document.querySelector(".clean");
let down = document.querySelector(".down");

clean.onclick = function() {
    a.clean()
};

document.querySelector("#color").onchange = function () 
{
    document.getElementById('color').click(); // 必须添加触发click事件否则不能通过点击确定按钮触发更改颜色
    //document.body.style.background = this.value;
    rgb = structuredClone(this.value);
}

var second;//时 分 秒
second=0;//初始化
time_out = 1;

var clock;//计时器
function resetTimer()//重置
{
    clearInterval(clock);
    second=0;
    document.getElementById('timeValue').value=second;
}

function startTimer()//开始
{
    clock=setInterval(timer,1000);
}

function stopTimer() {
    //停止计时
    clearInterval(clock);
    document.getElementById('timeValue').value=second;
}
//计时函数
function timer(){
    second++;
    document.getElementById('timeValue').value=second;
    if (second == 2){
        time_out = time_out + 1;
        document.getElementById('timeOut').value=time_out;
        second = 0;
    }
}
