// biome-ignore lint/style/useExportType: <explanation>
export {};

declare global {
  namespace Express {
    interface Request {
      candidate?: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
      };
      token?: string;
    }
  }
}
