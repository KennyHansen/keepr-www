<template>
  <div class="login">
    <form @submit.prevent="loginUser" id="loginModal" class="modal">
        <a href="#" @click="cancelLogin">Back</a>
        <div class="modal-content">
            <div class="input-field">
                <input required="true" type="email" v-model="email" placeholder="Email"></input>
            </div>
            <div class="input-field">
                <input required="true" type="password" v-model="password" placeholder="Password"></input>
            </div>
            <div class="modal-footer">
                <button class="modal-action waves-effect waves-blue btn" type="submit">Login</button>
            </div>
        </div>
    </form>
    <hr>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'login',
  data () {
    return {
        email: '',
        password: ''
    }
  },
  mounted() {
    $('.modal').modal();
    $('#loginModal').modal('open');
  },
  methods: {
      cancelLogin() {
          $('#loginModal').modal('close');
          this.$router.push({path: '/'})
      },
      loginUser() {
          if(this.email && this.password) {
            $('#loginModal').modal('close');
            this.$root.store.actions.login(this.email, this.password)
            this.password = ''
            this.email = ''
            this.$router.push({path: '/'})
          }
      }
  }
}
Vue.nextTick(() => {
    $('.modal').modal();
    $('#loginModal').modal('open');
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
