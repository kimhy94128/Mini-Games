const rows = document.querySelectorAll('tr');
  let cells = document.querySelectorAll('td');
  const board = [];
  let play = true;
  let player = 'O'

  rows.forEach(list => {
    board.push(list.children);
  })


  cells.forEach(list => {
    list.addEventListener('click', turn)
  })


function turn(){
  if(play){
    if(event.target.textContent === ''){
      event.target.textContent = player ;

      // 가로 확인
      for(i=0; i<3; i++){
        if(board[i][0].textContent == player &&
        board[i][1].textContent == player &&
        board[i][2].textContent == player
        ){ alert(`${player} 승리!!`);
          play = false;
        }
      }

      // 세로 확인
      for(i=0; i<3; i++){
        if(board[0][i].textContent == player &&
        board[1][i].textContent == player &&
        board[2][i].textContent == player
        ){ alert(`${player} 승리!!`)
          play = false;
        }
      }

      // 대각선 확인
      if((
        board[0][0].textContent == player &&
        board[1][1].textContent == player &&
        board[2][2].textContent == player
        ) || (
        board[0][2].textContent == player &&
        board[1][1].textContent == player &&
        board[2][0].textContent == player  
        ) 
      ) {
        alert(`${player} 승리!!`);
        play = false;
      }

      //플레이어 변경
      if(player === 'O'){
        player = 'X'
      } else {
        player = 'O'
      }
    }  
  } else {
    if(confirm('새 게임을 시작할까요?')){
      play = true;
      location.reload();
    }
  }
}