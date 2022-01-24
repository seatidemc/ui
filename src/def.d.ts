import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $isAdmin: boolean,
        $bus: Vue
    }
}