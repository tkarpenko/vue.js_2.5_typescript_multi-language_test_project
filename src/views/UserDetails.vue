<template>
    <form id="form-user" novalidate class="app-form" @submit.prevent="onSubmit">
        <div class="form-field id-code">
            <input :aria-label="$t('id')" type="text" :placeholder="$t('id')" v-model="user.idCode" @blur="onBlur"/>
            <div class="form-field-errors"></div>
        </div>
        <div class="form-field first-name">
            <input :aria-label="$t('firstName')" type="text" :placeholder="$t('firstName')" v-model="user.firstName" @blur="onBlur"/>
            <div class="form-field-errors"></div>
        </div>
        <div class="form-field last-name">
            <input :aria-label="$t('lastName')" type="text" :placeholder="$t('lastName')" v-model="user.lastName" @blur="onBlur"/>
            <div class="form-field-errors"></div>
        </div>
        <div class="form-field email">
            <input :aria-label="$t('email')" type="text" :placeholder="$t('email')" v-model="user.email" @blur="onBlur"/>
            <div class="form-field-errors"></div>
        </div>
        <button type="submit" class="app-btn black submit">
            <span class="text" v-if="isNew">{{ $t('addUser') }}</span>
            <span class="text" v-if="!isNew">{{ $t('saveChanges') }}</span>
        </button>
    </form>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { User } from '@/models/User';
    import { Request } from '@/services/RequestService';
    import { PATTERNS, validationErrors } from '@/constants/validation';

    @Component<UserDetails>({
        /**
         * If there is a route's param "id", then get from a backend the
         * details of a user with an appropriate id before a page is loaded
         */
        async beforeRouteEnter(to, from, next) {
            if (!to.params.id) {
                next((vm: Vue) => (vm as UserDetails).setData(null));
            }
            const user = await Request.getUserDetails(+to.params.id);
            next((vm: Vue) => (vm as UserDetails).setData(user));
        },
    })
    export default class UserDetails extends Vue {
        private user: User = {
            id: 0,
            idCode: '',
            firstName: '',
            lastName: '',
            email: '',
        };
        private isNew = true;
        private isErrorInField = false;
        private isSubmitting = false;
        private wasSubmit = false;
        private formElem: any;
        private form: any = {};

        constructor() {
            super();
            this.querySelectors = this.querySelectors.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.onBlur = this.onBlur.bind(this);
        }

        /**
         * Check if this page is Edit or Add New User.
         * If it is the Edit User page, then fill form with a data od a current user
         */
        private setData(user: User|null) {
            this.isNew = user == null;
            if (!this.isNew) {
                this.user = user as User;
            }
            (this as any).$queue.add(this.querySelectors);
        }

        /**
         * Get links to HTML-elements of form's fields and errors places
         */
        private querySelectors() {
            this.formElem = document.getElementById('form-user');
            const fields = ['id-code', 'first-name', 'last-name', 'email'];
            let i = fields.length;
            while (i--) {
                this.form[fields[i]] = {
                    node: this.formElem.querySelector('.' + fields[i]) || {},
                    errors: this.formElem.querySelector('.' + fields[i] + ' .form-field-errors'),
                };
            }
        }

        /**
         * After each blur event check validity of a form
         */
        private onBlur() {
            if (!this.wasSubmit) { return; }
            this.checkErrors();
        }

        /**
         * Update the details of a current user or create a new user
         */
        private async onSubmit() {
            if (this.isSubmitting) { return; }
            this.wasSubmit = true;
            this.isErrorInField = false;

            this.checkErrors();
            if (this.isErrorInField) { return; }

            this.isSubmitting = true;
            if (this.isNew) {
                await Request.addUser(this.user);
            } else {
                await Request.updateUser(this.user);
            }
            (this as any).$router.push({path: '/'});
            this.isSubmitting = false;
        }

        /**
         * If an error is occur then show an error message and set css-class
         */
        private setError(field: string, error: string): void {
            this.isErrorInField = true;
            const fieldObj = this.form[field];
            fieldObj.errors.innerHTML = validationErrors[field][error];
            fieldObj.node.classList.add('error');
        }

        /**
         * validate all form's fields
         */
        private checkErrors() {
            let value = this.user.idCode;
            let css = this.form['id-code'].node.classList || {};
            if (!value.length) {
                this.setError('id-code', 'required');
            } else if (!PATTERNS.id.test(value)) {
                this.setError('id-code', 'pattern');
            } else {
                css.remove('error');
            }

            value = this.user.firstName;
            css = this.form['first-name'].node.classList || {};
            if (!value.length) {
                this.setError('first-name', 'required');
            } else if (value.length > 255) {
                this.setError('first-name', 'maxLength');
            } else if (!PATTERNS.notCode.test(value)) {
                this.setError('first-name', 'pattern');
            } else {
                css.remove('error');
            }

            value = this.user.lastName;
            css = this.form['last-name'].node.classList || {};
            if (!value.length) {
                this.setError('last-name', 'required');
            } else if (value.length > 255) {
                this.setError('last-name', 'maxLength');
            } else if (!PATTERNS.notCode.test(value)) {
                this.setError('last-name', 'pattern');
            } else {
                css.remove('error');
            }

            value = this.user.email;
            css = this.form.email.node.classList || {};
            if (!value.length) {
                this.setError('email', 'required');
            } else if (!PATTERNS.email.test(value)) {
                this.setError('email', 'pattern');
            } else {
                css.remove('error');
            }
        }
    }
</script>

<style scoped lang="scss">
    .app-form {
        width: 500px;
    }
</style>