import { Requests } from "./types";

export interface State {
  requests: Requests;
}

export default (): State => ({
  requests: {},
});
