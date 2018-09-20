<template>
    <header class="app-header">
        <router-link class="app-logo" to="/">LOGO</router-link>
        <app-header-search/>
        <app-header-language/>
    </header>
</template>


<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HeaderSearch from '@/components/header/HeaderSearch.vue';
    import HeaderLanguage from '@/components/header/HeaderLanguage.vue';

    @Component({
        components: {
            'app-header-search': HeaderSearch,
            'app-header-language': HeaderLanguage,
        },
    })
    export default class AppHeader extends Vue {}
</script>


<style scoped lang="scss">
    .app-header {
        background-color: #000;
        height: 89px;
        padding: 24px 30px 0 10px;
        display: block;
        min-width: 1290px;
        &:after {
            content: '';
            clear: both;
            display: block;
        }
        .app-logo {
            float: left;
            padding: 0 27px 0 0;
            text-transform: uppercase;
            color: #fff;
            font-size: 100%;
            font-weight: 700;
            line-height: 38px;
            height: 38px;
        }
    }
</style>
