export interface BadRequestFieldError {
  [key: string]: string[];
}

interface ErrorData {
  messageCode: string;
  [key: string]: string;
}

export interface HttpError {
  unauthorized: boolean;
  badRequest: boolean;
  notFound: boolean;
  clientError: boolean;
  serverError: boolean;
  // message: string;
  // title?: string;
  fieldErrors?: BadRequestFieldError;
  errors?: any;
  detail?: string;
  data?: ErrorData;
}

export interface HttpResponse<T = never> {
  status: number;
  ok: boolean;
  body?: T;
  pagination?: Pagination;
  error?: HttpError;
}

export interface BaseRequestQueryParam {
  page?: number;
  size?: number;
  sort?: string;
  [key: string]: any;
}

export interface Pagination {
  paging: any;
  total: number;
}
