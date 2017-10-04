<template>
  <table class="table-fill table-responsive">
    <thead>
    <tr>
      <th colspan="4" v-if="reverseRoutes.length > 0"  class="text-left">Saved routes</th>
      <th colspan="4" v-else class="text-left">No route found. Add new route.</th>
    </tr>
    </thead>
    <transition-group class="table-hover" name="list" tag="tbody">
      <tr class="list-item" v-if="reverseRoutes.length > 0" v-for="route in reverseRoutes"  v-bind:key="route.id">
        <td @click="goToRoute(route.id)" class="col-xs-12 col-md-4 text-left">{{ route.route_from.address }}</td>
        <td @click="goToRoute(route.id)" class="col-xs-12 col-md-4 text-left">{{ route.route_to.address }}</td>
        <td class="col-xs-6 col-md-3">
          {{ route.time }} / {{ route.distance }}
        </td>
        <td class="col-xs-6 col-md-1">
          <span @click="removeRoute(route.id)" class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'RoutesTable',
    components: {
    },
    data: function () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'reverseRoutes'
      ])
    },
    methods: {
      goToRoute: function (id) {
        this.$router.push('/route/' + id)
      },
      removeRoute: function (id) {
        this.$store.dispatch('removeRoute', id)
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
  .table-fill {
    background: white;
    border-radius:3px;
    border-collapse: collapse;
    margin: auto;
    padding:5px;
    width: 100%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    animation: float 5s infinite;
  }

  th {
    color:#D5DDE5;;
    background:#1b1e24;
    border-bottom:4px solid #9ea7af;
    border-right: 1px solid #343a45;
    font-size:23px;
    font-weight: 100;
    padding:24px;
    text-align:left;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    vertical-align:middle;
  }

  th:first-child {
    border-top-left-radius:3px;
  }

  th:last-child {
    border-top-right-radius:3px;
    border-right:none;
  }

  tr {
    border-top: 1px solid #C1C3D1;
    border-bottom: 1px solid #C1C3D1;
    color:#666B85;
    font-size:16px;
    font-weight:normal;
    text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  tr:hover td {
    background:#4E5066;
    color:#FFFFFF;
    border-top: 1px solid #22262e;
  }

  tr:first-child {
    border-top:none;
  }

  tr:last-child {
    border-bottom:none;
  }

  tr:nth-child(odd) td {
    background:#EBEBEB;
  }

  tr:nth-child(odd):hover td {
    background:#4E5066;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius:3px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius:3px;
  }

  td {
    background:#FFFFFF;
    padding:20px;
    text-align:left;
    vertical-align:middle;
    font-weight:400;
    font-size:15px;
    text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);

  }


  td:last-child {
    border-right: 0px;
  }

  th.text-left {
    text-align: left;
  }

  th.text-center {
    text-align: center;
  }

  th.text-right {
    text-align: right;
  }

  td.text-left {
    text-align: left;
    cursor: pointer;
  }


  .glyphicon-remove-circle {
    color: #820000;
    font-size: 20px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .table-fill {
      margin: 30px 0px;
    }
    table td {
      display: block;
      float: left;
      padding: 5px;
      min-height: 34px;
    }
    table td:last-of-type {
      text-align: right;
    }
    table tr:hover td {
      background: none;
      color: inherit;
      border-top: none;
    }
    tr:nth-child(odd) td {
      background: none;
    }

    tr:nth-child(odd):hover td {
      background: none;
    }

  }
</style>
