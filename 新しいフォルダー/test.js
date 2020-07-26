
/* コメントアウト */

/*
変数var は再宣言、再代入が可能
変数let は再宣言不可能、再代入可能（今はこっちで変数宣言するのが推奨されているらしい）
定数const は再宣言、再代入不可能
 */
let randomNumber = Math.floor(Math.random() * 100) + 1;
/* (0~99)+1のランダムな数字 */
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;
// プレイヤーが予想した回数をカウントする
// クリックした回数で書き換えられるからlet

function checkGuess() {
// alert('ここに好きな文字を入れてください');
  let userGuess = Number(guessField.value);
// 組み込み関数Number()は最初から使える関数
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: '; // 初回の予想なら表示も初回仕様にします
  }

  guesses.textContent += userGuess + ' '; // ユーザーがインプットで入力した整数

  if (userGuess === randomNumber) {
    lastResult.textContent.gameclear = 'おめでとう! 正解です!';
    lastResult.style.backgroundColor = 'green'; // これclassつけてCSSのファイルで良くないか
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent.gameover = '間違いです!';
    lastResult.style.backgroundColor = 'red'; // これclassつけてCSSのファイルで良くないか
    if(userGuess < randomNumber) {
      lowOrHi.textContent = '今の予想は小さすぎです!もっと大きな数字です。' ;
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = '今の予想は大きすぎです!もっと小さな数字です。';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
/*
  次の予想の入力を受け取るための準備？。
  変数guessCount に 1 を加算して、プレイヤーの予想回数を数えます。
  (++ はインクリメント演算子で、変数に対して 1 だけインクリメント(加算)します。)
  そして、入力フォームのテキストフィールドを空にしてからフォーカスを当て、プレイヤーの次の入力に備えます。
*/
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
// ゲームオーバー時にプレイヤーが入力や送信ができないようにdisablesをTrueにしている
  resetButton = document.createElement('button');
  resetButton.textContent = '新しいゲームを始める';
  document.body.appendChild(resetButton);
// html にbuttonの要素を追加するメソッドappendChild
  resetButton.addEventListener('click', resetGame);
// 生成したbuttonを'click'したときに、関数resetGameが発動するメソッドaddEventListener
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for(let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
// ゲームオーバー時にプレイヤーが入力や送信ができないようにdisablesをTrueにしている
  guessField.value = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
