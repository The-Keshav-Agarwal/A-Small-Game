var canvas1 = document.getElementsByClassName('main');
var c1 = canvas1[0].getContext('2d');
var canvas_x = 0;
var canvas_y = 40;
canvas1[0].height = 550;
canvas1[0].width = 1000;
var plank_h = 140;
var plank_w = 10;
var ball_x = 100;
var ball_y = 200;
var ball_dx = 10;
var ball_dy = 10;
var plank2_x = 990;
var plank2_y = 40;
var z=12;
var end = true;
var score = 0;

onload();
function onload()
{
     if(!localStorage.getItem('highscore'))
     {
        localStorage.setItem('highscore','0');
     }
     hs = localStorage.getItem('highscore');
     hs = parseInt(hs);
}
function Text(x,y,font,area)
{
    this.x = x;
    this.y = y;
    this.type = 'text';
    c1.font = font + 'px Arial';
    c1.fillStyle = '#f5f0e1';
    this.text = area;
    c1.fillText(this.text, this.x, this.y);    
}


function Plank(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw=function(){
        c1.fillStyle='#f5f0e1';
        c1.fillRect(this.x,this.y,this.width,this.height);
    }
    this.update= function(y1){
        this.y = y1;
        this.draw();
    }
}

function Ball(x,y,dx,dy)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;
    this.draw = function(){
        c1.beginPath();
        c1.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c1.fillStyle='#ff0000';
        c1.fill();
    }
    this.update=function(){
        this.x+=this.dx;
        this.y+= this.dy;
        if(this.y+this.radius>=canvas1[0].height||this.y-this.radius<=0)
        {
            this.dy = -this.dy;
        }
        if(this.x+this.radius>=canvas1[0].width-paddle2.width)
        {
            z=z+0.4;
            this.dx = -(Math.random()+6)*1.5;
            this.dy = (Math.random()-0.5)*2.5*z;
        }
        if(canvas_x<=this.x-this.radius&&canvas_x+plank_w>=this.x-this.radius&&canvas_y<=this.y+this.radius&&canvas_y+plank_h>=this.y-this.radius)
        {
            this.dx = Math.random()+z;
            this.dy = (Math.random()-0.5)*1.5*z;
            score +=10;
            if(hs<score)
            {
                hs = score;
                localStorage.setItem('highscore',hs);
            }
            if(this.dy>25)
            this.dy=20;
        }
        else if(this.x-this.radius<=0)
        {
            end = false;
        }
        this.draw();
    }
}
var ball = new Ball(ball_x,ball_y,ball_dx,ball_dy);
let paddle = new Plank(canvas_x,canvas_y,10,plank_h);
let paddle2 = new Plank(plank2_x,plank2_y,10,plank_h);
function drawing()
{
         setInterval((e) => {
            c1.clearRect(0,0,canvas1[0].width,canvas1[0].height);
            if(end)
            {
            paddle.update(canvas_y);
            ball.update();
            paddle2.update(ball.y-50-plank_h/2);
            new Text(canvas1[0].width-150,50,20,'Score : '+score);
            new Text(canvas1[0].width-300,50,20,'Best : '+hs);
            }
            if(end==false)
            {
                new Text(400,200,24,'Your Score : '+score);
                new Text(430,250,24,'Best : '+hs);
                new Text(380,300,22,'Click To Continue....');
            }
        }, 20);
}

canvas1[0].addEventListener('click',function(e){
    if(end==false)
    {
    end = true;
    ball.x = 100;
    ball.y = 200;
    ball.dx = 10;
    ball.dy = 10;
    z = 12;
    score =0;
    }
})

function plankdrawing()
{
    if(end)
    {
        c1.clearRect(0,0,canvas1[0].width,canvas1[0].height);
        paddle.update(canvas_y);
        ball.draw();
        paddle2.draw();
        new Text(canvas1[0].width-150,50,20,'Score : '+score);
        new Text(canvas1[0].width-300,50,20,'Best : '+hs);
    }
}

canvas1[0].addEventListener('mousemove',function(e){
    canvas_y = e.clientY-50-plank_h/2;
    plankdrawing();
})

drawing();