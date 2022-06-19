import axios, { AxiosResponse } from "axios";

import { errorNotification } from "@callbacks/notifcation";

import {
  ErrorType,
  SERVER_ERROR,
  STUDENT_URL,
  setConfig,
} from "../../constants";

export interface RC {
  id: number;
  ID: number;
  is_active: boolean;
  academic_year: string;
  type: string;
  start_date: string;
  name: string;
  phase: string;
  application_count_cap: number;
}

const instance = axios.create({
  baseURL: STUDENT_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const rcRequest = {
  getAll: (token: string) =>
    instance
      .get<RC[]>("", setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        errorNotification("Error", err.response?.data?.error || err.message);
        return [] as RC[];
      }),
};
export default rcRequest;
