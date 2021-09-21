import { Store } from "vuex";
import { RootState } from ".";
import { ActionContext } from "vuex";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type GenericActionContext<
  State,
  Mutations extends {
    [key: string]: (
      state: State,
      payload: Parameters<Mutations[string]>[1]
    ) => void;
  }
> = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & ActionContext<State, RootState>;

export type GenericStore<
  RootState,
  LocalState,
  Mutations extends {
    [key: string]: (
      state: LocalState,
      payload: Parameters<Mutations[string]>[1]
    ) => void;
  },
  Actions extends {
    [key: string]: (
      ctx: GenericActionContext<LocalState, Mutations>,
      payload: Parameters<Actions[string]>[1]
    ) => void;
  },
  Getters extends { [key: string]: (state: LocalState) => void } = {
    [key: string]: () => undefined;
  }
> = Omit<VuexStore<RootState>, "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}
