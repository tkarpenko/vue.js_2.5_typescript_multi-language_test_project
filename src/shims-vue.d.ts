declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.json' {
  const content: any;
  export default content;
}

declare module 'vue/types/vue' {
  interface Vue {
    $queue: any;
  }
}
