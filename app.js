const game={
    words:['ALURA','BINGO','ORACLE','UNO','ARGENTINA'],
    // words:['ARGENTINA'],
    estate:0,
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
    createSpaceWord(game.winWord)
    return game.winWord
}
function updateLeters(leter){
    if(game.winWord.includes(leter)){
            
       for(let i=0; i< game.winWord.length;i++){
            
            if(game.winWord[i] === leter ){
   
                if(!game.winLeters.filter(e => e.leter === leter).length > 0 ||
                    !game.winLeters.filter(e => e.i === i).length > 0
                ){
                    game.winLeters=[...game.winLeters,{leter,i}]
                    if(game.winLeters.length === game.winWord.length){
                        showModal('Win Win Win')
                    }
                        
                        
                }
                    
            }
        }
            
        return 
    }
    if(!game.wrongLeters.includes(leter)){
        game.wrongLeters=[...game.wrongLeters,leter]
        if(game.estate < 6){
            game.estate++
            updateEstateGame(game.estate)
        }
        
      return 
    }
                
        return 
}
        
function createSpaceWord(winWords){
    let placeLettersWin = document.querySelectorAll('.check-word > span')
    if(placeLettersWin.length > 0){
        placeLettersWin.forEach(e=> e.remove())
         
    }
        
    for(let leter of winWords){
        let span= document.createElement('span')
        // span.classList.add('check-word')
        htmlElemnts.listWinLeters[0].appendChild(span)
                
    }
    
        
   
}
    
    
   
function  placeLetters(winLeters,wrongLeters,leterPress){
    
    let placeLettersWin = document.querySelectorAll('.check-word > span')
    let lettersWrong=[...document.querySelectorAll('.wrong-word > span')].map(e=>e.innerHTML)

    if(!lettersWrong.includes(leterPress) && !game.winLeters.filter(e => e.leter === leterPress).length > 0){
        let creatPacleLeter= document.createElement('span')

        creatPacleLeter.textContent=wrongLeters.slice(-1)[0]
        htmlElemnts.listWrongLeters[0].appendChild(creatPacleLeter)
    }

    for(let j=0; j < winLeters.length; j++){
        placeLettersWin[winLeters[j].i].textContent=winLeters[j].leter
    }
   
   return
}
function keyEvent(event) {
    if(game.estate===5){
        showModal('Game Over')
     
    }
    
    if(game.estate < 6 && game.winLeters.length !== game.winWord.length  ){    
        const key = event.keyCode || event.which;
        const keychar = String.fromCharCode(key);
        const onlyLeters=new RegExp('[A-Z]', 'g');
        if(keychar!= game.keyPress && onlyLeters.test(keychar)){
            game.keyPress=keychar
            updateLeters(keychar)
            placeLetters(game.winLeters,game.wrongLeters,keychar)
         return
        } 
        return  
    }
    
      

}
function newGame(){
    location.reload()
}
function showModal(msj){
    let modal = document.querySelector('.modal');
    let mensaje= document.querySelector('.modal-titulo')
    mensaje.textContent=msj
    modal.classList.add('modal--show');
    // setTimeout(()=>{modal.classList.remove('modal--show')},1000)
    return
}

function backToHome(){
   location.href='home.html'
}
function startGame(){
    // alert('Home')
    
    location.href='index.html'
}

function addWord(){
    
    const word = document.querySelector("#mensaje").value;
    if(word.length <= 8 && word.length > 0){
        localStorage.setItem(`word`,`${word.toUpperCase()}`)
        // game.words=[...game.words,word]
        // startGame()
        location.href='index.html'
        return
        
    }
    showModal(`The word must have at least 8 characters`)
    return
  
 
}
function updateWords(){
    if(localStorage.getItem('word')){
        game.words=[...game.words,localStorage.getItem('word')]
    }
}

updateWords()
updateEstateGame()
choiceRandomWord()
