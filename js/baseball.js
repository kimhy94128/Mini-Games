const answer = document.querySelector('input[name=answer]');
const result = document.querySelector('.result');
const gameCount = document.querySelector('.gameCount');
let com = [];
let count;

//숫자 생성
function newGame(){
  count = 10;
  result.innerHTML =  `Play Ball ~`
  // 숫자 설정
  for(i=0; i<10; i++){
    const number = Math.floor(Math.random()*9)+1
    if(com.indexOf(number) < 0){
      com.push(number);
    }
    if(com.length == 4){
      break;
    }
  }
  // 카운트 초기화
  gameCount.innerHTML = count
}
  
// 엔터키 입력
function enter(){
  if(event.key === 'Enter'){
    next();
  };
}  

function next(){
let userAnswer = answer.value

  if(count > 0){ 
    count--
    if(userAnswer == com.join('')){
      result.innerHTML = "홈런!!!"
    } else {
      let strike = 0;
      let ball = 0;
      for(i=0; i<4; i++){
        if(userAnswer[i] == com.join('')[i]){
          strike++
        } else if (com.join('').indexOf(userAnswer[i]) > -1){
          ball++
        }
      }
    result.innerHTML = `${strike}스트라이크 ${ball}볼`
    gameCount.innerHTML = count
    }
  } 
  if(count == 0){
    result.innerHTML = `게임오버 <button onclick="newGame()">새 게임</button>`
  }
}

newGame();