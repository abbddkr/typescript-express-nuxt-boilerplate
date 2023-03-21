<template>
    <div>
        <b-navbar :fixed-top="true" type="is-dark">
            <template #brand>
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma">
                </b-navbar-item>
            </template>
            <template #start>
                <b-navbar-item href="#">
                    Home
                </b-navbar-item>
            </template>

            <template #end>
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <b-button tag="router-link" :to="{ path: '/me'}" class="button is-light">
                            Auth Info
                        </b-button>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>


        <section class="main-content columns is-mobile">
            <div class="column is-one-fifth">
                <sidebar />
            </div>
            <div class="column dashboard-content">
                <div class="box">
                    <Nuxt />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue';
export default {
    name: 'DashboardLayout',
    components: { Sidebar },
    middleware: 'auth'
}
</script>
<style>
 @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
 body{
  font-family: 'Roboto', sans-serif;
 }
.navbar.is-fixed-top{
    z-index: 999999;
}
.dashboard-content {
    margin-top: 5px;
    z-index: 99999;
}
.box{
    border-radius: 0px;
}
</style>
