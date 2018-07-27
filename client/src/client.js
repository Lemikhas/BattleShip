const writeEvent = (text) =>{
    const parent = document.querySelector('#events');

    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};
writeEvent('Welcome to BattleShips');

const sock = io();

sock.on('message',writeEvent);