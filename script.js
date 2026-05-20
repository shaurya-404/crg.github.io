let gameTime = 300; 
let turnTime = 15; 
let CP = 1;
let p1S = 0;
let gc= 0;
let p2S = 0;
let c = 0;
let pause=false;
let history = "";
const portal=[];
const p1color = "rgb(255, 231, 49)";
const p2color = "rgb(17, 255, 0)";
const exp = new Audio("exp.mp3")
const click = new Audio("click.mp3")

let gameInterval;
let turnInterval;

document.addEventListener('DOMContentLoaded', () => {
    const gtimertxt = document.getElementById('gtimer');
    const ttimertxt = document.getElementById('ttimer');
    const playertxt = document.getElementById('PlayerTurn');
    const scoretxt = document.getElementById('score');
    const cells = document.querySelectorAll('.cell');
    const Movecounter = document.getElementById('moves');

    document.getElementById("ins1i").innerText = "If any star is placed in red boxes it will get teleported to a pink box.\nRed boxes cant have stars.\n\n Tip: avoid placing in portal boxes! specially during start.";
    document.getElementById("ins2i").innerText = "If any star is placed in red boxes it will get teleported to a pink box.\nRed boxes cant have stars.\n\n Tip: avoid placing in portal boxes! specially during start.";

    const paubtn = document.getElementById('pause');

    paubtn.addEventListener('click', () => {
        pause = !pause;
        if(pause){
            paubtn.innerText = "resume";
            paubtn.style.backgroundColor="#ff0000";
            clearInterval(gameInterval);
            clearInterval(turnInterval);
        }
        else{
            paubtn.innerText = "pause";
            paubtn.style.backgroundColor = "#00ff2f";
            sgt();
            stt();
        }
    })

    function sgt() {
        gameInterval = setInterval(() => {
            gameTime--;
            let mins = Math.floor(gameTime / 60);
            let secs = gameTime % 60;
            document.getElementById('gtimer').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        }, 1000);
    }

    function stt() {
        clearInterval(turnInterval);
        
        turnInterval = setInterval(() => {
            turnTime--;
            document.getElementById('ttimer').innerText = turnTime;

            if (turnTime <= 0) {
                switchplayer();
            }
        }, 1000);
    }
    

    //cells.forEach(cell => {
        // cell.addEventListener('click', () => {
        //     // Access the data attributes we set in HTML
        //     const row = cell.dataset.row;
        //     const col = cell.dataset.col;

        //     //alert(`Cell at Row ${row} and Column ${col} was clicked!`);
        // });
    //});


    function switchplayer() {
        CP = CP === 1 ? 2 : 1;
        playertxt.innerText = `Player ${CP}'s Turn`;
        playertxt.style.color = CP === 1 ? "#ffe731" : "#11ff00";
        resetttimer();
    }

    
    gameInterval = setInterval(() => {
        gameTime--;
        let mins = Math.floor(gameTime / 60);
        let secs = gameTime % 60;
        gtimertxt.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        if (gameTime <= 0) {
            clearInterval(gameInterval);
            clearInterval(turnInterval);
            alert("Game Over! Time is up.");

            if(p1S>p2S){
                document.getElementById("player").innerText = "Player 1 won!";
                document.getElementById("player").style.color = "#ea00ff";
                document.getElementById("points").innerText = `P1: ${p1S} | P2: ${p2S}`;
                document.getElementById("points").style.color = "#ea00ff";
                winDiv = document.querySelector(".win");
                winDiv.style.display = "flex";
            }
            else if(p2S>p1S){
                document.getElementById("player").innerText = "Player 2 won!";
                document.getElementById("player").style.color = "#ea00ff";
                document.getElementById("points").innerText = `P1: ${p1S} | P2: ${p2S}`;
                document.getElementById("points").style.color = "#ea00ff";
                winDiv = document.querySelector(".win");
                winDiv.style.display = "flex";
            }
            else{
                document.getElementById("player").innerText = "Tie!";
                document.getElementById("player").style.color = "#ea00ff";
                document.getElementById("points").innerText = `P1: ${p1S} | P2: ${p2S}`;
                document.getElementById("points").style.color = "#ea00ff";
                winDiv = document.querySelector(".win");
                winDiv.style.display = "flex";
            }
            playertxt.style.color = "#f700ff";
        }
    }, 1000);

   
    function resetttimer() {
        clearInterval(turnInterval);
        turnTime = 15;
        ttimertxt.innerText = turnTime;

        turnInterval = setInterval(() => {
            turnTime--;
            ttimertxt.innerText = turnTime;

            if (turnTime <= 0) {
                //alert(`Player ${CP} took too long! Switching turns.`);
                switchplayer();
            }
        }, 1000);
    }
    function getCell(r, c) {
    return document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    }
    function explosion(ro,co,cellcol){
        gc++;
        getCell(ro,co).innerText="";
        for(let j=-1;j<2;j++){
            for(let k=-1;k<2;k++){
                celln = getCell(parseInt(ro)+j,parseInt(co)+k);
                if(((j+2)*(k+2)) % 2 ==0){
                    try{
                    celln.style.color=cellcol;
                    celln.innerText += "●";}
                    catch{
                        console.log();
                    }
                }
                let cap = capaci(parseInt(ro)+j,parseInt(co)+k);
                try{
                if((celln.innerText.length > cap)){
                    explosion(parseInt(ro)+j,parseInt(co)+k,cellcol);
                }}
                catch{
                    console.log();
                }
            }
        }
        getCell(ro,co).innerText="";
        getCell(ro,co).style.color="";
        gc--;
        exp.currentTime=0;
        exp.play();
    }
    function checkWin(){

        let p1cl=0;
        let p2cl=0;

        if(p1S+p2S>=2){    
            for(let i=1;i<13;i++){
                for(let j=1;j<7;j++){
                    celln = getCell(i,j);
                    if(celln.style.color === p1color){
                        p1cl=1;
                    }
                    else if(celln.style.color === p2color){
                        p2cl=1;
                    }
                }
            }

            if(p1cl===0){
                return "P2 won";
            }
            else if(p2cl===0){
                return "P1 won";
            }
        }
    }

    function capaci(ro1,co1){
        if(parseInt(ro1)+1==13 || parseInt(ro1)-1 == 0 || parseInt(co1)-1 == 0 || parseInt(co1)+1==7){
                if((ro1==1 && co1==1)||(ro1==1 && co1==6)||(ro1==12 && co1==1)||(ro1==12 && co1==6)){
                    capacity=1;
                }
                else{capacity=2;}
            }
            else{
                capacity=3;
            }
        return capacity;
    }

    function teleportset(){

        for(i=0;i<3;i++){
            let c1 = Math.floor(Math.random() * 6) + 1;
            let r1 = Math.floor(Math.random() * 12) + 1;
            let l;
            console.log(`${r1},${c1}`);
            if(r1!==c1){
                getCell(r1,c1).style.backgroundColor="#ff0000";
                try{        
                    if(r1>6){
                        getCell(c1,r1-6).style.backgroundColor="#66bebb";
                        l = [[r1,c1],[c1,r1-6]];
                    }
                    else if(r1<=6){
                        getCell(c1,r1).style.backgroundColor="#66bebb";
                        l = [[r1,c1],[c1,r1]];
                    }
                    portal.push(l);
                }
                catch{
                    getCell(r1,c1).style.backgroundColor="";
                }
            }
            console.log(portal);
        }
    }
    teleportset();

    function teleportation(){
        for(let i=0;i<3;i++){
            t1cell=getCell(portal[i][0][0],portal[i][0][1]);
            t2cell=getCell(portal[i][1][0],portal[i][1][1]);

            // if((t2cell.innerText!=="") && (t2cell.style.color === ((CP == 1) ? p1color : p2color))){
            //     alert("Space occupied");
            //     t1cell.innerText="";
            //     switchplayer();
            //     c--;
            //     history = history.trimEnd() + "(Invalid)\n";
            //     return;
            // }

            if (t1cell.innerText !== "" && t2cell.innerText ===""){
                t2cell.innerText = t1cell.innerText;
                t1cell.innerText = "";
                t2cell.style.color= CP === 2 ? "#ffe731" : "#11ff00";
            }
            else if(t2cell.innerText !== "" && t2cell.style.color === ((CP === 2) ? "#ffe731" : "#11ff00") ){
                alert("Portal space already taken try somewhere else.")
            }
            else if((t1cell.innerText !== "" && t2cell.innerText !="")){
                capi = capaci(portal[i][1][0],portal[i][1][1]);
                if(t2cell.innerText.length < capi){
                    t2cell.innerText += "●";
                    t1cell.innerText = "";
                    t2cell.style.color= ((CP === 2) ? "#ffe731" : "#11ff00");
                }
                else{
                    colo= CP === 2 ? "#ffe731" : "#11ff00";
                    explosion(portal[i][1][0],portal[i][1][1],colo);
                    t2cell.innerText="";
                }

            }
        }

    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (pause) return;
            click.currentTime=0;
            click.play();

            row = cell.dataset.row;
            col = cell.dataset.col;
            let capacity=0;


            capacity = capaci(row,col);
            let cellco=cell.style.color;

            if (cell.style.backgroundColor === "rgb(255, 0, 0)"){
                alert("You cannot place in portals.");
            }
            else if (cell.innerText === "" && (c==0||c==1)) {
    
                for(let i=0;i<capacity;i++){cell.innerText += "●"}; 
                cell.style.color = CP === 1 ? "#ffe731" : "#11ff00";

                if (CP === 1) p1S++; else p2S++;
                scoretxt.innerText = `P1: ${p1S} | P2: ${p2S}`;
                c++;
                history=history+`player-${CP} did r:${row} c:${col}\n`
                Movecounter.innerText=history;
                switchplayer();
            }
            else if(!(cell.innerText === "") && (c==0||c==1)){
                alert("The cell is already filled try somewhere else.");
                if(c!=1){
                    c++;}
            }
            else if((cell.innerText === "") && !(c==0||c==1)){
                alert("The cell is empty you cant place atom over there anymore.");
                c++;
            }
            else if(!(cell.innerText === "") && (cellco === ((CP == 2) ? p1color : p2color))){
                alert("Space taken by other player.")
            }
            

            else if (!(cell.innerText === "") && !(c==0||c==1)) {
                if((cell.innerText).length<capacity){
                    cell.innerText += "●"
                }
                else{
                    CP===1?p1S++:p2S++;
                    scoretxt.innerText = `P1: ${p1S} | P2: ${p2S}`;
                    explosion(row,col,cellco);
                }
                history=history+`player-${CP} did r:${row} c:${col}\n`
                Movecounter.innerText=history;  
                switchplayer();
            }
            
            teleportation();

            
            let win = checkWin();
            if (win === "P1 won"){
            document.getElementById("player").innerText = "Player 1 won!";
            document.getElementById("player").style.color = "#ea00ff";
            document.getElementById("points").innerText = `P1: ${p1S} | P2: ${p2S}`;
            document.getElementById("points").style.color = "#ea00ff";
            winDiv = document.querySelector(".win");
            winDiv.style.display = "flex";
            }
            else if(win === "P2 won"){
            document.getElementById("player").innerText = "Player 2 won!";
            document.getElementById("player").style.color = "#ea00ff";
            document.getElementById("points").innerText = `P1: ${p1S} | P2: ${p2S}`;
            document.getElementById("points").style.color = "#ea00ff";
            winDiv = document.querySelector(".win");
            winDiv.style.display = "flex";
            }

        });
    });
    resetttimer();

});