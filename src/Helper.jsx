import Resizer from "react-image-file-resizer";

const sum = (numbers, initialValue = 0) =>
  numbers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
export const average = (numbers) => Math.round((sum(numbers) / numbers.length) * 10) / 10;

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      150,
      150,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export function* zip(...args) {
  const length = args[0].length;
  for (let arr of args) {
    if (arr.length !== length) {
      return "Lengths of arrays are not eqaul.";
    }
  }
  for (let index = 0; index < length; index++) {
    let elms = [];
    for (let arr of args) {
      elms.push(arr[index]);
    }
    yield elms;
  }
}
