// 엔터키 입력
function enter(){
  if(event.key === 'Enter'){
    next();
  };
}

function next(){ 
  const preWord = document.querySelector('.word');
  const word = document.querySelector('.word').textContent;
  const answer = document.querySelector('input[name=answer]');
  
  if(word[word.length -1] === answer.value[0]){
    preWord.innerHTML = answer.value;
    answer.value = '';
  } else {
    alert('땡');
  }
}