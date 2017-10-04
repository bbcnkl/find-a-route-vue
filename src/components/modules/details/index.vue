<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">

        <div class="not-available" v-if="notAvailable === 1">
          <router-link class="back-link" to="/">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          </router-link>
          <h3 class="text-danger">This route is not available for driving.</h3>
        </div>
        <route-info v-else-if="notAvailable === 2" :route="searchedByIdData"></route-info>
      </div>
      <div class="col-md-6">
        <div id="map-canvas"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'
  import RouteInfo from './RouteInfo.vue'

  export default {
    name: 'RouteDetails',
    components: {
      RouteInfo
    },
    data: function () {
      return {
        id: null,
        firstLatLng: null,
        secondLatLng: null,
        directionsService: new google.maps.DirectionsService(),
        pointA: '',
        pointB: '',
        myOptions: {
          zoom: 7,
          center: this.pointA
        },
        directionsDisplayData: null,
        searchedByIdData: null,
        notAvailable: 0
      }
    },
    computed: {
      firstLat: function () {
        if (this.firstLatLng.split(',')[0]) {
          return Number(this.firstLatLng.split(',')[0])
        }
        return false
      },
      firstLng: function () {
        if (this.firstLatLng.split(',')[1]) {
          return Number(this.firstLatLng.split(',')[1])
        }
        return false
      },
      secondLat: function () {
        if (this.secondLatLng.split(',')[0]) {
          return Number(this.secondLatLng.split(',')[0])
        }
        return false
      },
      secondLng: function () {
        if (this.secondLatLng.split(',')[1]) {
          return Number(this.secondLatLng.split(',')[1])
        }
        return false
      }
    },
    methods: {
      ...mapActions([
        'appendData',
        'removeRoute'
      ]),
      directionsDisplay: function (arg) {
        return new google.maps.DirectionsRenderer({
          map: arg
        })
      },
      /**
       * Initialize google map
       * @param firstLat
       * @param firstLng
       * @param secondLat
       * @param secondLng
       */
      initMap: function (firstLat, firstLng, secondLat, secondLng) {
        this.pointA = new google.maps.LatLng(firstLat, firstLng)
        this.pointB = new google.maps.LatLng(secondLat, secondLng)
        let map = new google.maps.Map(document.getElementById('map-canvas'), this.myOptions)
          // Instantiate a directions service.
        this.directionsDisplayData = this.directionsDisplay(map)
        // get route from A to B
        this.calculateAndDisplayRoute(this.directionsDisplayData)
      },

      /**
       * Calculate route
       */
      calculateAndDisplayRoute: function () {
        var self = this
        this.directionsService.route({
          origin: self.pointA,
          destination: self.pointB,
          avoidTolls: true,
          avoidHighways: false,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            self.directionsDisplayData.setDirections(response)
            self.appendData({
              id: self.id,
              time: response.routes[0].legs[0].duration.text,
              distance: response.routes[0].legs[0].distance.text
            })
            self.notAvailable = 2
          } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
            // not available route
            self.notAvailable = 1
            self.removeRoute(self.id)
          } else {
            window.alert('Directions request failed due to ' + status)
          }
        })
      },

      /**
       * Search routes by id
       * @param routeFilter
       * @returns {boolean}
       */
      findById: function (routeFilter) {
        return routeFilter.id === this.id
      }
    },
    created () {
      if (this.$route.name === 'RouteDetails') { // came from url x,y/x,y like
        this.firstLatLng = this.$route.params.firstLatLng
        this.secondLatLng = this.$route.params.secondLatLng
      } else if (this.$route.name === 'RouteDetailsById') { // came from url with id
        this.id = this.$route.params.id
      }
    },
    mounted () {
      if (this.id === null && this.firstLat && this.firstLng && this.secondLat && this.secondLng) { // Check if url contains coords
        this.initMap(this.firstLat, this.firstLng, this.secondLat, this.secondLng)
      } else if (this.id !== null) { // url contains id
        this.searchedByIdData = this.$store.state.routes.find(this.findById)
        if (this.searchedByIdData === undefined) {
          this.$router.replace('/')
        } else {
          this.initMap(this.searchedByIdData.route_from.latitude, this.searchedByIdData.route_from.longitude,
            this.searchedByIdData.route_to.latitude, this.searchedByIdData.route_to.longitude)
        }
      } else { // wrong url, error
        this.$router.replace('/')
      }
    }
  }
</script>

<style scoped>
  #map-canvas {
    height: 100%;
    width: 100%;
    min-height: 100vh;
  }
  .not-available {
    margin-top: calc( 50% - 70px )
  }
  .not-available h3 {
    display: inline;
    margin-left: 10px;
  }
  .back-link {
    position: relative;
    bottom: 3px;
  }
  .back-link .glyphicon {
    border: none;
  }
  @media (max-width: 992px) {
    .not-available {
      margin: 30px 0px;
    }
  }
</style>
