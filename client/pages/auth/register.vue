<template>
    <AuthCard title="Register">
        <div v-if="!$auth.loggedIn">
            <b-field label="Username" label-position="on-border">
                <b-input ref="registerRef" icon="face" required pattern="^[a-zA-Z0-9_.-]*$"
                    validation-message="Only letters and numbers are allowed." v-model="user.username"></b-input>
            </b-field>
            <b-field label="Email" label-position="on-border">
                <b-input ref="registerRef" required type="email" v-model="user.email" icon="email"></b-input>
            </b-field>
            <b-field label-position="on-border" label="Password">
                <b-input ref="registerRef" icon="lock" required v-model="user.password" type="password" minlength="6"
                    maxlength="20" :has-counter="false"></b-input>
            </b-field>
            <b-field label-position="on-border" label="Confirm Password">
                <b-input ref="registerRef" icon="lock" required v-model="user.confirm_password" type="password"
                    minlength="6" maxlength="20" password-reveal></b-input>
            </b-field>
            <b-field>
                <b-button @click="handleRegistrationForm" type="is-primary" outlined>Register</b-button>
            </b-field>
            <b-field grouped position="is-right">
                <b-button type="is-secondary" class="is-small m-1" outlined>Reset Password</b-button>
                <b-button tag="router-link" :to="{ path: '/auth/login' }" type="is-secondary" class="is-small m-1"
                    outlined>Login</b-button>
            </b-field>
        </div>
        <div v-else>
            You are already logged in. You cannot register with another user!
        </div>
    </AuthCard>
</template>
<script>
import AuthCard from '~/components/AuthCard'

export default {
    layout: 'auth',
    components: { AuthCard },
    data() {
        return {
            user: {},
            hasError: false,
            errors: {},
        }
    },
    methods: {
        async handleRegistrationForm() {
            try {
                if (this.$refs.registerRef.checkHtml5Validity()) {
                    if (this.user.password === this.user.confirm_password) {

                        const user = await this.$axios.$post('register', this.user);
                        if (user) {
                            this.$axios.showSuccess('Account created successfully, log in to continue!');
                            this.$router.push('/auth/login')
                        }
                        else {
                            this.$axios.showDanger("Something is wrong, please confirm your data and try again");
                        }
                    }
                    else {
                        this.$axios.showDanger("Confirm Password field must match your password");
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>
<style>
</style>
