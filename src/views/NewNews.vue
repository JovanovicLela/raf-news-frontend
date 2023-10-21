<template>
  <div class="pt-5">
    <h2 align="center" class="pt-5">Add news</h2>

    <form method="post" @submit.prevent="addNews" >
      <div class="form-group">
        <label for="title">Title</label>
        <input style="margin-top: 10px;" v-model="title" type="text" class="form-control" id="title" placeholder="Enter title">
      </div>
      <div class="form-group">
        <label for="content" style="margin-top: 10px;">Content</label>
        <textarea style="margin-top: 10px;" cols="40" rows="5" v-model="content" type="text" class="form-control" id="content" placeholder="Enter content">
     </textarea>
      </div>
      <br>
      <div class = "row"  style="text-align: left">
        <div class="col form-group">
          <label  style="margin-top: 10px;">Category</label>
          <b-form-select v-model = "selectedCategory" class="form-control" aria-placeholder="Mee">
            <b-form-select-option  v-for="category in categories" :key="category.name" :value= "category"> {{category.name}}</b-form-select-option>
          </b-form-select>
        </div>

      </div>
      <br>  <br>
      <br>
      <div style="text-align: center">
        <button  type="submit" class="btn btn-primary">Publish News</button>
      </div>
    </form>
    <br><br><br>
    <h3 align="center" class="pt-5">All news</h3>

    <br>
    <table class=" table text-center" style="width: 1100px;margin-left: 30px;">

      <thead>
      <tr>
        <!--            <th scope="col">ID</th>-->
        <th scope="col">Title</th>
        <th scope="col">Content</th>
        <th scope="col">DateCreated</th>
        <th scope="col">Delete</th>
        <th scope="col">Edit</th>
      </tr>
      </thead>

      <tbody >

      <tr v-for="news in newsList" :key="news.newsId" >

        <b-card style="margin-top: 10px">
          <td scope="row" @click="find(news.newsId)"> {{ news.title }}</td>
        </b-card>
        <td>{{ news.content | shortText }}</td>

        <td>{{ moment(new Date(news.dateCreated).toISOString() ).format('MMMM Do YYYY') }}</td>


        <td scope="row">
          <b-button v-if="newsList.length > 1" @click="deleteNews(news.newsId)" size="sm">Delete</b-button>
        </td>
        <td scope="row">
          <b-button @click="updateNews(news.newsId)" size="sm">Edit</b-button>
        </td>

      </tr>

      </tbody>

    </table>

  </div>
</template>

<script>

import jwt_decode from 'jwt-decode';
import moment from 'moment'

export default {
  name: "new-news",
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
      selectedCategory: null,
      title: null,
      content: null,
      dateCreated: null,
      category: [],
      categories: [],
      moment: moment,
      selectKorisnici: [],
      newsList: [],

      perPage: 10,
      page: 1,
    }
  },
  mounted() {
    this.$axios.get('/api/categories').then((response) => {
      this.categories = response.data;
    });
    this.$axios.get(`/api/news/all?page=${this.page}`).then((response) => {
      this.newsList = response.data;
    });
  },
  methods: {
    deleteNews(id) {
      this.$axios.delete(`/api/news?newsId=${id}`).then(() => {
      });
      window.location.reload()
    },
    find(id) {
      this.$router.push(`news/${id}`);

    },
    updateNews(id) {
      this.$router.push(`/news/update/${id}`)
    },
    addNews(){
      const jwt = localStorage.getItem('jwt');
      if (jwt === null)
        return;

      const decoded = jwt_decode(jwt);

      this.$axios.post(`/api/news`, {
        "title": this.title,
        "content": this.content,
        "dateCreated": this.dateCreated,
        "authorId": parseInt(decoded.sub),
        "categoryId": this.selectedCategory.categoryId

      }).then(() => {
        window.location.reload();
      });
    },
  }
}
</script>

<style scoped>

</style>
