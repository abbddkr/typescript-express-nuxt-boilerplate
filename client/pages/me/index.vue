<template>
    <section>
        <div class="columns ">
            <div class="column">
                <h4 class="title is-4">
                    {{ pageTitle }}
                </h4>
                <hr>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div>
                    You can extract authentication info with
                    <span class="vue-code-snippet"></span>
                    <hr>
                    <code><pre>{{ $auth.user }}</pre></code>
                </div>
                <hr>
                <p>
                    For more, Please visit the offical <a target="_blank" href="https://auth.nuxtjs.org/api/auth">Documentation</a>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'dashboard',
    head() {
        return {
            title: this.pageTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'my personel info'
                }
            ]
        }
    },
    data() {
        return {
            pageTitle: "My Personel Info",
        }
    },
};
</script>

<style >
.vue-code-snippet::before {
    content: "{{ $auth.user }}";
    background-color: rgba(0, 0, 0, .05);
    border-radius: 3px;
    padding: 2px 4px;
    color: rgba(0, 0, 0, .75);
}
</style>
