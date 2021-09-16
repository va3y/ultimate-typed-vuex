import state, { State } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

import { RootState } from '@/store'
import { Module } from 'vuex'
import { GenericStore } from '../types'

const api: Module<State, RootState> = {
  state,
  mutations,
  actions,
}

export type Store<S = State> = GenericStore<S, Mutations, Actions>

export default api
