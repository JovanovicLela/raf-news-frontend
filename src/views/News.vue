<template>
  <div class="news" style="text-align: center; margin-top: 100px">
    <h1 class="mt-4">News</h1>
    <br> <br>

<!--    <div class="w3-green w3-hover-shadow w3-center">
      <p>Hover over me test!</p>
    </div>-->

    <div class="row" style="display:inline;">
      <div class="col-9 mx-auto" >
        <table class=" table text-center" style="width: 1050px;margin-left: -120px;">

          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">DateCreated</th>

          </tr>
          </thead>

          <tbody >

          <tr v-for="news in newsList" :key="news.newsId" @click="find(news.newsId)" style="height: 115px;">

            <b-card class="cards">
              <td scope="row"> {{ news.title }}</td>
            </b-card>

            <td>{{ news.content | shortText }}</td>

            <td>{{ moment(new Date(news.dateCreated).toISOString() ).format('MMMM Do YYYY') }}</td>

          </tr>

          </tbody>

        </table>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import 'w3-css/w3.css';


export default {
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
    }
  },
  mounted() {
    this.$axios.get('/api/news/all?page=1').then((response) => {
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
  vertical-align: center;
}

</style>

