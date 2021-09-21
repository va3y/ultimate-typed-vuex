import state, { State } from "./state";
import { mutations, Mutations } from "./mutations";
import { actions, Actions } from "./actions";
import { getters, Getters } from "./getters";

import { RootState } from "@/store";
import { Module } from "vuex";
import { GenericStore } from "../types";

const api: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters,
};

export type Store<S> = GenericStore<S, State, Mutations, Actions, Getters>;

export default api;
