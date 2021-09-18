import { Canceler } from "axios";

export interface Requests {
  [key: string]: { handler: Canceler; showLoading: boolean };
}
