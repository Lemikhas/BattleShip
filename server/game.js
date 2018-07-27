class ShipsGame{

    constructor(p1, p2) {
        this._players = [p1, p2];
        this._p1Ships = null;
        this._p2Ships = null;
        this._p1Score = 0;
        this._p2Score = 0;

        this._sendToPlayers('Prepere for battle!');

            this._players[0].on('playerReady', (shipPos) => {
                this._p1Ships = shipPos;
                console.log(this._p1Ships);
                this._sendToPlayer(1, 'Your opponent is ready!');
                this._sendToPlayer(0, 'Waiting for your opponent to ready up...');
                this._arePlayersReady();
            });
            this._players[1].on('playerReady', (shipPos) => {
                this._p2Ships = shipPos;
                console.log(this._p2Ships);
                this._sendToPlayer(0, 'Your opponent is ready!');
                this._sendToPlayer(1, 'Waiting for your opponent to ready up...');
                this._arePlayersReady();
            });
            this._players[0].on('shot', (i) => {
                if (this._p2Ships.includes(i)){
                    this._sendToPlayers('Hit!');
                    this._players[0].emit('radarhit', i);
                    this._players[1].emit('fleethit', i);
                    this._p1Score ++;
                    if(this._p1Score < 20){
                        this._players[0].emit('turn');
                    }else{
                        console.log('player1 win');
                        this._players[0].emit('win');
                        this._players[1].emit('lost');
                    }
                }else{
                    this._sendToPlayers('Miss!');
                    this._players[0].emit('radarmiss', i);
                    this._players[1].emit('fleetmiss', i);
                    this._players[1].emit('turn');
                }
            });
            this._players[1].on('shot', (i) => {
                if (this._p1Ships.includes(i)){
                    this._sendToPlayers('Hit!');
                    this._players[1].emit('radarhit', i);
                    this._players[0].emit('fleethit', i);
                    this._p2Score ++;
                    if(this._p2Score < 20){
                        this._players[1].emit('turn');
                    }else{
                        console.log('player2 win');
                        this._players[1].emit('win');
                        this._players[0].emit('lost');
                    }
                }else{
                    this._sendToPlayers('Miss!');
                    this._players[1].emit('radarmiss', i);
                    this._players[0].emit('fleetmiss', i);
                    this._players[0].emit('turn');
                }
            });
            

        

    }

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);
    }
    _arePlayersReady(){
        if (this._p1Ships != null  && this._p2Ships != null){
            this._sendToPlayers('Battle starts!');
            this._players[0].emit('turn');
        }
    }

    _sendToPlayers(msg){
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    }
}

module.exports = ShipsGame;