import { ActionTree } from "vuex";
import { Mutations, AUTH_MUTATION_TYPES } from "./mutations";
import { State } from "./state";
import { RootState } from "@/store";
import { ApiCallConfig, API_ACTION_TYPES } from "../api/actions";
import { LoginRequestBody } from "./types";
import { GenericActionContext } from "../types";

export enum AUTH_ACTION_TYPES {
  LOGIN = "AUTH_LOGIN",
  LOGIN2 = "AUTH_LOGIN2",
}
type AugmentedActionContext = GenericActionContext<State, Mutations>;

export type Actions = {
  [AUTH_ACTION_TYPES.LOGIN](
    { commit }: AugmentedActionContext,
    payload: LoginRequestBody
  ): Promise<unknown>;
  [AUTH_ACTION_TYPES.LOGIN2](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<unknown>;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [AUTH_ACTION_TYPES.LOGIN]({ dispatch, commit }, payload) {
    try {
      const res = await dispatch<ApiCallConfig & { type: string }>(
        {
          url: "user/login",
          method: "POST",
          data: payload,
          type: API_ACTION_TYPES.API_CALL,
        },
        {
          root: true,
        }
      );
      commit(AUTH_MUTATION_TYPES.SET_TOKEN, res);
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [AUTH_ACTION_TYPES.LOGIN2]({ dispatch, commit }, payload) {
    try {
      const res = await dispatch<ApiCallConfig & { type: string }>(
        {
          url: "user/login",
          method: "POST",
          data: payload,
          type: API_ACTION_TYPES.API_CALL,
        },
        {
          root: true,
        }
      );
      commit(AUTH_MUTATION_TYPES.SET_TOKEN, res);
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
