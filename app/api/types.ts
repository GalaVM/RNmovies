export type ResponseData<D> = {
  data?: D;
  error?: ResponseError;
};

export interface ResponseError {
  message: string;
}
