const canvas = document.getElementById('ufo_canvas');
const ctx = canvas.getContext('2d');

const image = new Image();

image.src = 'images/ufo.png';
image.onload = () => {
  return ctx.drawImage(image, 0, 0);
};
