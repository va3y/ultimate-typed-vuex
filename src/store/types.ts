import { Store } from "vuex";
import { RootState } from ".";
import { ActionContext } from "vuex";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type GenericActionContext<
  State,
  Mutations extends { [key: string]: (state: State, payload: any) => void }
> = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & ActionContext<State, RootState>;

export type GenericStore<
  State,
  Mutations extends { [key: string]: (state: any, payload: any) => void },
  Actions extends {
    [key: string]: (state: any, payload: any) => void;
  },
  Getters extends { [key: string]: (state: any) => void } = {
    [key: string]: () => undefined;
  }
> = Omit<VuexStore<State>, "commit" | "getters" | "dispatch"> & {
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
