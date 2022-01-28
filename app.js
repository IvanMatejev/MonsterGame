function randomValue(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

const app=Vue.createApp({
    data(){
        return{
            monsterHealth: 100,
            playerHealth: 100,
            roundCounter: 0,
            winner:  0,
            logMessages: []
        }
    },
    computed:{
        updateMonsterHealth(){
            if(this.monsterHealth<=0){
                return{width:'0%'}
            }
           return {width: this.monsterHealth + '%'}
        },
        updatePlayerHealth(){
            if(this.playerHealth<=0){
                return{width:'0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        useSpecialAttack(){
            return this.roundCounter===0 || this.roundCounter % 3 !==0   
        }
    },
    watch:{
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                this.winner="draw"
            }else if(value<=0){
                this.winner="player"
            }
        },
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                this.winner="draw"
            }else if(value<=0){
                this.winner="monster"
            }
        }
    },
    methods:{
        attackMonster(){
            this.roundCounter++;
            let attackValue=randomValue(7, 12);
            this.monsterHealth-=attackValue;
            this.addLogMessage('Player', 'attack', attackValue);
            this.attackPlayer()
        },
        attackPlayer(){
            let attackValue=randomValue(12, 15);
            this.addLogMessage('Monster', 'attack', attackValue);
            this.playerHealth-=attackValue
        },
        specialAttackMonster(){
            this.roundCounter++;
            let specialAttackValue=randomValue(10, 25);
            this.monsterHealth-=specialAttackValue;
            this.addLogMessage('Player', 'special-attack', specialAttackValue);
            this.attackPlayer();
        },
        healMe(){
            this.roundCounter++;
            let healValue=randomValue(15,25);
            if(this.playerHealth+healValue>=100){
                this.playerHealth=100
            }else{
                this.playerHealth+=healValue;
            }
            this.addLogMessage('Player', 'heal', healValue);
            this.attackPlayer();
        },
        surender(){
            this.winner='monster'
        },
        playAgain(){
            this.roundCounter=0;
            this.winner=null;
            this.monsterHealth=100;
            this.playerHealth=100;
            this.logMessages=[]
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue:value
            })
        }
    }
});

app.mount('#game');