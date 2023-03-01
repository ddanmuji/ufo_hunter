// Canvas drawing
const canvas = document.getElementById('ufo_canvas');
canvas.width = 900;
canvas.height = 750;
const ctx = canvas.getContext('2d');

// Canvas automatic resizing
function resize() {
  const height = window.innerHeight - 20;
  const ratio = canvas.width / canvas.height;
  const width = height * ratio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
}

window.addEventListener('load', resize, false);

/** Game Basics */
function GameBasics(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;

  /** @description 게임 필드 초기 값, 위아래 150, 좌우 100 여유공간으로 초기화 */
  this.playBoundaries = {
    top: 150,
    bottom: 650,
    left: 100,
    right: 800,
  };

  // 초기 값
  this.level = 1;
  this.score = 0;
  this.shields = 2;

  this.setting = {
    // FPS: 60 frame pre 1 second, this means 1 new frame in every 0.01666667 seconds
    updateSeconds: 1 / 60,
  };

  // 현재 게임에 대한 위치 상태 저장
  this.positionContainer = [];

  // 키 저장소
  this.pressedKeys = {};
}

// 현재 위치 반환 함수
GameBasics.prototype.presentPosition = function () {
  return this.positionContainer.length > 0
    ? this.positionContainer[this.positionContainer.length - 1]
    : null;
};

// 위치 이동 함수
GameBasics.prototype.goToPosition = function (position) {
  // 현재 위치정보가 있다면 position container 데이터 초기화
  if (this.presentPosition()) {
    console.log('### goToPosition: position container 데이터 초기화');
    this.positionContainer.length = 0;
  }

  // position에 entry가 있다면 entry 호출
  if (position.entry) {
    console.log('### goToPosition: entry 호출');
    position.entry(play);
  }

  // positionContainer에 현재 position 저장
  this.positionContainer.push(position);
  console.log('### goToPosition: positionContainer state -> ', this.positionContainer);
};

GameBasics.prototype.pushPosition = function (position) {
  this.positionContainer.push(position);
};

GameBasics.prototype.popPosition = function () {
  this.positionContainer.pop();
};

GameBasics.prototype.start = function () {
  setInterval(function () {
    gameLoop(play);
  }, this.setting.updateSeconds * 1000);

  this.goToPosition(new OpeningPosition());
};

// Notifies the game when a key is pressed
GameBasics.prototype.keyDown = function (keyboardCode) {
  // store the pressed key in 'pressedKeys'
  this.pressedKeys[keyboardCode] = true;
  //  it calls the present position's keyDown function
  if (this.presentPosition() && this.presentPosition().keyDown) {
    this.presentPosition().keyDown(this, keyboardCode);
  }
};

//  Notifies the game when a key is released
GameBasics.prototype.keyUp = function (keyboardCode) {
  // delete the released key from 'pressedKeys'
  delete this.pressedKeys[keyboardCode];
};

// Game Loop
function gameLoop(play) {
  let presentPosition = play.presentPosition();

  if (presentPosition) {
    // update
    if (presentPosition.update) {
      presentPosition.update(play);
    }

    // draw
    if (presentPosition.draw) {
      presentPosition.draw(play);
    }
  }
}

window.addEventListener('keydown', function (e) {
  const keyboardCode = e.which || event.keyCode; // Use either which or keyCode, depending on browser support
  if (keyboardCode == 37 || keyboardCode == 39 || keyboardCode == 32) {
    e.preventDefault();
  }
  play.keyDown(keyboardCode);
});

window.addEventListener('keyup', function (e) {
  const keyboardCode = e.which || event.keyCode; // Use either which or keyCode, depending on browser support
  play.keyUp(keyboardCode);
});

// Create a GameBasics object
const play = new GameBasics(canvas);
play.start();
