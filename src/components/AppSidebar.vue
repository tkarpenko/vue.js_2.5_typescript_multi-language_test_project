<template>
    <div class="app-sidebar" :style="{height: sidebarHeight}">
        <ul class="sidebar-nav-content">
            <li v-for="nav in navigation" :key="nav.title">
                <router-link class="sidebar-nav-link" :to="nav.link">
                    <i :class="[nav.icon]"></i>
                    <span>{{ $t(nav.title) }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>


<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    
    @Component
    export default class AppSidebar extends Vue {
        private navigation: any = [
            { link: '/users', icon: 'app-icon icon-man', title: 'users' },
            { link: '/add', icon: 'app-icon icon-man-add', title: 'addUser' },
        ];
        private HEADER_HEIGHT = 89;
        private sidebarHeight = `calc(100vh - ${this.HEADER_HEIGHT}px)`;

        /**
         * listen scrolling
         */
        private created() {
            window.addEventListener('scroll', this.onScroll.bind(this), {passive: true});
        }

        /**
         * set the height of a stikked sidebar
         */
        private onScroll() {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > this.HEADER_HEIGHT) {
                this.sidebarHeight = `100vh`;
                return;
            }
            this.sidebarHeight = `calc(100vh - ${this.HEADER_HEIGHT - scrolled}px)`;
        }
    }
</script>


<style lang="scss">
    $topnav-background-color: #000;
    $body-background-color: whitesmoke;
    $topnav-color: rgba(255, 255, 255, 0.95);
    $body-color: #151515;
    $sidebar-animation-time: 0.2s;

    .app-sidebar {
        position: fixed;
        left: 0;
        bottom: 0;
        height: calc(100vh - 89px);
        display: block;
        width: 89px;
        border-right: 1px solid transparent; 
        transition: width $sidebar-animation-time linear,
                    background-color 0.01s $sidebar-animation-time linear,
                    border-color 0.01s $sidebar-animation-time linear;
        overflow: hidden;
        background-color: transparent;
        z-index: 3;
        &:before {
            content: '';
            width: 89px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: $topnav-background-color;
            z-index: 1;
            transition: all $sidebar-animation-time linear;
        }
        .sidebar-nav-content {
            width: calc(100% + 30px);
            padding-right: 30px;
            height: 100%;
            overflow: auto;
            overflow-x: hidden;
            list-style: none;
            padding: 0;
            margin: -3px 0 0 0;
            position: relative;
            z-index: 2;
            & > li {
                width: 89px;
                transition: all $sidebar-animation-time linear;
            }
            .sidebar-nav-link {
                display: block;
                height: 89px;
                width: 100%;
                color: #fff;
                padding: 12px 0 12px 0;
                text-align: center;
                position: relative;
                margin: 3px 0;
                transition: padding-top 0.2s linear;
                & > .app-icon {
                    font-size: 32px;
                }
                & > span {
                    text-transform: uppercase;
                    font-size: 11px;
                    line-height: 15px;
                    text-align: center;
                    position: absolute;
                    opacity: 1;
                    top: 57px;
                    font-weight: 300;
                    display: block;
                    width: 100%;
                    padding: 0 5px;
                    transition: opacity $sidebar-animation-time linear;
                }
                &.router-link-active {
                    background-color: $body-background-color;
                    color: #222;
                }
            }
        }
    }
</style>