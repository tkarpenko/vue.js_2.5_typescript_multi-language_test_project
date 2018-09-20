<template>
    <div class="app-dropdown" :class="{'show': isDropdownOpened}">
        <button type="button" class="nav-link" @click="isDropdownOpened = !isDropdownOpened">
            <i class="app-icon icon-globe"></i>
            <span class="header-dropdown-title">{{ $t('language') }}</span>
        </button>
        <div class="dropdown-menu">
            <a class="dropdown-item" href="javascript:void(0)" @click="changeLang('en')">English</a>
            <a class="dropdown-item" href="javascript:void(0)" @click="changeLang('ua')">Українська</a>                      
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { loadLanguageAsync } from '@/assets/i18n/i18n-setup';

    @Component
    export default class HeaderLanguage extends Vue {
        private isDropdownOpened = false;

        private changeLang(lang: string) {
            loadLanguageAsync(lang);
            this.isDropdownOpened = false;
        }
    }
</script>


<style scoped lang="scss">
    .app-dropdown {
        float: right;
        position: relative;
        margin: 8px 0 0 10px;
    }
</style>
