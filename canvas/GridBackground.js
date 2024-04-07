class GridBackground {
    // 原点
    origin = { x: 0, y: 0 }
    // 画布
    canvas = null
    ctx = null

    // 缩放等级，就是说背景网格收缩的倍数，到了10倍，就返回1
    scaleLevel = 10
    scale = 1

    // 坐标网格颜色
    zeroColor = '#358bf3'
    bigColor = '#CCCCCC70'
    smallColor = '#CCCCCC25'

    // 网格宽度
    gridWidth = 5

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.origin = { x: canvas.width / 2, y: canvas.height / 2 }
    }

    drawGrid() {
        ctx.save()
        // 绘制原点
        ctx.beginPath()
        ctx.arc(this.origin.x - 2.5, this.origin.y - 2.5, 5, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.restore()
        // 绘制网格
        // 大网格宽度
        const bigGridWidth = this.gridWidth * this.scaleLevel
        // canvas 中 笛卡尔坐标系的范围
        const canvasStartX =  -(x - this.canvas.width)
        

    }
}