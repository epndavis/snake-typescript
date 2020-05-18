class Snake {
    game: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D 
    xVelocity = 0
    yVelocity = 0
    tail = 5

    constructor(public canvasElement: HTMLCanvasElement) {    
        if (canvasElement.getContext) {
            this.canvas = canvasElement
            this.ctx = canvasElement.getContext('2d')
        } else {
            console.error('Canvas is not support in your browser!')
        }
    }

    start(): void {
        document.addEventListener('keypress', this.move)

        this.game = setInterval(this.play, 100)
    }

    stop(): void {
        document.removeEventListener('keypress', this.move)

        clearInterval(this.game)
    }

    play(): void {
        console.log('game')
    }

    move(event: KeyboardEvent): void {
        const key:number = event.which || event.keyCode

        switch (key) {
            case 37: 
                //Left
                this.xVelocity = 0
                this.yVelocity = 0
            break
            case 38:
                //Up
                this.xVelocity = 0
                this.yVelocity = 0
            break
            case 39:
                //Right
                this.xVelocity = 0
                this.yVelocity = 0
            break
            case 40:
                //Down
                this.xVelocity = 0
                this.yVelocity = 0
            break
        }
    }
}
