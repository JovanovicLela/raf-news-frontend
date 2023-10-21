<template>
  <div id="home">
    <div id="nav">
      <router-link :to="{name: 'NewsMostVisited'}" tag="a" class="nav-link"
                   :class="{active: this.$router.currentRoute.name === 'NewsMostVisited'} ">Popular News
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "CmsAdmin"
}
</script>

<style scoped>

</style>