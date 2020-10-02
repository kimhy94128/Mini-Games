const cells = document.querySelectorAll('td');
const watch = document.querySelector('.js-time');
const nums = []; //숫자 순서 배열
const randomNums = []; //초기 셋팅을 위한 무작위 숫자 배열
let next = 0;
let time = 0;
let count = 1;

// 타이머 설정 (10밀리세컨즈)
function writeTime(){
  time++
  let mil = time%100;
  let sec = Math.floor(time%6000/100); 
  let min = Math.floor(time/6000);
  watch.innerHTML = `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec} : ${mil < 10 ? `0${mil}` : mil}`
}

// 기본 숫자
function getNum(){
  for(i=1; i<=50; i++){
    nums.push(i);
  }
}
// 기본 보드
function setBoard(){
  for(i=0; i<25; i++){
    cells[i].innerHTML = randomNums[i];
  }
}
// 1부터 25까지 무작위 배열
function randomArray(){
  while(randomNums.length<25){
    let n = Math.floor(Math.random() * 25) + 1 ;
    if(randomNums.indexOf(n) === -1){
      randomNums.push(n);
    }
  }
}

// 클릭 이벤트
cells.forEach((cell) => {
  cell.addEventListener('click', clickHandler);
})

function clickHandler(event){
  if(this.textContent == 1){ // 1을 클릭하면 타이머 실행
    timer = setInterval(writeTime, 10)
  }
  
  if(this.textContent == count){
    nums.shift();
    if(count > 25){
      this.innerHTML = '';
      this.classList.add('none');
    } else {
      getNext();
      this.innerHTML = next;
    }
    this.classList.add('changed');
    count++;
  }

  if(count > 50){ // 게임 종료시 타이머 종료
    clearInterval(timer);
  }
}


function getNext(){
  let board = [];
  cells.forEach(cell => {
    board.push(Number(cell.textContent))
  })
  while(1){
    let n = Math.floor(Math.random() * nums.length)
    if(board.indexOf(nums[n]) == -1){
      next = nums[n]
      break;
    } else {
      next = 0
    }
  }
}

function init(){
  getNum();
  randomArray();
  setBoard();
}

init();