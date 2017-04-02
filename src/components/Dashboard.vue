<template>
  <div class="dashboard container">

    <router-link to="/">Back</router-link>
    <h2>My Vaults</h2>
    <div class="carousel">
      <a class="carousel-item" v-for="(vault, index) in myVaults">
        <img src="../assets/vault.gif">
        <router-link :to="{ path: '/vaults/' + vault._id }">
          {{vault.name}}
        </router-link>
      </a>
    </div>
  <!--
    <div class="row">
      <ul class="collapsible popout" data-collapsible="accordion" v-for="vault in myVaults">
          <li>
            <div class="collapsible-header">{{vault.name}}</div>
            <div class="collapsible-body"><span>{{vault.description}}</span></div>
          </li>
      </ul>
    </div>
-->
    <form class="card" @submit.prevent="createVault">
      <input required="true" type="text" v-model="newVault.name" placeholder="Name"></input>
      <input type="text" v-model="newVault.description" placeholder="Description"></input>
      <input type="text" v-model="newVault.imageUrl" placeholder="Image"></input>
      <button type="submit">Add Vault</button>
    </form>

    <h2>My Keeps</h2>
    <div v-for="keep in myKeeps">
      {{keep.title}}
    </div>

    <form class="card" @submit.prevent="createKeep">
      <input required="true" type="text" v-model="newKeep.title" placeholder="Title"></input>
      <input required="true" type="text" v-model="newKeep.body" placeholder="Body"></input>
      <input type="text" v-model="newKeep.imageUrl" placeholder="Image"></input>
      <input type="text" v-model="newKeep.articleLink" placeholder="Article link"></input>
      <input type="checkbox" id="checkbox" v-model="newKeep.isPublic">
      <label for="checkbox">Make Public</label>
      <hr>
      <button type="submit">Add Keep</button>
    </form>
    
    </form>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      newVault: {},
      newKeep: {}
    }
  },
  mounted() {
    this.$root.$data.store.actions.getDashboard(this.carouselVaults)
  },
  computed: {
      myVaults() {
          return this.$root.$data.store.state.myVaults
      },
      myKeeps() {
        return this.$root.$data.store.state.myKeeps
      }
  },
  methods: {
    carouselVaults() {
       $('.carousel').carousel();
    },
    createVault() {
      this.$root.$data.store.actions.createVault(this.newVault)
    },
    createKeep() {
      this.$root.$data.store.actions.createVault(this.newKeep)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
