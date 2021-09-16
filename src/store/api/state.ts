import { Canceler } from "axios";

export interface State {
  requests: { [key: string]: Canceler };
}

export default (): State => ({
  requests: {},
});
