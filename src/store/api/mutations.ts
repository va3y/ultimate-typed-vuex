import { Canceler } from "axios";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum API_MUTATION_TYPES {
  SET_REQUEST = "API_SET_REQUEST",
  DELETE_REQUEST = "API_DELETE_REQUEST",
}

export type Mutations<S = State> = {
  [API_MUTATION_TYPES.SET_REQUEST](state: S, payload: { requestId: string; handler: Canceler }): void;

  [API_MUTATION_TYPES.DELETE_REQUEST](state: S, requestId: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [API_MUTATION_TYPES.SET_REQUEST](state, { requestId, handler }) {
    state.requests[requestId] = handler;
  },
  [API_MUTATION_TYPES.DELETE_REQUEST](state, requestId) {
    const cancel = state.requests[requestId];
    if (cancel) {
      cancel();
      delete state.requests[requestId];
    }
  },
};
