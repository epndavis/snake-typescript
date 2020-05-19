interface Coordinates {
    x: number,
    y: number
}

export default class Snake {
    game: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D 
    xVelocity = 1
    yVelocity = 0
    tail = 5
    xPosition = 10
    yPosition = 10
    positions: Coordinates[] = []
    tileSize = 20
    tileCount = 20
    apple: Coordinates = {
        x: Math.floor(Math.random() * Math.floor(this.tileCount)),
        y: Math.floor(Math.random() * Math.floor(this.tileCount))
    }

    constructor(public canvasElement: HTMLCanvasElement) {    
        if (canvasElement.getContext) {
            this.canvas = canvasElement
            this.ctx = canvasElement.getContext('2d')
        } else {
            console.error('Canvas is not support in your browser!')
        }
    }

    start(): void {
        document.addEventListener('keydown', this.move)

        this.game = setInterval(this.play, 100)
    }

    stop(): void {
        document.removeEventListener('keydown', this.move)

        clearInterval(this.game)
    }

    play = ():void => {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.apple.x * this.tileSize, this.apple.y * this.tileSize, this.tileSize, this.tileSize)

        this.xPosition += this.xVelocity
        this.yPosition += this.yVelocity

        if (this.apple.x === this.xPosition && this.apple.y === this.yPosition) {
            this.tail++

            this.apple = {
                x: Math.floor(Math.random() * Math.floor(this.tileCount)),
                y: Math.floor(Math.random() * Math.floor(this.tileCount))
            }
        }

        if (this.xPosition > this.tileCount - 1) {
            this.xPosition = 0
        }

        if (this.xPosition < 0) {
            this.xPosition = this.tileCount 
        }

        if (this.yPosition > this.tileCount - 1) {
            this.yPosition = 0
        }

        if (this.yPosition < 0) {
            this.yPosition = this.tileCount 
        }

        this.ctx.fillStyle = 'white'

        for (let i = 0; i < this.positions.length; i++) {
            const position = this.positions[i]
            this.ctx.fillRect(position.x * this.tileSize, position.y * this.tileSize, this.tileSize, this.tileSize)
        }

        this.positions.push({
            x: this.xPosition,
            y: this.yPosition
        })

        if (this.positions.length > this.tail) {
            this.positions.shift()
        }
    }

    move = (event: KeyboardEvent):void => {
        const key:number = event.which || event.keyCode

        switch (key) {
            case 37: 
                //Left
                this.xVelocity = -1
                this.yVelocity = 0
            break
            case 38:
                //Up
                this.xVelocity = 0
                this.yVelocity = -1
            break
            case 39:
                //Right
                this.xVelocity = 1
                this.yVelocity = 0
            break
            case 40:
                //Down
                this.xVelocity = 0
                this.yVelocity = 1
            break
        }
    }
}
