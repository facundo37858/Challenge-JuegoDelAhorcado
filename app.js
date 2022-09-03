
    const game={
        words:['ALURA','BINGO','ORACLE','UNO','ARGENTINA'],
        // words:['ARGENTINA'],
        estate:[0,1,2,3,4,5,6],
        winWord:[],
        winLeters:[],
        // winLetersHistory:[],
        wrongLeters:[],
        keyPress:''
    }
    const htmlElemnts={
        estateImage:document.getElementById('img'),
        listWinLeters: document.getElementsByClassName('check-word'),
        listWrongLeters: document.getElementsByClassName('wrong-word'),
    }
    function updateEstateGame(estate=0){
        htmlElemnts.estateImage.src='assets/img/estates/e'+estate+'.png'
        return estate
    }
    function choiceRandomWord(){
        const min=0
        const max=game.words.length-1
        const randomIndex= Math.round(Math.random() * (max - min)) + min
        game.winWord=game.words[randomIndex].split('')
        return game.winWord
    }
    function updateLeters(leter){
        if(game.winWord.includes(leter)){
            

            for(let i=0; i< game.winWord.length;i++){
                
                if(game.winWord[i] === leter ){
                    
                    // if(!game.winLetersHistory.includes(leter) || !game.winLetersHistory.includes(i)){
                    //     game.winLeters=[...game.winLeters,{leter,i}]
                    //     game.winLetersHistory.push(leter,i)
                        
                    // }
                    if(!game.winLeters.filter(e => e.leter === leter).length > 0 ||
                        !game.winLeters.filter(e => e.i === i).length > 0
                    ){
                        game.winLeters=[...game.winLeters,{leter,i}]
                        
                        
                    }
                    
                }
            }
            
            return game
        }
        if(!game.wrongLeters.includes(leter)){
            game.wrongLeters=[...game.wrongLeters,leter]
            return game
        }
                
        return game
    }
        
    function createSpaceWord(winWords){
        for(let leter of winWords){
            let span= document.createElement('span')
            span.classList.add('check-word')
            htmlElemnts.listWinLeters[0].appendChild(span)
            
        }

    }
    
    

    updateEstateGame()
    // console.log("🚀 ~ file: app.js ~ line 33 ~ htmlElemnts", htmlElemnts.listWinLeters[0])
    console.log("🚀 ~ file: app.js ~ line 34 ~ game", game)
    console.log("🚀 ~ file: app.js ~ line 35 ~ choiceRandomWord ~ choiceRandomWord", choiceRandomWord())
    console.log("🚀 ~ file: app.js ~ line 36 ~ createWord ~ createWord", createSpaceWord(game.winWord))
    // console.log(document.querySelectorAll('.check-word > span'))
    // console.log("🚀 ~ file: app.js ~ line 27 ~ checkWord ~ checkWord", updateLeters('A'))
    

function keyEvent(event) {
    var key = event.keyCode || event.which;
    var keychar = String.fromCharCode(key);
    let onlyLeters=new RegExp('[A-Z]', 'g');
    // console.log(onlyLeters.test(keychar))
    if(keychar!= game.keyPress && onlyLeters.test(keychar)){
        game.keyPress=keychar

        updateLeters(keychar)
        console.log(keychar,typeof keychar)
        console.log(game)

    }
   

  
}
