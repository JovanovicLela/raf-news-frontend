<template>
  <div class="news" style="text-align: center; margin-top: 100px">

    <h1 class="mt-4">News by selected category</h1>
    <br><br>
    <div class="row" style="display:inline;">
      <div class="col-4 mx-auto" >
        <table class=" table text-center" style="width: 650px;margin-left: -150px;">

          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Date Created</th>
            <th scope="col">Content</th>
          </tr>
          </thead>

          <tbody >

          <tr v-for="news in newsList" :key="news.newsId" @click="find(news.newsId)">

            <b-card style="margin-top: 10px">
              <td scope="row"> {{ news.title }}</td>
            </b-card>

            <td>{{ moment(new Date(news.dateCreated).toISOString() ).format('MMMM Do YYYY') }}</td>

            <td>{{ news.content | shortText }}</td>

          </tr>

          </tbody>

        </table>
      </div>
      <div class="col-6" >
        <NewsCom v-if="selectedNews" :news="selectedNews"></NewsCom>
      </div>
    </div>
  </div>
</template>
<script>


import moment from 'moment'

export default {
  name: "NewsByCategory",

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
      selectedNews: null,
      newsList: [],
      moment: moment,


    }
  },
  methods: {
    find(id) {
      this.$router.push(`news/${id}`);

    },
  },
  mounted() {
    this.$axios.get(`/api/news/news-for-category?page=1&categoryId=${this.$route.params.id}`).then((response) => {
      this.newsList = response.data;

    });
  },
}
</script>

<style scoped>

</style>
