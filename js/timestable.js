const numbers = document.querySelector('.numbers');
const answer = document.querySelector('input[name=answer]');
let result;

  function newGame(){
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    numbers.innerHTML = num1 + ' X ' + num2
    result = num1 * num2
  }

  function enter(){
    if(event.key === 'Enter'){
        next();
    };
  }

  function next(){
    if(answer.value == ''){
      alert('정답을 입력하세요.');
      return false
    }
    if(result == answer.value){
      alert('정답');
      answer.value = '';
      newGame();
    } else{
      alert('땡');
      answer.value = '';
    }
  }

newGame();