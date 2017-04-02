<template>
  <div class="hello">
    <h1>Welcome to Keepr</h1>
    <div v-if="!user.name">
      <p>Please Login or Register to Get Started!</p>
    </div>
    <div v-else>
      <ul>
        <router-link to="/dashboard"><li>Go to dashboard</li></router-link>
        <router-link to="/keeps"><li>Browse Keeps</li></router-link>
      </ul>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {

    }
  },
  computed: {
    user() {
      return this.$root.$data.store.state.user
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
