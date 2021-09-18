import { ActionTree } from "vuex";
import { Mutations, AUTH_MUTATION_TYPES } from "./mutations";
import { State } from "./state";
import { RootState } from "@/store";
import { ApiCallConfig, API_ACTION_TYPES } from "../api/actions";
import { RegisterRequestBody } from "./types";
import { GenericActionContext } from "../types";

export enum AUTH_ACTION_TYPES {
  REGISTER = "AUTH_REGISTER",
  CHECK_EMAIL = "AUTH_CHECK_EMAIL",
}
type AugmentedActionContext = GenericActionContext<State, Mutations>;

export type Actions = {
  [AUTH_ACTION_TYPES.REGISTER](
    { commit }: AugmentedActionContext,
    payload: RegisterRequestBody
  ): Promise<unknown>;
  [AUTH_ACTION_TYPES.CHECK_EMAIL](
    ctx: AugmentedActionContext,
    payload: { email: string }
  ): Promise<unknown>;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [AUTH_ACTION_TYPES.CHECK_EMAIL]({ dispatch, commit }, payload) {
    try {
      const res = await dispatch<ApiCallConfig & { type: string }>(
        {
          url: "register/check-email",
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
  async [AUTH_ACTION_TYPES.REGISTER]({ dispatch, commit }, payload) {
    try {
      const res = await dispatch<ApiCallConfig & { type: string }>(
        {
          url: "register/register",
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
