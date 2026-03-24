function Ball(xPos, yPos, yVel, color, radius) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.yVel = yVel;
    this.color = color;
    this.radius = radius;
}

function drawBall(ctx, ball) {
    ctx.beginPath();
    ctx.arc(ball.xPos, ball.yPos ,ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function moveBalls(ctx, balls) {
    ctx.clearRect(0, 0, 400, 300);

    for(var i = 0; i < 7; i++) {
        drawBall(ctx, balls[i]);
        balls[i].yPos += balls[i].yVel;
        balls[i].yVel += 1;
        if(balls[i].yPos >= 200 - 60) {
            balls[i].yPos = 200 - 60;
            balls[i].yVel = -balls[i].yVel + 1;
        }
    }   

}

function start() {
    const canvas = document.getElementById("simCanvas");
    const ctx = canvas.getContext("2d");
    var balls = [];
    var colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    for(var i = 0; i < 7; i++) {
        var ball = new Ball(300 - 25 - 50 * i, 20 + 20 * i, 0, colors[i], 10);
        balls.push(ball);
    }

    setInterval(moveBalls, 20, ctx, balls);
}