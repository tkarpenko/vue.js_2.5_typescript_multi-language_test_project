<template>
    <form class="app-header-search" @submit.prevent="filterUsers">
        <i class="app-icon icon-search"></i>
        <input type="text" v-model="search" :placeholder="$t('search')">
    </form>
</template>


<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class HeaderSearch extends Vue {
        private search = this.getUrlParameter('q');

        /**
         * redirect to Users page with query param 'q'
         * /users?q=search
         */
        private filterUsers() {
            const routeObj: any = {name: 'users'};
            if (this.search && this.search.length) {
                routeObj.query = {q: this.search};
            }
            (this as any).$router.push(routeObj);
        }

        /**
         * get query params from the URL
         * example: http://localhost/?q=value
         * getUrlParameter('q') === value
         * @param
         */
        private getUrlParameter(param: string): string {
            if ( typeof param !== 'string' ) { return ''; }
            param = param.toLowerCase();
            const sPageURL = decodeURIComponent(window.location.search.substring(1));
            const sURLVariables = sPageURL.split('&');
            let sParameterName;
            let i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].toLowerCase().split('=');

                if ( sParameterName[0] && sParameterName[0] === param ) {
                    return sParameterName[1] || '';
                }
            }
            return '';
        }
    }
</script>


<style scoped lang="scss">
    $topnav-background-color: #000;
    $body-background-color: whitesmoke;
    $topnav-color: rgba(255, 255, 255, 0.95);

    .app-header-search {
        float: left;
        position: relative;
        width: 277px;
        height: 38px;
        transition: all 0.1s linear;
        .app-icon {
            position: absolute;
            top: 0px;
            left: 1px;
            display: block;
            width: 38px;
            height: 38px;
            line-height: 38px;
            font-size: 21px;
            color: $topnav-color;
        }
        input {
            background-color: #000;
            border: 1px solid #9C9FA2;
            color: $topnav-color;
            display: block;
            padding-left: 38px;
            height: 38px;
            border-radius: 3px;
            outline: none;
            outline: 0;
            width: 100%;
            font-size: 14px;
            line-height: 39px;
            &:focus {
                box-shadow: none;
            }
            &:-webkit-autofill,
            &:-webkit-autofill:focus {
                box-shadow: 0 0 0 50px $topnav-background-color inset;
                -webkit-box-shadow: 0 0 0 50px $topnav-background-color inset;
                -webkit-text-fill-color: $topnav-color;
            } 
            &::-webkit-input-placeholder {
                color: $topnav-color;
            }
            &:-moz-placeholder {
                color: $topnav-color;
            }
            &::-moz-placeholder {
                color: $topnav-color;
            }
            &:-ms-input-placeholder {
                color: $topnav-color;
            }
        }
    }
</style>