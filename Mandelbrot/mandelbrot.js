var minval;
var maxval;

var minSlider;
var maxSlider;

function setup() {
  createCanvas(240, 240);
  pixelDensity(1);

  minSlider = createSlider(-2.5, 0, -2.5, .01);
  maxSlider = createSlider(0, 2.5, 2.5, .01);
}


function draw() {

  var maxiterations = 100;
  minval = minSlider.value();
  maxval = maxSlider.value();
  loadPixels();

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var a = map(x, 0, width, minval, maxval);
      var b = map(y, 0, height, minval, maxval);

      var ca = a;
      var cb = b;

      var n = 0;

      while (n < maxiterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 16) {
          break;
        }

        n++;

      }

      var bright;

      bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      //bright = (n * 16) % 255;
      //bright = 200;

      if (n == maxiterations) {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}