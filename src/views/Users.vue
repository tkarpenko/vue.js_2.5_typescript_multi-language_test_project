<template>
    <table class="app-table">
        <tr class="table-head">
            <td>{{ $t('id') }}</td>
            <td>{{ $t('firstName') }}</td>
            <td>{{ $t('lastName') }}</td>
            <td>{{ $t('email') }}</td>
            <td class="table-actions">&nbsp;</td>
        </tr>
        <tr class="table-row" v-for="user in users" :key="user.id">
            <td>{{user.idCode}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.email}}</td>
            <td class="table-actions">
                <table-action
                    icon="icon-pencil" tip-msg="editUser" :tip-css="['right', 'one-row']" :key="'tip-1-'+user.id"
                    @edit="edit(user)"/>
                <table-action
                    icon="icon-bin" tip-msg="removeUser" :tip-css="['right', 'one-row']" :key="'tip-2-'+user.id"
                    @remove="remove(user)"/>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { User } from '@/models/User';
    import { Request } from '@/services/RequestService';
    import TableAction from '@/components/TableAction.vue';

    @Component({
        components: {
            'table-action': TableAction,
        },
        /**
         * before a page is loaded
         * get the list with users according to a search
         * ('q' query param)
         */
        async beforeRouteEnter(to, from, next) {
            const q = to.query.q;
            next((vm: Vue) => (vm as Users).getUsers(q && q.length ? q : null));
        },
        /**
         * after a page is loaded and 'q' query param is changed
         * get the list with users according to a search
         */
        async beforeRouteUpdate(to, from, next) {
            const q = to.query.q;
            (this as Users).getUsers(q && q.length ? q : null);
            next();
        },
    })
    export default class Users extends Vue {
        public users: User[] = [];

        /**
         * Get a filtered list with users
         */
        private async getUsers(filter?: any) {
            this.users = await Request.getUsers(filter);
        }

        /**
         * reditect to an Edit User page
         */
        private edit(user: User) {
            (this as any).$router.push({ path: `/user/${user.id}` });
        }

        /**
         * remove a selected user and get an updated list with users
         */
        private async remove(user: User) {
            await Request.removeUser(user.id);
            this.getUsers();
        }
    }
</script>

<style scoped lang="scss">
    .table-actions {
        width: 90px;
    }
</style>