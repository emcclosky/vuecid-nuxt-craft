<script>
export default {}
</script>

<template>
  <div class="Page">
    <em>This is a is the nuxt-child fallback page</em>
    <p>
      It is called with the childslug: <strong>childslug is undefined</strong>
    </p>
    <p>
      Try to navigate a bit:<br />
      <nuxt-link to="/hasnuxtchild/childslug">/hasnuxtchild/childslug</nuxt-link
      ><br />
      <nuxt-link to="/hasnuxtchild/another-childslug"
        >/hasnuxtchild/another-childslug</nuxt-link
      ><br />
      <nuxt-link to="/hasnuxtchild/yet-another-childslug"
        >/hasnuxtchild/yet-another-childslug</nuxt-link
      >
    </p>
  </div>
</template>
