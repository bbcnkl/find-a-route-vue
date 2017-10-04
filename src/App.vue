<template>
  <div id="app">
    <transition name="slide" :enter-active-class="enterActiveClass">
      <router-view class="view"></router-view>
    </transition>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    computed: {
      ...mapState({
        routes: state => state.routes
      })
    },
    created () {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
      })
    },
    mounted () {
      if (localStorage.getItem('routes')) {
        let data = JSON.parse(localStorage.getItem('routes'))
        this.$store.commit('loadFromStorage', data)
      }

      this.$Progress.finish()
    },
    watch: {
      routes: {
        handler () {
          localStorage.setItem('routes', JSON.stringify(this.routes))
        },
        deep: true
      },
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth > fromDepth) {
          this.enterActiveClass = 'animated fadeIn'
        } else {
          this.enterActiveClass = 'animated fadeIn'
        }
      }
    }
  }
</script>

<style>
  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    animation-name: fadeIn;
  }

</style>
