import type { ApiRequest, ApiResponse } from './_lib/token';

export default function handler(_req: ApiRequest, res: ApiResponse) {
  return res.status(200).json({
    status: 'ok',
    service: 'The Behavior Canvas Platform API',
    runtime: 'vercel-serverless',
  });
}
