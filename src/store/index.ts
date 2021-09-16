import { createStore, createLogger, Store as VuexStore, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";

import api, { Store as ApiStore } from "./api";
import { State as ApiState } from "./api/state";

import auth, { Store as AuthStore } from "./auth";
import { State as AuthState } from "./auth/state";

export const storeKey: InjectionKey<VuexStore<RootState>> = Symbol();

export interface RootState {
  api: ApiState;
  auth: AuthState;
}

export type RootStore = ApiStore<Pick<RootState, "api">> & AuthStore<Pick<RootState, "auth">>;

export const store = createStore<RootState>({
  modules: { api, auth },
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
  strict: !!process.env.DEBUGGING,
});

export default function useStore(): RootStore {
  return baseUseStore(storeKey);
}
