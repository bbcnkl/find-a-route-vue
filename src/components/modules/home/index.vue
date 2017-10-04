<template>
  <div>

    <section class="clearfix homeBanner">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="banerInfo">
              <h1>Find a Route v1.0</h1>
              <p>Save and display driving route</p>
              <route-form></route-form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="routes">
      <div class="container">
        <routes-table></routes-table>
      </div>

    </section>

  </div>
</template>

<script>
  import RouteForm from './RouteForm.vue'
  import RoutesTable from './RoutesTable.vue'
  export default {
    name: 'Home',
    components: {
      RouteForm, RoutesTable
    }
  }
</script>

<style scoped>
  .banerInfo {
    width: 100%;
    text-align: center;
    padding-top: 50px;
  }
  .banerInfo h1 {
    color: #ffffff;
    margin: 0 0 24px 0;
    font-weight: 500;
    font-size: 45px;
  }
  .banerInfo p {
    font-size: 16px;
    color: #ffffff;
    font-size: 16px;
    margin: 0 0 60px 0;
  }
  .homeBanner {
    min-height: calc( 100vh + 50px );
    position: relative;
    background-image: url('/static/img/background.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  section {
    display: block;
    float: left;
    width: 100%;
  }

  @media (min-width: 768px) {
    .banerInfo {
      padding-top: 160px;
    }
    section {
      padding: 100px 0;
    }
    .homeBanner {
      min-height: 92vh
    }

  }

</style>
