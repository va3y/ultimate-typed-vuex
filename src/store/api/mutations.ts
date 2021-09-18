import { MutationTree } from "vuex";
import { State } from "./state";
import { Requests } from "./types";

export enum API_MUTATION_TYPES {
  SET_REQUEST = "API_SET_REQUEST",
  DELETE_REQUEST = "API_DELETE_REQUEST",
}

export type Mutations = {
  [API_MUTATION_TYPES.SET_REQUEST](
    state: State,
    payload: Requests[keyof Requests] & { requestId: string }
  ): void;

  [API_MUTATION_TYPES.DELETE_REQUEST](state: State, requestId: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [API_MUTATION_TYPES.SET_REQUEST](state, { requestId, handler, showLoading }) {
    state.requests[requestId] = { handler, showLoading };
  },
  [API_MUTATION_TYPES.DELETE_REQUEST](state, requestId) {
    const { handler: cancel } = state.requests[requestId];
    if (cancel) {
      cancel();
      delete state.requests[requestId];
    }
  },
};
