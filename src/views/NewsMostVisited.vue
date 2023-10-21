<template>
  <div class="news" style="text-align: center; margin-top: 100px">
    <h1 class="mt-4">Popular news</h1>
    <br><br>
    <div class="row" style="display:inline;">
      <div class="col-4 mx-auto" >
        <table class=" table text-center" style="width: 1050px;margin-left: -350px;">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Times visited</th>
            <th scope="col">Date created</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="news in newsList" :key="news.newsId"  @click="find(news.newsId)" style="height: 115px;">
            <template v-if="news.timesVisited > 0">
              <b-card class="cards">
                <td scope="row">{{ news.title }}</td>
              </b-card>

              <td>{{ news.content | shortText }}</td>

              <td>{{ news.timesVisited }}</td>

              <td>{{ moment(new Date(news.dateCreated).toISOString() ).format('MMMM Do YYYY') }}</td>

            </template>


          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-9 mx-auto">
        <NewsDetails v-if="selectedNews" :news="selectedNews"></NewsDetails>
      </div>
    </div>
  </div>


</template>


<script>
import NewsDetails from "../components/SingleNewsDetailsView";
import moment from 'moment'

export default {
  name: "NewsMostVisited",
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
    find(id) {
      this.$router.push(`/news/${id}`);

    }
  },
  mounted() {
    this.$axios.get('/api/news/most-visited').then((response) => {
      this.newsList = response.data;
    });
  }
}
</script>
<style scoped>
.cards{

  transition: all 0.2s ease;
  cursor: pointer;


}

.cards:hover{

  box-shadow: 5px 6px 6px 2px #e9ecef;
  transform: scale(1.1);
}

td {
  height: 50px;
  margin-bottom: 10px;
  vertical-align: center;
}



</style>


