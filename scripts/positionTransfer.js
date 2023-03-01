function TransferPosition(level) {
  this.level = level;
  this.fontSize = 140;
  this.fontColor = 255;
}

TransferPosition.prototype.draw = function (play) {
  ctx.clearRect(0, 0, play.width, play.height);
  ctx.font = '40px Comic Sans MS';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, ' + this.fontColor + ', ' + this.fontColor + ', 1)';
  ctx.fillText('Get ready for level ' + this.level, play.width / 2, play.height / 2);
};
