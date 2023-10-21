<template>
  <div class="news" style="text-align: center; margin-top: 100px">
    <h1 class="mt-4">News By Tag</h1>
    <br><br>
    <div class="row" style="display:inline;">
      <div class="col-4 mx-auto" >
        <table class=" table text-center" style="width: 650px;margin-left: -150px;">

          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Date Created</th>
          </tr>
          </thead>

          <tbody >

          <tr v-for="news in newsList" :key="news.newsId">

            <b-card class="cards">
              <td scope="row"> {{ news.title }}</td>
            </b-card>

            <td>{{ news.content | shortText }}</td>

            <td>{{ moment(new Date(news.dateCreated).toISOString() ).format('MMMM Do YYYY') }}</td>

          </tr>

          </tbody>

        </table>
      </div>
      <div class="col-6" >
        <NewsDetails v-if="selectedNews" :news="selectedNews"></NewsDetails>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import NewsDetails from "../components/SingleNewsDetailsView";

export default {
  name: 'NewsByTag',
  components: {NewsDetails},
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
  },
  mounted() {
    this.$axios.get(`/api/tags/news-by-tag?tagId=${this.$route.params.id}`).then((response) => {
      this.newsList = response.data;
    });
  }
}
</script>


<style scoped>
.cards{

  transition: all 0.2s ease;
  /*
  cursor: pointer;
  */


}

.cards:hover{

  /*
  box-shadow: 5px 6px 6px 2px #e9ecef;
  */
}

td {
  height: 50px;
  vertical-align: center;
}

</style>

