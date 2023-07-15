'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const inp = useRef<HTMLInputElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewImage(fileReader.result!.toString());
    };

    fileReader.readAsDataURL(file);
    setImage(file);
  };

  const onUpload = () => {
    if (!image) {
      toast.error('Please select an image first');
      return;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 h-screen flex flex-col">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl">
          <span className="font-bold">rEmove</span> background Image
        </h1>
        <div className="flex items-center gap-3">
          <p className="w-8 h-8 border rounded-full flex items-center justify-center">
            R
          </p>
          <span>raaaaaj@email.com</span>
        </div>
      </div>

      <div className="flex items-center w-full h-full gap-5 mt-10 relative">
        <div className="border flex-1 h-full flex flex-col rounded-lg p-10 gap-10">
          {previewImage ? (
            <img src={previewImage} className="aspect-square h-full w-full" />
          ) : (
            <div className="flex-1"></div>
          )}
          <input
            multiple={false}
            onChange={onChange}
            ref={inp}
            type="file"
            hidden
            id="img"
            accept=".png,.jpeg,.jpg"
          />
          <div className="space-y-4">
            <button
              onClick={() => {
                inp.current?.click();
              }}
              className="w-full py-4 rounded-full border-gray-800 border hover:scale-[1.02] transition-transform active:scale-95"
            >
              {previewImage ? 'Change Image' : 'Select Image'}
            </button>
            <button
              onClick={onUpload}
              disabled={image === null}
              className="w-full py-4 rounded-full border-gray-800 border hover:scale-[1.02] transition-transform active:scale-95 disabled:text-gray-500 disabled:bg-gray-100"
            >
              Remove Background
            </button>
          </div>
        </div>
        <div className="absolute left-1/2 ml-3 bg-white shadow-lg rounded-full p-2">
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
        </div>
        <div className="border flex-1 h-full">
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-light underline">
              *Your result will appear here*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
