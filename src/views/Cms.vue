<template>
  <div id="home">
    <div id="nav">
      <b-col style="margin-top: 60px">
        <b-card style="height: 200px; margin-top: 70px; line-height: 160px" lg="4" class="pb-5"><b-button size="lg" variant="outline-primary" :to="{name: 'new-category'}">CMS Category</b-button></b-card>

        <b-card style="height: 200px; margin-top: 70px; line-height: 160px" lg="4" class="pb-2"><b-button size="lg" variant="outline-primary" :to="{name: 'new-news'}">CMS News</b-button></b-card>
        <b-card style="height: 200px; margin-top: 70px; line-height: 160px" v-if="isAdmin" lg="4" class="pb-2"><b-button size="lg" variant="outline-primary" :to="{name: 'new-user'}">CMS User</b-button></b-card>

      </b-col>
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

import jwt_decode from "jwt-decode";

export default {
  name: 'Cms',
  components: {},
  computed: {
    isAdmin() {
      const jwt = localStorage.getItem('jwt');
      if (jwt === null)
        return false;

      const decoded = jwt_decode(jwt);
      return decoded.isAdmin;
    }
  }
}
</script>

<style scoped>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin-left: 100px;
  margin-top: 60px;
}
</style>
