import Vue from 'vue'
import {AxiosInstance} from 'axios'

interface myAxios {
  request: AxiosInstance,
  baseURL: String
}

declare module "vue/types/vue" {
  interface Vue {
    $axios: myAxios
  }
}