//initialization
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const GRID_WIDTH = 32;
const GRID_HEIGHT = 32;
const TS = 16;
var dx = dy = 0;
var fx = Math.floor(GRID_WIDTH * Math.random());
var fy = Math.floor(GRID_HEIGHT * Math.random());
var Point = function(x,y)
{
    this.x = x;
    this.y = y;
}

drawGrid = function(context)
{
    context.fillStyle = "black";
    context.strokeStyle = "white";
for(var y = 0; y < GRID_HEIGHT; y++)
    {
        for(var x = 0; x < GRID_WIDTH; x++)
            {
                context.fillRect(x * TS, y * TS, TS,TS);      
                
                context.strokeRect(x * TS, y * TS, TS,TS);                
                         
            }
    }
}
class Snake
    {
        constructor()
        {            
            this.length = 5;
            this.body = new Array(20);          
            for(var i = 0; i < this.body.length; i++)
                {
                    this.body[i] = new Point(i + 5,0);
                }
        }
        
        draw(context)
    {
        context.fillStyle = "green";
        for(var i = 1; i < this.length; i++)
            {                
                var p = this.body[i];
                if(p == null)
                    break;
                context.fillRect(p.x * TS, p.y * TS, TS, TS);              
            }
        context.fillStyle = "blue";
        var p = this.body[0];
        context.fillRect(p.x * TS, p.y * TS, TS,TS);
    }
        update()
        {                     

            for(var i = this.body.length-1; i > 0; i--)
                {
                    this.body[i].x = this.body[i - 1].x;
                    this.body[i].y = this.body[i - 1].y;
                }
        }
        move(x,y)
        {
             if(x != 0 || y != 0)
           this.update();
           var p = this.body[0];
            var nx = x + p.x;
            var ny = y + p.y;
            if(nx >= GRID_WIDTH)
                nx = 0;
            if(nx < 0)
                nx = GRID_WIDTH-1;
            if(ny >=GRID_HEIGHT)
                ny = 0;
            if(ny < 0)
                ny = GRID_HEIGHT-1;
            this.body[0].x = nx;
            this.body[0].y = ny;
           
        }
    }
const snake = new Snake();
document.addEventListener('keydown', (event) => {
  const keyName = event.key;    
  if(keyName == "a")
      {
          dx = -1;
          dy = 0;
      }
    if(keyName == "s")
      {
          dx = 0;
          dy = 1;          
      }
    if(keyName == "w")
      {
          dx = 0;
          dy = -1;
      }
    if(keyName == "d")
      {
          dx = 1;
          dy = 0;
      }
    if(keyName == "x")
        {
            dx = 0;
            dy = 0;
        }
});
function update()
{
snake.move(dx,dy);
    var head = snake.body[0];
    if(head.x == fx && head.y == fy)
        {
        snake.length++;
        fx = Math.floor(GRID_WIDTH * Math.random());
        fy = Math.floor(GRID_HEIGHT * Math.random());
        }
}
function draw()
{
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width, canvas.height);
    drawGrid(context);
    snake.draw(context);
    context.fillStyle = "red";
    context.fillRect(fx * TS, fy * TS, TS, TS);

}
//draw
//update.setInterval(1);
//requestAnimationFrame(draw);
requestAnimationFrame(update);
setInterval(draw, 1000.0 / 60.0);
setInterval(update, 60);



