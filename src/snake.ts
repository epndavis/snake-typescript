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
    gridSize: Coordinates = {
        x: 20,
        y: 20
    }
    apple: Coordinates

    constructor(public canvasElement: HTMLCanvasElement) {  
        // Check if browser supports the canvas context  
        if (canvasElement.getContext) {
            this.canvas = canvasElement
            this.ctx = canvasElement.getContext('2d')
            this.apple = this.appleSpawn()
        } else {
            console.error('Canvas is not supported in your browser!')
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
        // Redraw the canvas
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        // Draw apple
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.apple.x * this.tileSize, this.apple.y * this.tileSize, this.tileSize, this.tileSize)

        // Set new positioning based on the snake direction
        this.xPosition += this.xVelocity
        this.yPosition += this.yVelocity

        // If snake exits grid teleport to opposite side
        if (this.xPosition > this.gridSize.x - 1) {
            this.xPosition = 0
        }

        if (this.xPosition < 0) {
            this.xPosition = this.gridSize.x - 1
        }

        if (this.yPosition > this.gridSize.y - 1) {
            this.yPosition = 0
        }

        if (this.yPosition < 0) {
            this.yPosition = this.gridSize.y - 1
        }
        
        // Check if snake has eaten the apple
        if (this.apple.x === this.xPosition && this.apple.y === this.yPosition) {
            this.tail++

            this.apple = this.appleSpawn()
        }


        // Draw the snake
        this.ctx.fillStyle = '#83eb34'

        for (let i = 0; i < this.positions.length; i++) {
            const position = this.positions[i]
            this.ctx.fillRect(position.x * this.gridSize.x, position.y * this.gridSize.y, this.tileSize, this.tileSize)

            if (position.x === this.xPosition && position.y === this.yPosition) {
                return this.die()
            }
        }

        // Add the snakes new position to array of coordinates
        this.positions.push({
            x: this.xPosition,
            y: this.yPosition
        })

        // Keep only coordinates that don't exceed the tail length
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

    die = ():void => {
        console.log('Game Over!')

        this.stop()
    }

    appleSpawn():Coordinates {
        return {
            x: Math.floor(Math.random() * Math.floor(this.gridSize.x)),
            y: Math.floor(Math.random() * Math.floor(this.gridSize.y))
        }
    }
}
