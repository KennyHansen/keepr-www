<template>
  <div class="register">
    <form @submit.prevent="registerUser" id="registerModal" class="modal">
        <a href="#" @click="cancelLogin">Back</a>
        <div class="modal-content">
            <div class="input-field">
                <input required="true" type="text" v-model="username" placeholder="Username"></input>
            </div>
            <div class="input-field">
                <input required="true" type="email" v-model="email" placeholder="Email"></input>
            </div>
            <div class="input-field">
                <input required="true" type="password" v-model="password" placeholder="Password"></input>
            </div>
        </div>
        <div class="modal-footer">
            <button class="modal-action waves-effect waves-blue btn" type="submit">Register</button>
        </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'login',
  data () {
    return {
        username: '',
        email: '',
        password: ''
    }
  },
  mounted() {
    $('.modal').modal();
    $('#registerModal').modal('open');
  },
  methods: {
      cancelLogin() {
          $('#registerModal').modal('close');
          this.$router.push({path: '/'})
      },
      registerUser() {
          if(this.username && this.email && this.password) {
            $('#registerModal').modal('close');
            this.$root.store.actions.register(this.username, this.email, this.password)
            this.username = ''
            this.password = ''
            this.email = ''
            this.$router.push({path: '/'})
          }
      }
  }
}
Vue.nextTick(() => {
    $('.modal').modal();
    $('#registerModal').modal('open');
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
