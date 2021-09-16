import { ActionTree } from 'vuex'
import { Mutations, API_MUTATION_TYPES } from './mutations'
import { State } from './state'
import { RootState } from '@/store'
import { v4 as uuid } from 'uuid'

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { $axios } from '@/plugins/axios'
import { GenericActionContext } from '../types'

export enum API_ACTION_TYPES {
  API_CALL = 'API_API_CALL',
  CANCEL_REQUEST = 'API_CANCEL_REQUEST',
  CANCEL_ALL_REQUESTS = 'API_CANCEL_ALL_REQUESTS',
}

type AugmentedActionContext = GenericActionContext<State, Mutations>

export interface ApiCallConfig extends AxiosRequestConfig {
  requestId?: string
}

export type Actions = {
  [API_ACTION_TYPES.API_CALL](
    ctx: AugmentedActionContext,
    payload: ApiCallConfig
  ): Promise<unknown>
  [API_ACTION_TYPES.CANCEL_REQUEST](
    ctx: AugmentedActionContext,
    requestId: string
  ): Promise<true>
  [API_ACTION_TYPES.CANCEL_ALL_REQUESTS](
    ctx: AugmentedActionContext
  ): Promise<true>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [API_ACTION_TYPES.API_CALL]({ commit }, config) {
    const requestId = config.requestId ?? uuid()
    try {
      const CancelToken = axios.CancelToken
      const { data }: AxiosResponse = await $axios.request({
        ...config,
        cancelToken: new CancelToken((handler) => {
          commit(API_MUTATION_TYPES.SET_REQUEST, {
            requestId,
            handler,
          })
        }),
      })

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit(API_MUTATION_TYPES.DELETE_REQUEST, requestId)
    }
  },
  [API_ACTION_TYPES.CANCEL_REQUEST](
    { state, commit },
    requestId
  ): Promise<true> {
    if (state.requests[requestId]) {
      commit(API_MUTATION_TYPES.DELETE_REQUEST, requestId)
    }
    return Promise.resolve(true)
  },
  [API_ACTION_TYPES.CANCEL_ALL_REQUESTS]({ state, dispatch }): Promise<true> {
    Object.keys(state.requests).forEach((key) => {
      dispatch('CANCEL_REQUEST', key)
    })
    return Promise.resolve(true)
  },
}
