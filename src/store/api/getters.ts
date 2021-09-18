import { GetterTree } from "vuex";
import { State } from "./state";
import { RootState } from "@/store";

export type Getters = {
  showLoading(state: State): boolean;
};

export const getters: GetterTree<State, RootState> & Getters = {
  showLoading: (state) => {
    return Boolean(
      Object.values(state.requests).reduce(
        (acc, curr) => acc || curr.showLoading,
        false
      )
    );
  },
};
