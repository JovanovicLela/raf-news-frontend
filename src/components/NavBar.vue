<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">RAF News</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto  mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'News'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'News'}">News</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'NewsMostVisited'}" tag="a" class="nav-link"
                         :class="{active: this.$router.currentRoute.name === 'NewsMostVisited'} ">Popular News
            </router-link>
          </li>
          <li v-if="canLogout" class="nav-item" @click="cms()">
            <router-link :to="{name: 'Cms'}" tag="a" class="nav-link"
                         :class="{active: this.$router.currentRoute.name === 'CmsV'}">CMS
            </router-link>
          </li>

          <b-dropdown text="Categories" variant="secondary" class="e-auto mb-2 mb-lg-0"
                      style="height: 35px; margin-top: 5px">
            <b-dropdown-item href="#" v-for="category in categories" :key="category.name"
                             @click="find(category.categoryId)">{{ category.name }}
            </b-dropdown-item>
          </b-dropdown>

        </ul>
        <form class="d-flex">
        <router-link :to="{name: 'search-news'}" tag="a" class="nav-link" style="color: #42b983"
                       :class="{active: this.$router.currentRoute.name === 'search-news'} ">Search News
          </router-link>
        </form>

        <form class="d-flex">
          <router-link :to="{name: 'LogIn'}"  tag="a" class="nav-link"
                       :class="{active: this.$router.currentRoute.name === 'LogIn'}">Login
          </router-link>
        </form>

        <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
          <button @click="showToast" class="btn btn-outline-secondary" type="submit">Logout</button>
        </form>

      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "NavBar",
  computed: {
    canLogout() {
      return this.$route.name !== 'LogIn' && localStorage.getItem('jwt') != null;
    }
  },
  data() {
    return {
      categories: [],
      tags: [],
    }
  },
  mounted() {
    this.$axios.get('/api/categories').then((response) => {
      this.categories = response.data;
    });
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({name: 'LogIn'});
    },
    find(id) {
      this.$router.push(`/news/category/${id}`).then(() => {
        window.location.reload();
      })
    },
    search() {
      this.$router.push(`/news/search`)
    },
    cms() {
      this.$router.push(`/cms`)
    },
    showToast() {
      this.$toast.info("You are logged out!");
    },
  },

}
</script>

<style scoped>

.white {
  color: #00dd9e;
}
</style>
