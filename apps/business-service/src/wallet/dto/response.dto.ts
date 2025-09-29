export class ResponseDto<T> {
  code: string; // Ej: '000', '400', '404'
  message: string;
  data: T | null;
}
