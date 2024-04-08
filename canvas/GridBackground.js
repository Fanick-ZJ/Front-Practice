export  default class GridBackground {
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
    gridWidth = 10

    isClicked = false

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.origin = { x: canvas.width / 2, y: canvas.height / 2 }

        canvas.addEventListener('mousedown', () => {
            this.isClicked = true
        })

        canvas.addEventListener('mouseup', () => {
            this.isClicked = false
        })

        canvas.addEventListener('mousemove', (e) => {
            if (this.isClicked) {
                this.onDrag(e.movementX, e.movementY)
            }
        })
    }

    draw() {
        this.clear()
        this.drawGrid()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawGrid() {
        // 大网格宽度
        const bigGridWidth = this.gridWidth * this.scaleLevel
        // canvas 中 笛卡尔坐标系的范围
        const canvasStartX =  -this.origin.x
        const canvasStartY =  -this.origin.y
        const drawStartX = Math.ceil(Math.abs(canvasStartX % this.gridWidth) / this.gridWidth) * this.gridWidth
        const drawStartY = Math.ceil(Math.abs(canvasStartY % this.gridWidth) / this.gridWidth) * this.gridWidth
        // 绘制平行于y轴的网格
        for (let i = drawStartX; i < this.canvas.width; i += this.gridWidth) {
            this.ctx.beginPath()
            this.ctx.moveTo(i, 0)
            this.ctx.lineTo(i, this.canvas.height)
            this.ctx.strokeStyle = i % bigGridWidth === 0
                            ? this.bigColor
                            : this.smallColor
            this.ctx.stroke()
        }
        // 绘制平行于x轴的网格
        for (let i = drawStartY; i < this.canvas.height; i += this.gridWidth) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, i)
            this.ctx.lineTo(this.canvas.width, i)
            this.ctx.strokeStyle = i % bigGridWidth === 0
                            ? this.bigColor
                            : this.smallColor
            this.ctx.stroke()
        }
        this.ctx.save()
        // 绘制原点
        this.ctx.beginPath()
        this.ctx.arc(this.origin.x - 2.5, this.origin.y - 2.5, 5, 0, Math.PI * 2)
        this.ctx.fillStyle = 'red'
        this.ctx.fill()
        this.ctx.restore()
    }

    onDrag(x, y) {
        this.origin.x += x
        this.origin.y += y
        this.draw()
    }
}