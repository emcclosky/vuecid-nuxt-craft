<script>
export default {
  computed: {
    slug() {
      return this.$route.params.childslug
    }
  }
}
</script>

<template>
  <div class="Page">
    <em>This is a is the nuxt-child</em>
    <p>
      It is called with the childslug: <strong>{{ slug }}</strong>
    </p>
    <p>
      Try to navigate a bit:<br />
      <nuxt-link to="/examples/hasnuxtchild/childslug"
        >/examples/hasnuxtchild/childslug</nuxt-link
      ><br />
      <nuxt-link to="/examples/hasnuxtchild/another-childslug"
        >/examples/hasnuxtchild/another-childslug</nuxt-link
      ><br />
      <nuxt-link to="/examples/hasnuxtchild/yet-another-childslug"
        >/examples/hasnuxtchild/yet-another-childslug</nuxt-link
      >
    </p>
  </div>
</template>
