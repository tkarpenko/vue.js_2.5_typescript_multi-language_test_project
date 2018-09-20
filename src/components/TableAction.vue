<template>
    <div class="table-action">
        <button
            type="button" class="app-btn"
            @click="$emit(tipMsg === 'removeUser' ? 'remove' : 'edit')">
            <i :class="['app-icon', icon]"></i>
        </button>
        <app-tip :msg="tipMsg" class="app-tip" :class="tipCss"/>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class TableAction extends Vue {
        @Prop() private icon!: string;
        @Prop() private tipMsg!: string;
        @Prop() private tipCss!: string[];
    }
</script>


<style scoped lang="scss">
    .table-action {
        width: 40px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 3px;
        position: relative;
    }
</style>