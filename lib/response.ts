import { ApiResponse } from "./types/api";
import { ResponseCode } from "./constants/response-code";

export function success<T>(
  data: T,
  msg = "success"
): ApiResponse<T> {
  return {
    code: ResponseCode.SUCCESS,
    msg,
    data,
  };
}

export function fail(
  msg = "fail",
  code = ResponseCode.SERVER_ERROR
): ApiResponse<null> {
  return {
    code,
    msg,
    data: null,
  };
}
