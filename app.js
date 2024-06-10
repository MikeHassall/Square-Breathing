// version 1.1
const main_canvas = document.getElementById("mainCanvas");
const ctx = main_canvas.getContext("2d");

main_canvas.width = Math.floor(window.innerWidth);
// add room for page title and button
main_canvas.height = Math.floor(window.innerHeight) - 150;

is_light_bg = false;
is_running = false;
start_time = Date.now();

const square = {
    start_x: 0,
    start_y: 0,
    // top side
    ts_x1: -1,
    ts_y1: -1,
    ts_x2: -1,
    ts_y2: -1,
    ts_colour: "rgb(174, 198, 229)",
    // right side
    rs_x1: -1,
    rs_y1: -1,
    rs_x2: -1,
    rs_y2: -1,
    rs_colour: "rgb(205, 198, 224)",
    // bottom side
    bs_x1: -1,
    bs_y1: -1,
    bs_x2: -1,
    bs_y2: -1,
    bs_colour: "rgb(245, 198, 205)",
    // left side
    ls_x1: -1,
    ls_y1: -1,
    ls_x2: -1,
    ls_y2: -1,
    ls_colour: "rgb(167, 221, 221)",

    text_colour: "rgb(241, 186, 141)",
    background_colour: "#222222",
    circle_colour: this.ts_colour,

    direction: -1,
    run_counter: 0,
    current_x: 0,
    current_y: 0,
    max_size: -1,
    increment_size: 0,
    increments: 0,


    draw: function () {

        ctx.font = "50px Arial";
        ctx.fillStyle = this.text_colour;
        ctx.textAlign = "center";

        switch (square.direction) {

            case 0:
                ctx.fillText("breath in", main_canvas.width / 2, (main_canvas.height / 2)-30);
                ctx.fillText("slowly", main_canvas.width / 2, (main_canvas.height / 2)+30);
                break;
            case 1:
                ctx.fillText("hold it in", main_canvas.width / 2, main_canvas.height / 2);
                break;
            case 2:
                ctx.fillText("breath out", main_canvas.width / 2, (main_canvas.height / 2)-30);
                ctx.fillText("slowly", main_canvas.width / 2, (main_canvas.height / 2)+30);

                break;
            case 3:
                ctx.fillText("pause", main_canvas.width / 2, main_canvas.height / 2);
                break;
            default:
                ctx.fillText("get ready...", main_canvas.width / 2, main_canvas.height / 2);
                break;
        }

        if (this.direction == -1) {
            // calculating start points
            // draw a line from the edge
            ctx.beginPath();
            ctx.strokeStyle = this.background_colour;
            ctx.lineWidth = 1;
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
            ctx.strokeStyle = this.ts_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.ts_x1, this.ts_y1);
            ctx.lineTo(this.ts_x2, this.ts_y2);
            ctx.stroke();
            ctx.closePath();
        }

        if (this.direction >= 1) {
            ctx.beginPath();
            ctx.strokeStyle = this.rs_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.rs_x1, this.rs_y1);
            ctx.lineTo(this.rs_x2, this.rs_y2);
            ctx.stroke();
            ctx.closePath();
        }

        if (this.direction >= 2) {
            ctx.beginPath();
            ctx.strokeStyle = this.bs_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.bs_x1, this.bs_y1);
            ctx.lineTo(this.bs_x2, this.bs_y2);
            ctx.stroke();
            ctx.closePath();
        }

        if (this.direction >= 3) {
            ctx.beginPath();
            ctx.strokeStyle = this.ls_colour;
            ctx.lineWidth = 3;
            ctx.moveTo(this.ls_x1, this.ls_y1);
            ctx.lineTo(this.ls_x2, this.ls_y2);
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

                this.ts_x1 = this.start_x;
                this.ts_y1 = this.start_y;
                this.ts_x2 = this.start_x;
                this.ts_y2 = this.start_y;

                this.circle_colour = this.ts_colour;
                this.text_colour = this.ts_colour

                start_time = Date.now();
            }
        }
        else if (this.direction == 0) {
            // right
            this.current_x = this.current_x + this.increment_size;
            this.ts_x2 = this.current_x;
            // always time this path to adjust the gridsize/time
            var milliseconds = Date.now() - start_time;
            if (milliseconds >= 4000) {
                this.max_size = this.current_x - this.start_x;
                // now we can draw the square based on time
                this.rs_x1 = this.current_x;
                this.rs_x2 = this.current_x;
                this.rs_y1 = this.start_y;
                this.rs_y2 = this.start_y;
                this.circle_colour = this.rs_colour;
                this.text_colour = this.rs_colour;

                this.direction += 1;
            }
        } else if (this.direction == 1) {
            // down
            let max_check = this.max_size + this.start_y;
            this.current_y = this.current_y + this.increment_size;
            this.rs_y2 = this.current_y;

            if (this.current_y >= max_check) {
                this.bs_x1 = this.current_x;
                this.bs_x2 = this.current_x;
                this.bs_y1 = this.current_y;
                this.bs_y2 = this.current_y;
                this.circle_colour = this.bs_colour;
                this.text_colour = this.bs_colour;

                this.direction++;
            }
        } else if (this.direction == 2) {
            // left
            this.current_x = this.current_x - this.increment_size;
            this.bs_x2 = this.current_x;
            if (this.current_x <= this.start_x) {
                this.ls_x1 = this.start_x;
                this.ls_x2 = this.start_x;
                this.ls_y1 = this.current_y;
                this.ls_y2 = this.current_y;
                this.circle_colour = this.ls_colour;
                this.text_colour = this.ls_colour;

                this.direction++;
            }
        } else {
            // up
            this.current_y = this.current_y - this.increment_size;
            this.ls_y2 = this.current_y;
            if (this.current_y <= this.start_y) {
                this.ts_x1 = this.start_x;
                this.ts_x2 = this.start_x;
                this.ts_y1 = this.start_y;
                this.ts_y2 = this.start_y;
                this.circle_colour = this.ts_colour;
                this.text_colour = this.ts_colour;

                this.direction = 0;
                // reset the timer
                start_time = Date.now();
            }
        }
    },
    
    reset: function () {
        this.start_x = 0;
        this.start_y = 0;
        this.ts_x1 = -1;
        this.ts_y1 = -1;
        this.ts_x2 = -1;
        this.ts_y2 = -1;
        
        this.rs_x1= -1;
        this.rs_y1= -1;
        this.rs_x2= -1;
        this.rs_y2= -1;
    
        this.bs_x1= -1;
        this.bs_y1= -1;
        this.bs_x2= -1;
        this.bs_y2= -1;
    
        this.ls_x1= -1;
        this.ls_y1= -1;
        this.ls_x2= -1;
        this.ls_y2= -1;


        this.text_colour = "rgb(241, 186, 141)";
        this.background_colour = "rgb(255, 255, 255)";
        this.circle_colour = "rgb(174, 198, 229)";
    
        this.direction = -1;
        this.run_counter = 0;
        this.current_x = 0;
        this.current_y = 0;
        this.max_size = -1;
        this.increment_size = 0;
        this.increments = 0;
    }
}

function startStopButtonClicked() {
    btn = document.getElementById('start-stop-button');
    is_running = !is_running;
    if (is_running) {
        btn.innerHTML = "Stop";

        start_time = Date.now();
        requestAnimationFrame(runProcess);
    } else {
        btn.innerHTML = "Start";
    }
}

function colourButtonClicked() {
    let btn = document.getElementById('dark-light-button');
    is_light_bg = !is_light_bg;
    if (is_light_bg) {
        btn.innerHTML = "Dark";
        document.body.style.backgroundColor = "#F3FAFD";
        square.background_colour = "#F3FAFD";
    } else {
        btn.innerHTML = "Light";
        document.body.style.backgroundColor = "#222222";
        square.background_colour = "#222222";
    }
}

function runProcess() {
    ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);

    if (is_running) {
        square.update();
        square.draw();
        requestAnimationFrame(runProcess);
    }else{
        main_canvas.width = Math.floor(window.innerWidth);
        main_canvas.height = Math.floor(window.innerHeight) - 150;
        square.reset();

    }
}