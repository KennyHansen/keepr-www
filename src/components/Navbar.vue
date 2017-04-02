<template>
  <nav class="Navbar black white-text">

  <ul class="left">
    <li><img src="../assets/logo.jpg" height="64px"></li>
  </ul>
  
  <div v-if="loading == true">
    <ul class="right">
      <li>Loading...</li>
    </ul>
  </div>

  <div v-else>
    <div v-if="user.name">
      <ul class="right">
        <li class="blue-text" active-class="active" @click="logout"><router-link to='/'>Logout</router-link></li>
      </ul>
      <ul class="right">
        <li>Welcome, {{user.name}}!</li>
      </ul>
    </div>
    <div v-else>
      <ul class="right" @click="loginModal">
        <li><router-link class="tab" active-class="active" :to="{name:'Auth.register'}">Register</router-link></li>
      </ul>
      <ul class="right" @click="registerModal">
        <li><router-link class="tab" active-class="active" :to="{name:'Auth.login'}">Login</router-link></li>
      </ul>
    </div>
  </div>



  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  mounted() {
    this.$root.store.actions.authenticate()
  },
  computed: {
      loading() {
          return this.$root.$data.store.state.loading
      },
      user() {
          return this.$root.$data.store.state.user
      }
  }, 
  methods: {
      loginModal() {
          $('.modal').modal();
          $('#loginModal').modal('open');
      },
      registerModal() {
          $('.modal').modal();
          $('#registerModal').modal('open');
      },
      logout() {
        this.$root.store.actions.logout()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
