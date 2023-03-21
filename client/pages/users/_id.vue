<template>
    <div class="columns ">
      <div class="column">
        <h4 class="title is-4">
            {{ $route.params.id }}
        </h4>
        <hr>
      </div>
    </div>
</template>
<script>
export default{
    layout: 'dashboard',
    middleware: 'admin',
}
</script>
