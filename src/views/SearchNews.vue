<template>
  <div class="pt-5" style="margin-top: 60px">
    <h1 align="center">Search news</h1>
    <br>
    <form method="post" @submit.prevent="search" >
      <div class="form-group">
        <label for="query">Search news by a title or content</label>
        <button type="submit" class="btn btn-default">
          <span class="icon-search icon-large green"></span>
        </button>
        <input style="margin-top: 10px;" v-model="query" type="text" class="form-control" id="query" placeholder="Enter title or content for search">
      </div>
      <br>
      <br>
      <div style="text-align: center">
        <button type="submit" class="btn btn-success">Search News</button>
      </div>
    </form>
    <br>
    <table class=" table text-center" style="width: 950px;margin-left: 87px;margin-top: 110px">

      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Content</th>
        <th scope="col">Date created</th>
      </tr>
      </thead>

      <tbody >

      <tr v-for="news in newsList" :key="news.newsId" >

        <b-card style="margin-top: 10px">
          <td scope="row" @click="find(news.newsId)"> {{ news.title }}</td>
        </b-card>

        <td>{{ news.content | shortText }}</td>

        <td>{{ moment(new Date(news.dateCreated).toISOString() ).format('MMMM Do YYYY') }}</td>

      </tr>

      </tbody>

    </table>

  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: "search-news",
  filters: {
    shortText(value) {
      if (value.length < 40) {
        return value;
      }
      return value.slice(0, 40) + '...'
    }
  },
  data() {
    return {
      date: '',
      query: null,
      moment: moment,
      newsList: []
    }
  },
  methods: {
    search() {
      this.$axios.get(`/api/news/search?page=1&query=${this.query}`).then((response) => {
        this.newsList = response.data;
      });
    },
    find(id) {
      this.$router.push(`news/${id}`);
    },
  }
}
</script>

<style scoped>

.green {
  color: #00dd9e;
}

</style>
