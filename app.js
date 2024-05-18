const main_canvas = document.getElementById("mainCanvas");
const ctx = main_canvas.getContext("2d");

main_canvas.width = Math.floor(window.innerWidth);
// add room for page title
main_canvas.height = Math.floor(window.innerHeight) - 100;

start_time = Date.now();

const square = {
    start_x: 0,
    start_y: 0,
    top_side_x1: -1,
    top_side_y1: -1,
    top_side_x2: -1,
    top_side_y2: -1,
    top_side_colour: "rgb(174, 198, 229)",

    right_side_x1: -1,
    right_side_y1: -1,
    right_side_x2: -1,
    right_side_y2: -1,
    right_side_colour: "rgb(205, 198, 224)",

    bottom_side_x1: -1,
    bottom_side_y1: -1,
    bottom_side_x2: -1,
    bottom_side_y2: -1,
    bottom_side_colour: "rgb(245, 198, 205)",

    left_side_x1: -1,
    left_side_y1: -1,
    left_side_x2: -1,
    left_side_y2: -1,
    left_side_colour: "rgb(167, 221, 221)",

    text_colour: "rgb(241, 186, 141)",
    background_colour: "rgb(255, 255, 255)",
    circle_colour: "rgb(174, 198, 229)",

    direction: -1,
    run_counter: 0,
    current_x: 0,
    current_y: 0,
    max_size: -1,
    increment_size: 0,
    increments: 0,


    draw: function () {

        ctx.font = "30px Arial";
        ctx.fillStyle = this.text_colour;
        ctx.textAlign = "center";

        switch (square.direction) {

            case 0:
                ctx.fillText("breath in slowly", main_canvas.width / 2, main_canvas.height / 2);
                break;
            case 1:
                ctx.fillText("hold it in", main_canvas.width / 2, main_canvas.height / 2);
                break;
            case 2:
                ctx.fillText("breath out slowly", main_canvas.width / 2, main_canvas.height / 2);
                break;
            case 3:
                ctx.fillText("pause", main_canvas.width / 2, main_canvas.height / 2);
                break;
            default:
                ctx.fillText("Get Ready...", main_canvas.width / 2, main_canvas.height / 2);
                break;
        }

        if (this.direction == -1) {
            // calculating start points
            // draw a line from the edge
            ctx.beginPath();
            ctx.strokeStyle = this.background_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(0, 5);
            ctx.lineTo(this.increments, 5);
            ctx.stroke();
            ctx.closePath();
        }

        if (this.direction >= 0) {
            ctx.beginPath();
            ctx.arc(this.current_x, this.current_y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.circle_colour;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.circle_colour;
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.strokeStyle = this.top_side_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.top_side_x1, this.top_side_y1);
            ctx.lineTo(this.top_side_x2, this.top_side_y2);
            ctx.stroke();
            ctx.closePath();
        }

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
        if (this.direction == -1) {
            // first run measures the number of 
            var milliseconds = Date.now() - start_time;
            this.increments = this.increments + 1;
            if (milliseconds >= 1000) {
                // test was 1 second, need 4 seconds
                this.increments = this.increments * 4;
                // current x is how far we can go
                if (main_canvas.width > main_canvas.height) {
                    // use the height
                    this.increment_size = (main_canvas.height - 100) / (this.increments);
                } else {
                    // use the width
                    this.increment_size = (main_canvas.width - 100) / (this.increments);
                }
                this.increment_size = (Math.floor(this.increment_size * 10) / 10)

                this.direction = 0;
                this.max_size = Math.ceil(this.increments * this.increment_size);
                this.start_x = Math.floor((main_canvas.width - this.max_size) / 2);
                this.start_y = Math.floor((main_canvas.height - this.max_size) / 2);

                this.current_x = this.start_x;
                this.current_y = this.start_y;

                this.top_side_x1 = this.start_x;
                this.top_side_y1 = this.start_y;
                this.top_side_x2 = this.start_x;
                this.top_side_y2 = this.start_y;

                this.circle_colour = this.top_side_colour;
                this.text_colour = this.top_side_colour

                start_time = Date.now();
            }
        }
        else if (this.direction == 0) {
            // right
            this.current_x = this.current_x + this.increment_size;
            this.top_side_x2 = this.current_x;
            // always time this path to adjust the gridsize/time
            var milliseconds = Date.now() - start_time;
            if (milliseconds >= 4000) {
                this.max_size = this.current_x - this.start_x;
                // now we can draw the square based on time
                this.right_side_x1 = this.current_x;
                this.right_side_x2 = this.current_x;
                this.right_side_y1 = this.start_y;
                this.right_side_y2 = this.start_y;
                this.circle_colour = this.right_side_colour;
                this.text_colour = this.right_side_colour;

                this.direction += 1;
            }
        } else if (this.direction == 1) {
            // down
            let max_check = this.max_size + this.start_y;
            this.current_y = this.current_y + this.increment_size;
            this.right_side_y2 = this.current_y;

            if (this.current_y >= max_check) {
                this.bottom_side_x1 = this.current_x;
                this.bottom_side_x2 = this.current_x;
                this.bottom_side_y1 = this.current_y;
                this.bottom_side_y2 = this.current_y;
                this.circle_colour = this.bottom_side_colour;
                this.text_colour = this.bottom_side_colour;

                this.direction++;
            }
        } else if (this.direction == 2) {
            // left
            this.current_x = this.current_x - this.increment_size;
            this.bottom_side_x2 = this.current_x;
            if (this.current_x <= this.start_x) {
                this.left_side_x1 = this.start_x;
                this.left_side_x2 = this.start_x;
                this.left_side_y1 = this.current_y;
                this.left_side_y2 = this.current_y;
                this.circle_colour = this.left_side_colour;
                this.text_colour = this.left_side_colour;

                this.direction++;
            }
        } else {
            // up
            this.current_y = this.current_y - this.increment_size;
            this.left_side_y2 = this.current_y;
            if (this.current_y <= this.start_y) {
                this.top_side_x1 = this.start_x;
                this.top_side_x2 = this.start_x;
                this.top_side_y1 = this.start_y;
                this.top_side_y2 = this.start_y;
                this.circle_colour = this.top_side_colour;
                this.text_colour = this.top_side_colour;

                this.direction = 0;
                // reset the timer
                start_time = Date.now();
            }
        }
    }
}

function main() {
    ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
    square.update();
    square.draw();
    requestAnimationFrame(main);
}
requestAnimationFrame(main);