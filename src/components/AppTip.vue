<template>
    <div :class="css">
        <div class="msg">
            {{$t(msg)}}
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class AppTip extends Vue {
        @Prop() private msg!: string;
        @Prop() private css!: string[];
    }
</script>


<style scoped lang="scss">
    .app-tip {
        z-index: -1;
        opacity: 0;
        position: absolute;
        text-indent: -9999px;
        .msg {
            opacity: 0;
            border-radius: 2px;
            background-color: rgba(97,97,97,.96);
            color: #fff;
            font-size: 12px;
            padding: 6px 8px;
            transition: opacity 0.2s linear;
            line-height: 17px;
            white-space: normal;
            display: inline-block;
            max-width: 200px;
        }
        &.one-row .msg {
            white-space: nowrap;
            max-width: 100%;
        }
        &:not(.right) {
            left: 10px;
        }
        &.right {
            right: 10px;
        }
        &:not(.top) {
            top: 38px;
        }
        &.top {
            bottom: 38px;
        }
    }
    :hover + .app-tip {
        z-index: 1;
        opacity: 1;
        text-indent: 0;
        .msg {
            transition: opacity 0.2s 0.9s linear;
            opacity: 1;
        }
    }
</style>
