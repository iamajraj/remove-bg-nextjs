// @ts-nocheck

import { NextRequest } from 'next/server';
import { rembg } from '../../../lib/rembg';
import { AxiosResponse } from 'axios';

export const POST = async (req: NextRequest) => {
  const file = (await req.formData()).get('file') as unknown as File;

  const response = (await rembg({
    inputImageFile: file,
    onDownloadProgress: (ev) => {
      console.log(ev.estimated);
    },
  })) as AxiosResponse;

  return new Response(response.data, {
    headers: {
      ...response.headers,
      'content-disposition': `attachment; filename=${file.name}`,
    },
  });
};
