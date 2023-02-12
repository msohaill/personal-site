export const shuffleArray = <T>(arr: T[]) => {
  let i = arr.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const basename = (name: string) => name.split(/[\\/]/).reverse()[0];
export const unhasedBasename = (name: string) =>
  basename(name).replace(/(.+)-.+(\.(png|jpe?g|svg))$/i, '$1$2');
