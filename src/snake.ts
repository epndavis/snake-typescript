interface Coordinates {
    x: number,
    y: number
}

export default class Snake {
    game: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D 
    xVelocity = 0
    yVelocity = 0
    tail = 5
    xPosition = 10
    yPosition = 10
    positions: Coordinates[] = []

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

        this.xPosition += this.xVelocity
        this.yPosition += this.yVelocity

        this.ctx.fillStyle = 'white'

        for (let i = 0; i < this.positions.length; i++) {
            const position = this.positions[i]
            this.ctx.fillRect(position.x * 10, position.y * 10, 10, 10)
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
