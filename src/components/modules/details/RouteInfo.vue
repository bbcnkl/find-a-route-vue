<template>
  <div class="panel panel-inverse">
    <div class="panel-heading">
      <h3 class="panel-title pull-left">
        <router-link class="back-link" to="/">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        </router-link>
        Route
      </h3>
      <button v-if="route != null" @click="removeRoute(route.id)" type="button" class="pull-right btn btn-danger">Remove this route</button>
      <div class="clearfix"></div>
    </div>
    <div class="panel-body">
      <div  v-if="route != null">
        <h4>from:
          <em>{{ route.route_from.address }}</em>
        </h4>
        <h4>to:
          <em>{{ route.route_to.address }}</em>
        </h4>
        <p>
          Distance: <em>{{ route.distance }}</em>
        </p>
        <p>
          Travel time: <em>{{ route.time }}</em>
        </p>
      </div>
      <div v-else>
        <p>This route is not available. Try different one.</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'RouteInfo',
    props: ['route'],
    data: function () {
      return {}
    },
    methods: {
      removeRoute: function (id) {
        this.$store.dispatch('removeRoute', id)
        this.$router.replace('/')
      }
    }
  }
</script>

<style>
  .panel {
    margin-top: calc( 50% - 100px );
  }
  .panel-inverse {
    border-color: #060708;
  }
  .panel-inverse>.panel-heading {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.81);
    border-color: #060708;
  }
  .back-link .glyphicon {
    padding: 5px;
    background: #d9534f;
    color: #fff;
    border-radius: 50px;
    border: none;
  }
  @media (max-width: 992px) {
    .panel {
      margin-top: 20px;
    }
  }

</style>
