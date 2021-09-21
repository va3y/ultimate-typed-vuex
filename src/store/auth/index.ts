import state, { State } from "./state";
import { mutations, Mutations } from "./mutations";
import { actions, Actions } from "./actions";
import { RootState } from "@/store";
import { Module } from "vuex";
import { GenericStore } from "../types";

export type Store<S> = GenericStore<S, State, Mutations, Actions>;

const authModule: Module<State, RootState> = {
  state,
  mutations,
  actions,
};

export default authModule;
