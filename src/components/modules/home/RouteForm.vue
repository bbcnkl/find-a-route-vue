<template>
  <form @submit.prevent="addRoute" @keydown="removeSelectedLocation($event.target.id)" class="form-inline">
    <div class="form-group">

      <div :class="[RouteForm.errors.has('route_from') ? 'error' : '', 'input-group']">
        <div class="input-group-addon">from</div>
        <vue-google-autocomplete
          id="route_from"
          placeholder="Type the starting address"
          classname="form-control"
          v-on:placechanged="setFirstPlace"
          v-model="RouteForm.route_from"
          enable-geolocation
          autofocus
        >
        </vue-google-autocomplete>
        <div class="input-group-addon addon-right">
          <span v-if="RouteForm.errors.has('route_from')" class="glyphicon glyphicon-warning-sign"
                data-toggle="tooltip" data-placement="top" :title="RouteForm.errors.get('route_from')"
                aria-hidden="true"></span>
          <span class="glyphicon glyphicon-map-marker" aria-hidden="true" v-else></span>
        </div>
      </div>
    </div>


    <div class="form-group">
      <div :class="[RouteForm.errors.has('route_to') ? 'error' : '', 'input-group']">
        <div class="input-group-addon">to</div>
        <vue-google-autocomplete
          id="route_to"
          classname="form-control"
          placeholder="Type the ending address"
          v-on:placechanged="setSecondPlace"
          enable-geolocation
          v-model="RouteForm.route_to"
        >
        </vue-google-autocomplete>
        <div class="input-group-addon addon-right">
          <span v-if="RouteForm.errors.has('route_to')"
                class="glyphicon glyphicon-warning-sign"
                data-toggle="tooltip" data-placement="top" :title="RouteForm.errors.get('route_to')"
                aria-hidden="true"></span>
          <span class="glyphicon glyphicon-map-marker" aria-hidden="true" v-else></span>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">
      Add
      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
    </button>

  </form>
</template>

<script>
  import Form from '../../../utilities/Form'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  export default {
    name: 'RouteForm',
    components: {
      VueGoogleAutocomplete
    },
    data: function () {
      return {
        RouteForm: new Form({
          route_from: {},
          route_to: {}
        })
      }
    },
    computed: {},
    methods: {
      /**
       * Return random string
       * @param {Int} length Length of random id
       */
      randomIdGenerator: function (length) {
        let result = ''
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
        return result
      },
      /**
       * When the location found
       * @param {Object} addressData Data of the found location
       * @param {Object} placeResultData PlaceResult object
       */
      setFirstPlace: function (addressData, placeResultData) {
        let route = {
          latitude: addressData.latitude,
          longitude: addressData.longitude,
          address: placeResultData.formatted_address,
          id: placeResultData.id
        }
        this.RouteForm.errors.clear('route_from')
        this.RouteForm.route_from = route
        document.getElementById('route_to').focus()
      },
      /**
       * When the location found
       * @param {Object} addressData Data of the found location
       * @param {Object} placeResultData PlaceResult object
       */
      setSecondPlace: function (addressData, placeResultData) {
        let route = {
          latitude: addressData.latitude,
          longitude: addressData.longitude,
          address: placeResultData.formatted_address,
          id: placeResultData.id
        }
        this.RouteForm.errors.clear('route_to')
        this.RouteForm.route_to = route
      },

      /**
       * Empty route object
       * @param {String} id
       */
      removeSelectedLocation: function (id) {
        this.RouteForm[id] = {}
      },

      /**
       * Form submiting
       */
      addRoute: function () {
        var data = {
          route_from: this.RouteForm.route_from,
          route_to: this.RouteForm.route_to
        }
        // Check if locations are equal
        if (this.RouteForm.route_from.id === this.RouteForm.route_to.id) {
          var err = {
            route_to: 'You can not enter same locations'
          }
          this.RouteForm.errors.record(err)
        }
        // Check if locations is selected
        this.RouteForm.checkIfEmptyObject(data)
        // Check for errors
        if (!this.RouteForm.errors.any()) {
          data['id'] = this.randomIdGenerator(20)
          data['distance'] = 'Calculating...'
          data['time'] = 'Calculating...'
          this.$store.commit('pushRoute', data)
          // reset data
          this.RouteForm['route_from'] = {}
          this.RouteForm['route_to'] = {}
          this.RouteForm['id'] = null
          // url in lat,lng/lat,lng style. Use this for seo or something else
          // this.$router.push('/route/' + data.route_from.latitude + ',' + data.route_from.longitude + '/' + data.route_to.latitude + ',' + data.route_to.longitude)
          // url with id only
          this.$router.push('/route/' + data.id)
        }
      }
    },
    mounted () {
      $(function () {
        // activate bootstrap tooltips
        $('[data-toggle="tooltip"]').tooltip()
      })
    }
  }
</script>

<style scoped>
  .form-group {
    width: 100%;
    margin: 0 0 20px 0;
  }

  .input-group {
    width: 100%;
  }

  .input-group.error {
    box-shadow: 0px 0px 15px 3px #9c0000;
  }

  .input-group-addon {
    background-color: #ffffff;
    border-radius: 4px 0 0 4px;
    border: none;
    border-right: 1px solid #e5e5e5;
    padding: 6px 22px;
    color: #222222;
  }

  .input-group-addon.addon-right {
    border-radius: 0 4px 4px 0;
    border: none;
    padding: 6px 20px;
  }

  .form-control {
    height: 50px;
    border: none;
    color: #262626;
  }

  .form-control:focus {
    box-shadow: none;
  }

  .btn-primary {
    line-height: 14px;
    color: #ffffff;
    font-weight: 500;
    border: none;
    text-transform: uppercase;
    border-radius: 4px;
    letter-spacing: 1px;
    background-color: #2196f3;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    padding: 18px 30px;
    width: 100%;
  }

  .glyphicon-warning-sign {
    color: #820000;
    cursor: help;
  }

  @media (min-width: 768px) {
    .banerInfo .btn-primary {
      width: auto;
    }

  }

  @media (min-width: 992px) {
    .banerInfo .form-group {
      width: 360px;
      margin: 0 20px 0 0;
    }
  }
</style>
