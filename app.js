        // Game Constants & variables
        let inputDir = {x:0,y:0};

        const foodsound = new Audio('food.mp3');
        const gameOverSound = new Audio('over.mp3');
        const moveSound = new Audio('move2.mp3');
        const bgSound = new Audio('bgMusic.mp3');
        
        let speed = 6;
        let score = 0;
        let lastPaintTime = 0;
        let snakeArr = [
            {x:13, y:15 }
        ]
        let food =   {x:6, y:7 };
        
        
        
             // Game Function
        
        function main(ctime){
            window.requestAnimationFrame(main);
            // console.log(ctime);
            if((ctime - lastPaintTime) / 1000 < 1/ speed){
                return;
            }
           lastPaintTime = ctime;
           gameEngine();
        }
        
        
        
        function isCollide(snake){
           
            // if you pump into yourself
            for (let i = 1; i < snakeArr.length; i++) {
                if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
                    return true;
                }
            }
        
            // if you pump into the wall
            if(snake[0].x >= 18 || snake[0].x <= 0 ||  snake[0].y >= 18 || snake[0].y <= 0)
                return true
        }
        
        
        function gameEngine(){
        
            // part 1: updating the snake array & food
        
            if(isCollide(snakeArr)){
                gameOverSound.play();
                bgSound.pause();
                inputDir = {x:0,y:0};
                alert("Game over. Press any key to Play again");
                snakeArr = [ {x:13, y:15 } ]
                bgSound.play();
                let score = 0;
        
            }
        
            // if you have to eat an food , increament the score and regenerate the food
            if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
                foodsound.play();
                score +=1;
                if(score>hiscoreval){
                    hiscoreval = score;
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
                    hiscoreBox.innerHTML = "High score:" + hiscoreval;
                }
        
                scoreBox.innerHTML = "Your score :" + score;
                snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
                let a = 2;
                let b = 16;
                food = { x: Math.round( a + (b-a)* Math.random()) ,  y: Math.round( a + (b-a)* Math.random())}
            }
           
        
            // movingn the snake
            for (let i = snakeArr.length - 2 ; i >= 0; i--) {
                snakeArr[i+1] = {...snakeArr[i]};
            }
        
            snakeArr[0].x  += inputDir.x;
            snakeArr[0].y  += inputDir.y;
            
           
            //part 2: display the snake and food
        
            //display the snake 
            board.innerHTML = "";
            snakeArr.forEach((e,index)=>{
                snakeElement = document.createElement('div');
                snakeElement.style.gridRowStart = e.y;                  
                snakeElement.style.gridColumnStart = e.x;
               
                if(index == 0){
                    snakeElement.classList.add('head');
                }else{
                    snakeElement.classList.add('snake');
                }
                board.appendChild(snakeElement);
             });
        
        
        
            //display the snake
            foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;                  
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food');
            board.appendChild(foodElement);
        
        
        }
        
               // main logic start here
        
        let hiscore = localStorage.getItem("hiscore")
        if(hiscore === null){
            hiscoreval = 0;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
        }
        else{
            hiscoreval = JSON.parse(hiscore);
            hiscoreBox.innerHTML = "high score :" + hiscore;
        }
        window.requestAnimationFrame(main);
        window.addEventListener('keydown', e =>{
        inputDir = { x:0, y:1 } // start the game
        moveSound.play();
        switch(e.key){
            case "ArrowUp":
                console.log("ArrowUp")
                inputDir.x = 0 ;
                inputDir.y = -1;
                    break;
            
            case "ArrowDown":
                console.log("ArrowDown")
                inputDir.x = 0;
                inputDir.y = 1;
                    break;
        
            case "ArrowRight":
                console.log("ArrowRight") 
                inputDir.x = 1;
                inputDir.y = 0;
                    break;
        
            case "ArrowLeft":
                console.log("ArrowLeft")
                inputDir.x = -1;
                inputDir.y = 0;
                    break;
        
            default:
                    break;
        }
        
        });