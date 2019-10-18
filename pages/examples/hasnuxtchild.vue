<script>
export default {}
</script>

<template>
  <div class="Page">
    <em>This is a nuxt-child example page</em>
    <p>
      Whenever <code>/hasnuxtchild</code> is called it loads the
      hasnuxtchild.vue file. If this file mentions <code>NuxtChild</code> it
      will search for a folder having the same name as the template. In our case
      <code>/hasnuxtchild</code>.
    </p>
    <div class="nuxtchild">
      <NuxtChild />
    </div>
  </div>
</template>
