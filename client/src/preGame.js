let x = 1150;
let y = 200;
const ready = document.querySelector("#ready");
let shipPos = [];
const shipArea = document.querySelectorAll(".cell");
const playArea = document.querySelectorAll(".cellb");


const shipPositoning = () =>{
    for (let i = 0; i < shipArea.length; i++) {
        shipArea[i].onclick = () =>{
            if(shipPos.includes(i)){
                shipArea[i].style.backgroundColor = "white";
                shipPos.splice(shipPos.indexOf(i), 1);
            }else{
                if (shipPos.length < 20){
                    shipPos.push(i);
                    console.log(shipPos);
                    
                    ready.style.display = "none";
                }
                if (shipPos.length == 20){
                    ready.style.display = "block";
                }
            }
        }
        shipArea[i].onmouseover = (e)=>{
            shipArea[i].style.backgroundColor = "gray";
        }
        shipArea[i].onmouseout = (e)=>{
            if (shipPos.includes(i)){}else{
            shipArea[i].style.backgroundColor = "white";
            }
        }   
    }
}

let ships = document.querySelectorAll('.ship');
ships.forEach(s=>{
    s.style.left = x +"px";
    s.style.top = y +"px";
    y += 50;
    shipPositoning();
});
ready.onclick = () => {
    sock.emit('playerReady', shipPos);
    ready.style.display = "none";
    document.querySelector("#fleetCover").style.display = "block";
};

sock.on('turn', () => {
    document.querySelector("#radarCover").style.display = "none";

    for (let i = 0; i < playArea.length; i++) {
        playArea[i].onclick = () =>{
            sock.emit('shot', i);
            }
        }
});
sock.on('radarhit', (i) => {
    playArea[i].style.backgroundColor = "red";
    playArea[i].onclick = () =>{};

});
sock.on('fleethit', (i) => {
    shipArea[i].style.backgroundColor = "red";
});
sock.on('radarmiss', (i) => {
    playArea[i].style.backgroundColor = "grey";
    playArea[i].onclick = () =>{}
    document.querySelector("#radarCover").style.display = "block";

});
sock.on('fleetmiss', (i) => {
    shipArea[i].style.backgroundColor = "yellow";
});
sock.on('win', () => {
    document.querySelector("#win").style.display = "block";
});
sock.on('lost', () => {
    document.querySelector("#lost").style.display = "block";
});