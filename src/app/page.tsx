'use client';

import axios from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { fileToDataUrl } from '../lib/fileToDataUrl';
import { Shimmer } from 'react-shimmer';

export default function Home() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [removedBGImage, setRemovedBGImage] = useState<string | null>();
  const [progressing, setProgressing] = useState(false);
  const inp = useRef<HTMLInputElement | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setPreviewImage(dataUrl);
    setImage(file);
  };

  const downloadImage = () => {
    const a = document.createElement('a');
    a.href = removedBGImage!;
    a.download = 'bg-remove-' + image?.name;
    a.click();
  };

  const onUpload = async () => {
    if (!image) {
      toast.error('Please select an image first');
      return;
    }
    setProgressing(true);
    const data = new FormData();
    data.append('file', image);
    const response = await axios.post('/api/rmbg', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    });
    const dataUrl = await fileToDataUrl(response.data);
    setRemovedBGImage(dataUrl);
    setProgressing(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-10 pb-20 h-screen flex flex-col">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl">
          <span className="font-bold">rEmove</span> background from Image
        </h1>
        <a
          href="https://github.com/iamajraj"
          className="flex items-center gap-1"
          target="_blank"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt=""
            className="w-5 h-5"
          />
          <p>/ iamajraj</p>
        </a>
      </div>

      <div className="flex items-center flex-1 gap-5 mt-10 relative">
        <div className="border flex-1 h-full max-h-[700px] w-1/2 rounded-lg flex flex-col gap-4 p-5">
          {previewImage ? (
            <img src={previewImage} className="h-[77%] w-full aspect-square" />
          ) : (
            <div className="flex-1"></div>
          )}
          <div className="space-y-4 ">
            <input
              multiple={false}
              onChange={onChange}
              ref={inp}
              type="file"
              hidden
              id="img"
              accept=".png,.jpeg,.jpg"
            />
            <button
              onClick={() => {
                inp.current?.click();
              }}
              disabled={progressing}
              className="w-full py-4 rounded-full border-gray-800 border hover:scale-[1.02] transition-transform active:scale-95 disabled:text-gray-500 disabled:bg-gray-100"
            >
              {previewImage ? 'Change Image' : 'Select Image'}
            </button>
            <button
              onClick={onUpload}
              disabled={image === null || progressing}
              className="w-full py-4 rounded-full border-gray-800 border hover:scale-[1.02] transition-transform active:scale-95 disabled:text-gray-500 disabled:bg-gray-100"
            >
              {progressing ? 'Processing...' : 'Remove Background'}
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 -ml-5 bg-white shadow-lg rounded-full p-2 z-10 border">
          {progressing ? (
            <svg
              className="animate-spin w-10 h-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </div>

        <div className="relative border flex-1 h-full max-h-[500px] w-1/2 rounded-lg flex items-center justify-center">
          {progressing ? (
            <Shimmer width={300} height={300} />
          ) : removedBGImage ? (
            <img src={removedBGImage} className="h-full w-full aspect-square" />
          ) : (
            <p className="font-light underline">
              *Your result will appear here*
            </p>
          )}
          {removedBGImage && (
            <div
              onClick={downloadImage}
              className="rounded-full p-3 absolute -top-5 -right-5 bg-white shadow-lg cursor-pointer border hover:scale-[1.02] transition-transform active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
