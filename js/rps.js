const comImg = document.querySelector('.img');
const btns = document.querySelectorAll('.btn');

let rock = -10;
let scissors = -210;
let paper = -425
let position;
let interval;

// 게임 시작
function startGame(){
  interval = setInterval(function(){
    if(position === rock){
      position = scissors;
    } else if(position === scissors){
      position = paper;
    } else {
      position = rock;
    };
    comImg.style.background = `url(../img/rps.png) ${position}px -125px / cover `;
  },80)
}

// 컴퓨터 결과 출력
function comResult(x){
  switch(x){
    case -10 : return '바위'; break;
    case -210 : return '가위'; break;
    case -425 : return '보'; break;
  }
}

// 유저 클릭 이벤트
btns.forEach(btn => {
  btn.addEventListener('click', getResult)
})

// 결과 확인
function getResult(event){
  const user = event.target.textContent;
  const com = comResult(position)
  clearInterval(interval);
  setTimeout(startGame, 1000);

  if(user === com){
    alert('무승부');
  }

  if(user === '가위' && com === '보' ||
    user === '바위' && com === '가위' ||
    user === '보' && com === '바위'){
      alert('승리');
    }

  if(user === '보' && com === '가위' ||
    user === '가위' && com === '바위' ||
    user === '바위' && com === '보'){
      alert('패배');
    }
}