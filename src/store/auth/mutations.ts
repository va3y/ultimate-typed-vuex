import { MutationTree } from "vuex";
import { State } from "./state";

export enum AUTH_MUTATION_TYPES {
  SET_TOKEN = "AUTH_SET_TOKEN",
}

export type Mutations = {
  [AUTH_MUTATION_TYPES.SET_TOKEN](state: State, token: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [AUTH_MUTATION_TYPES.SET_TOKEN](state, token) {
    state.token = token;
  },
};
