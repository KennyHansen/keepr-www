<template>
  <div class="container">

    <router-link to="/">Back</router-link>
    <!-- 
    
    
    <div v-for="vault in vaults"  ondragover="event.preventDefault()" >
        <router-link :to="{ path: '/vaults/' + vault._id }"><img src="../assets/vault.gif" height="70"></router-link>
        {{vault.name}}
    </div>
    -->

    <div class="carousel">
      <a class="carousel-item" v-for="vault in myVaults" 
      ondragover="event.preventDefault()" 
      droppable="true" 
      draggable="false" 
      v-on:drop="addToVault(vault)">
        <img src="../assets/vault.gif">
        <router-link :to="{ path: '/vaults/' + vault._id }">
          {{vault.name}}
        </router-link>
      </a>
    </div>
    <div class="row">
      <div class="col s4" v-for="keep in keeps">
            <div draggable="true" v-on:dragstart="selectKeep(keep)">
                <div class="card" v-on:dragend="moveKeep">
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
                </div>
            </div>
        </div>
    </div>
    <form @submit.prevent="createKeep">
    
    </form>
  </div>
</template>

<script>
export default {
  name: 'keeps',
  data () {
    return {
        title: '',
        imageUrl: '',
        articleLink: '',
        isPublic: true,
        tags: '',
        selectedKeep: {},
        selectedVault: {},
        loading: true
    }
  },
  mounted() {
      this.$root.$data.store.actions.getKeeps()
      this.$root.$data.store.actions.getDashboard(this.carouselVaults)
  },
  computed: {
      keeps() {
          return this.$root.$data.store.state.keeps
      },
      myVaults() {
          return this.$root.$data.store.state.myVaults
      },
      user() {
          return this.$root.$data.store.state.user
      }
  },
  methods: {
      carouselVaults() {
        $('.carousel').carousel();
      },
      createKeep() {
        this.$root.$data.store.actions.createKeep(this.title, this.author, this.imageUrl, this.articleLink, this.isPublic, this.tags)
      },
      selectKeep(keep) {
        this.selectedKeep = keep
      },
      addToVault(vault){
        this.selectedVault = vault
        if(this.selectedKeep._id && this.selectedVault._id) {
            this.$root.$data.store.actions.addKeepToVault(this.selectedKeep, this.selectedVault)
        }
        this.selectedKeep = {}
        this.selectedVault = {}
      }, 
      moveKeep() {
          console.log("moved")
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
