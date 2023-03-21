<template>
    <AuthCard title="Login">
        <form >
        <b-field label="Username" label-position="on-border">
            <b-input icon="face" required pattern="^[a-zA-Z0-9_.-]*$"
                validation-message="Only letters and numbers are allowed." v-model="userForm.username"></b-input>
        </b-field>
        <b-field label-position="on-border" label="Password">
            <b-input icon="lock" required v-model="userForm.password" type="password" minlength="6" maxlength="20"
                :has-counter="false"></b-input>
        </b-field>
        <b-field>
            <b-button @click="handleLoginForm" type="is-primary" outlined>Log in</b-button>
        </b-field>
        <b-field grouped position="is-right">
            <b-button type="is-secondary" class="is-small m-1" outlined>Reset Password</b-button>
            <b-button tag="router-link" :to="{path: '/auth/register'}" type="is-secondary" class="is-small m-1" outlined>Sign Up</b-button>
        </b-field>
        </form>
    </AuthCard>
</template>
<script>
import AuthCard from '~/components/AuthCard'
export default {
    layout: 'auth',
    components: { AuthCard },
    data() {
        return {
            userForm: {
                username: '',
                password: ''
            },
            hasError: false,
        }
    },
    methods: {
        async handleLoginForm(){
            try {
                await this.$auth.loginWith('local', { data: this.userForm})
                this.$router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>
<style>
</style>
