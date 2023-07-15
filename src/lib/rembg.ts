import axios, { AxiosProgressEvent } from 'axios';
import FormData from 'form-data';

// API_KEY will be loaded from the .env file
const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

type REMBG_TYPE = {
  inputImagePath?: string;
  inputImageFile?: File;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

export const rembg = async ({
  inputImageFile,
  onUploadProgress,
  onDownloadProgress,
}: REMBG_TYPE) => {
  const url = URL;
  const API_KEY_HEADER = 'x-api-key';

  const data = new FormData();

  const bytes = await inputImageFile!.arrayBuffer();
  const buffer = Buffer.from(bytes);
  data.append('image', buffer, {
    filename: inputImageFile?.name,
    contentType: inputImageFile?.type,
  });

  try {
    const response = await axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url,
      headers: {
        'Content-Type': 'multipart/formdata',
        [API_KEY_HEADER]: API_KEY,
        ...data.getHeaders(),
      },
      data,
      responseType: 'arraybuffer',
      onUploadProgress,
      onDownloadProgress,
    });
    return response;
  } catch (error) {
    console.error(error);
    return { outputImagePath: null, cleanup: null };
  }
};
