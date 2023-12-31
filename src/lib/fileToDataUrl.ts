export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result!.toString());
    };

    fileReader.readAsDataURL(file);
  });
};
