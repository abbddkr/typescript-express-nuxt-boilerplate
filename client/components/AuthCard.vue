<template>
    <div class="column">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title has-text-black">
            {{ title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content has-text-centered">
            <NuxtLogo />
          </div>
          <div class="content">
            <span>
              <slot />
            </span>
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <pre>Made with Love by @abbddkr</pre>
          </div>
        </footer>
      </div>
    </div>
  </template>

  <script>
  import NuxtLogo from '~/components/NuxtLogo.vue';
  export default {
    name: 'BuefyCard',
    components:{NuxtLogo},
    props: {
      title: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: false,
      },
    },
  }
  </script>
