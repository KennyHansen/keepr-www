<template>
  <div class="vault container">
    <router-link to="/">Back</router-link>
    <div class="row">
      <div class="col s4" v-for="keep in vaultKeeps">
          <div class="card">
              <div class="card-head grey lighten-4">
                  <p v-show="keep.author">{{keep.author}}</p>
              </div>
              <div class="card-body">
                  <p v-show="keep.body">{{keep.body}}</p>
              </div>
              <div class="card-title">
                  <p v-show="keep.title">{{keep.title}}</p>
                  <img :src="keep.imgUrl"></img>
              </div>
              <button @click="removeKeep(keep)">Remove from Vault</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vault',
  data () {
    return {

    }
  },
  mounted() {
      this.$root.$data.store.state.vaultKeeps = []
      this.$root.$data.store.actions.getKeepsInVault(this.$route.params.id)
  },
  computed: {
      vaultKeeps() {
          return this.$root.$data.store.state.vaultKeeps
      }
  },
   methods: {
     removeKeep(keep) {
       console.log(keep)
       this.$root.$data.store.actions.removeKeepFromVault(keep, this.$route.params.id)
     }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
