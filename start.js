const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const MAX_CHARS = 300;
const chars = "$%?{|+~. ";

const toGray = (red, green, blue) => {
  return Math.round(red * 0.21 + green * 0.72 + 0.07 * blue);
};

const parseImg = async (filename) => {
  try {
    return (img = await Jimp.read("./src/star.jpg"));
  } catch (err) {
    console.error(err);
  }
};

const mapper = (val) => {
  const cof = chars.length / 255;
  const ret = Math.round(cof * val);
  return ret < chars.length ? ret : chars.length - 1;
};

const main = async () => {
  const img = await parseImg("");
  const { width, height, data } = img.bitmap;
  const scale = MAX_CHARS / width;
  const char_height_to_width = 18 / 7;
  const kernel_size = Math.floor(1 / scale);
  let k = 0,
    output = "";
  if (false) {
    for (let i = 0; i < Math.floor(height * scale); i++) {
      for (let j = 0; j < Math.floor(width * scale); j++) {
        let pixel = 0;
        img.scan(i, j, kernel_size, kernel_size, (x, y, idx) => {
          const pixel_val = toGray(data[idx], data[idx + 1], data[idx + 2]);
          pixel += Math.round(pixel_val / (kernel_size * kernel_size));
        });
        output += chars[mapper(pixel)];
      }
      output += "\n";
    }
  } else {
    img.scan(0, 0, width, height, (x, y, idx) => {
      if (k !== y) {
        output += "\n";
        k = y;
      }
      const pixel = toGray(data[idx], data[idx + 1], data[idx + 2]);
      output += chars[mapper(pixel)];
    });
  }
  console.log(output);
};

main();
