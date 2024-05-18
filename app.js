const main_canvas = document.getElementById("mainCanvas");
const ctx = main_canvas.getContext("2d");
const start_position = 20;

main_canvas.width = Math.floor(window.innerWidth);
main_canvas.height = Math.floor(window.innerHeight);

start_time = Date.now();

const square = {
    // set up start position
    top_side_x1: start_position,
    top_side_y1: start_position,
    top_side_x2: start_position,
    top_side_y2: start_position,
    top_side_colour: 'Lavender',

    right_side_x1: -1,
    right_side_y1: -1,
    right_side_x2: -1,
    right_side_y2: -1,
    right_side_colour: 'SkyBlue',

    bottom_side_x1: -1,
    bottom_side_y1: -1,
    bottom_side_x2: -1,
    bottom_side_y2: -1,
    bottom_side_colour: 'MistyRose',

    left_side_x1: -1,
    left_side_y1: -1,
    left_side_x2: -1,
    left_side_y2: -1,
    left_side_colour: 'PaleTurquoise',

    background_colour: "rgb(255, 255, 255)",
    circle_colour: 'Lavender',

    direction: 0,
    run_counter: 0,
    // start position
    current_x: start_position,
    current_y: start_position,
    max_size: -1,

    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = this.background_colour;
        ctx.fillRect(0, 0, main_canvas.width, main_canvas.height);
        //ctx.font = "50px Arial";
        //ctx.fillText("Hello World", start_position, 80);
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.current_x, this.current_y, 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.circle_colour;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.circle_colour;
        ctx.stroke();


        ctx.beginPath();
        // always draw the top side
        ctx.strokeStyle = this.top_side_colour;
        ctx.lineWidth = 3;
        ctx.moveTo(this.top_side_x1, this.top_side_y1);
        ctx.lineTo(this.top_side_x2, this.top_side_y2);
        ctx.stroke();
        ctx.closePath();

        // draw if needed
        if (this.direction >= 1) {
            ctx.beginPath();
            ctx.strokeStyle = this.right_side_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.right_side_x1, this.right_side_y1);
            ctx.lineTo(this.right_side_x2, this.right_side_y2);
            ctx.stroke();
            ctx.closePath();
        }

        if (this.direction >= 2) {
            ctx.beginPath();
            ctx.strokeStyle = this.bottom_side_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.bottom_side_x1, this.bottom_side_y1);
            ctx.lineTo(this.bottom_side_x2, this.bottom_side_y2);
            ctx.stroke();
            ctx.closePath();
        }

        if (this.direction >= 3) {
            ctx.beginPath();
            ctx.strokeStyle = this.left_side_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.left_side_x1, this.left_side_y1);
            ctx.lineTo(this.left_side_x2, this.left_side_y2);
            ctx.stroke();
            ctx.closePath();
        }
    },

    update: function () {
        //console.log("current x: " + this.current_x + "  current y: " + this.current_y);
        // keep track of line 1 line 2 line 3 line 4
        // give points based on how close to the line your are
        if (this.direction == 0) {
            // right
            this.current_x = this.current_x + 2;
            this.top_side_x2 = this.current_x;
            // time this path
            var milliseconds = Date.now() - start_time;
            if (milliseconds >= 4000) {
                this.max_size = this.current_x;
                // now we can draw the square based on time
                this.right_side_x1 = this.max_size;
                this.right_side_x2 = this.max_size;
                this.right_side_y1 = start_position;
                this.right_side_y2 = start_position;
                this.circle_colour = this.right_side_colour;
                this.direction += 1;
            }
        } else if (this.direction == 1) {
            this.current_y = this.current_y + 2;
            this.right_side_y2 = this.current_y;
            if (this.current_y >= this.max_size) {
                this.bottom_side_x1 = this.max_size;
                this.bottom_side_x2 = this.max_size;
                this.bottom_side_y1 = this.max_size;
                this.bottom_side_y2 = this.max_size;
                this.circle_colour = this.bottom_side_colour;
                this.direction++;
            }
        } else if (this.direction == 2) {
            this.current_x = this.current_x - 2;
            this.bottom_side_x2 = this.current_x;
            if (this.current_x <= start_position) {
                this.left_side_x1 = start_position;
                this.left_side_x2 = start_position;
                this.left_side_y1 = this.max_size;
                this.left_side_y2 = this.max_size;
                this.circle_colour = this.left_side_colour;
                this.direction++;
            }
        } else {
            this.current_y = this.current_y - 2;
            this.left_side_y2 = this.current_y;
            if (this.current_y <= start_position) {
                this.top_side_x1 = start_position;
                this.top_side_x2 = start_position;
                this.top_side_y1 = start_position;
                this.top_side_y2 = start_position;
                this.circle_colour = this.top_side_colour;
                this.direction = 0;
                // reset the timer
                start_time = Date.now();
            }
        }
    }
}

function main() {
    switch (square.direction) {
        case 0:
            document.getElementById('postionText').innerText = 'Inhale slowly...';
            break;
        case 1:
            document.getElementById('postionText').innerText = 'Hold it in...';
            break;
        case 2:
            document.getElementById('postionText').innerText = 'Exhale slowly...';
            break;
        default:
            document.getElementById('postionText').innerText = 'Pause...';
            break;
    }


    ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
    square.update();
    square.draw();
    requestAnimationFrame(main);
}
requestAnimationFrame(main);