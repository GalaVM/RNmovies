export type ResponseData<D> = {
  data?: D;
  error?: ResponseError;
};

export interface ResponseError {
  errors?: any;
  message?: string;
}
