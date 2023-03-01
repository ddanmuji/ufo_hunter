function OpeningPosition() {}

OpeningPosition.prototype.draw = function (play) {
  ctx.clearRect(0, 0, play.width, play.height);
  ctx.font = '80px Comic Sans MS';
  ctx.textAlign = 'center';
  const gradient = ctx.createLinearGradient(
    play.width / 2 - 180,
    play.height / 2,
    play.width / 2 + 180,
    play.height / 2,
  );
  gradient.addColorStop('0', 'yellow');
  gradient.addColorStop('0.5', 'red');
  gradient.addColorStop('1.0', 'yellow');
  ctx.fillStyle = gradient;
  ctx.fillText('UFO HUNTER', play.width / 2, play.height / 2 - 70);

  ctx.font = '40px Comic Sans MS';
  ctx.fillStyle = '#D7DF01';
  ctx.fillText("시작하려면 'space'키를 눌러주세요!", play.width / 2, play.height / 2);

  ctx.fillStyle = '#2e2f00';
  ctx.fillText('조작법', play.width / 2, play.height / 2 + 210);
  ctx.fillText('왼쪽키: 왼쪽으로 이동', play.width / 2, play.height / 2 + 260);
  ctx.fillText('오른쪽키: 오른쪽으로 이동', play.width / 2, play.height / 2 + 300);
  ctx.fillText('space키: 공격', play.width / 2, play.height / 2 + 340);
};

OpeningPosition.prototype.keyDown = function (play, keyCode) {
  if (keyCode == 32) {
    play.level = 1;
    play.score = 0;
    play.shields = 2;
    play.goToPosition(new TransferPosition(play.level));
  }
};
