import Jimp from "jimp";

// export default function getBitmap(filename: string) {
//   Jimp.read(filename, (err, img) => {
//     if (err) throw err;
//     return img.greyscale().bitmap;
//   });
// }

export default async function getBitmap(filename: string) {
  const img = await Jimp.read(filename);
  const bitmap = img.greyscale().bitmap;
  return bitmap;
}
