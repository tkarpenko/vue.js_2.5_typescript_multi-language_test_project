<template>
    <div id="app">
        <app-header/>
        <app-sidebar/>
        <section class="app-container">
            <router-view></router-view>
        </section>        
    </div>
</template>

<style src="./assets/styles/app.scss" lang="scss"></style>
<style scoped lang="scss">
    .app-container {
        padding: 15px;
        margin-left: 89px;
        position: relative; 
        z-index: 1;
        min-width: 1200px;
    }
</style>