import Snake from '../src/snake'

let snake = new Snake(document.getElementById('snake'))

document.getElementById('start').addEventListener('click', function() {
    snake.start()
})

document.getElementById('stop').addEventListener('click', function() {
    snake.stop()
})

