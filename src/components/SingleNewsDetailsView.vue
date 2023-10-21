<template>
  <div class="jumbotron bg-dark text-white shadow-lg bg-dark rounded" style="margin-top: 80px">

    <div class="container" style="text-align: left">
      <h6  style="margin-top: 12px">
        {{  moment(new Date(news.dateCreated).toISOString() ).format('MMMM Do YYYY') }}
      </h6>
    </div>
    <br>
    <h2>
      Title: {{ news.title }}
    </h2><br>

    <div style="background-color: rgb(39,44,51); margin-left: 200px; margin-right: 200px; margin-top: 30px">
      <br>
      <h5 style="margin-top: 18px">
        Category: {{category != null ? category.name : ""}}
      </h5>
      <br>
      <template v-if="author != null">
        <h5  style="margin-top: 12px">
          Author: {{ author.name }}
        </h5>
      </template>
      <br>
      <h5 style="size: 40px">Tags: </h5>
      <div v-if="tags" class="btn-group mx-10" >
        <h5 v-for="tag in tags" :key = "tag.tagId" @click="findTag(tag.tagId); showToastTag();" style="margin-top: 12px; margin-bottom: 35px">
          <div class="btn-toolbar">
            <button class="navitem"> {{tag.keyword}} </button>
          </div>
        </h5>
      </div>

    </div>


    <br><br><br>

    <h3>Content:</h3>
    <h4> <p>{{ news.content }} <br><br> </p> </h4>
    <br><br><br>

    <h3>Add comment:</h3>
    <div class="form-group">
      Date: {{currentDateTime()}}
    </div>
    <br>
    <form method="post" v-on:submit.prevent = "postComment" >
      <div class="form-group">
        <label for="name">Name</label>
        <input required v-model="authorName" type="text" class="form-control" id="name" placeholder="Enter your name">
      </div>
      <br>

      <div class="form-group">
        <label for="content">Comment</label>
        <input required v-model="content" type="text" class="form-control" id="content" placeholder="Comment">
      </div>
      <br>
      <button type="submit" class="btn btn-primary mt-2">Publish</button>
    </form>


    <div style="margin-top: 60px">
      <button :disabled="cnt > 1" class="button" @click="like(news.newsId); showToastLike();">Like</button>
      <button :disabled="cntD > 1" class="button1" @click="dislike(news.newsId); showToastDislike();">Dislike</button>
      <br><br>
      Reactions in total for this news: {{ reactions }}
    </div>


    <br>
    <h3 style="margin-top: 110px">Comments:</h3>
    <br>
    <h6 v-for="comment in comments" :key = "comment.id">

      Author: {{comment.authorName}} <br>
      {{  moment(new Date(comment.dateCreated).toISOString() ).format('MMMM Do YYYY') }}
      <br><br>
      <b-card style="margin-bottom: 60px; background: rgba(0,0,0,0.15)">
        <h7 >{{comment.content}}</h7>
      </b-card>
    </h6>
    <br>



  </div>
</template>

<script>


import moment from 'moment'

export default {
  name: "NewsDetails",
  props: {
    news: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      tags: [],
      comments: [],
      authorName: null,
      content: null,
      author: null,
      dateCreated: null,
      category: null,
      moment: moment,
      isActive: false,
      cnt: 1,
      cntD: 1,


    }
  },
  mounted() {
   this.$axios.post(`/api/news/register-visit/${this.$route.params.id}`).then(() => {});

    this.$axios.get(`/api/tags/tags-by-news?newsId=${this.$route.params.id}`).then((response) => {
      this.tags = response.data;
    });

    this.$axios.get(`/api/comments/${this.$route.params.id}`).then((response) => {
     this.comments = response.data;
    });
    this.$axios.get(`/api/news/${this.$route.params.id}`).then((response) => {
      this.$axios.get(`/api/categories/${response.data.categoryId}`).then((response) => {
        this.category = response.data;
      });
      this.$axios.get(`/api/users/${response.data.authorId}`).then((response) => {
        this.author = response.data;
      })
    });
    this.$axios.get(`/api/news/reactions/${this.$route.params.id}`).then((response) => {
      this.reactions = response.data;
    });

  },
  methods: {
    like(id) {
      if (!this.isActive) {
        this.isActive = true;
        this.$axios.get(`/api/news/like/${id}`)
        this.cnt = ++this.cnt;
        this.isActive = false;

      }
    },
    dislike(id) {
      if (!this.isActive) {
        this.isActive = true;
        this.$axios.get(`/api/news/dislike/${id}`)
        this.cntD = ++this.cntD;
        this.isActive = false;
      }
    },
    postComment(){
      this.$axios.post(`/api/comments`, {
        "authorName": this.authorName,
        "content": this.content,
        "newsId": this.news.newsId,
        "dateCreated": this.dateCreated
      }).then(() => {
        window.location.reload();
      });
    },
    currentDateTime() {
      const current = new Date();
      const date = current.getDate() + '.' + (current.getMonth()+1) +'.'+ current.getFullYear();
      const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date +' '+ time;

      return dateTime;
    },
    showToastLike() {
      this.$toast.info("Like +1\nPlease refresh page to see reactions in total.");
    },
    showToastDislike() {
      this.$toast.info("Like -1\nPlease refresh page to see reactions in total.");
    },
    showToastTag() {
      this.$toast.success("See more news with this same tag.");
    },
    findTag(id) {
    this.$router.push(`/news/tag/${id}`);
    }
  }
}
</script>

<style scoped>
.jumbotron {
  text-align: center;
  margin-top: 80px;
  margin-bottom: 80px;
  text-shadow: #0e0e0e 0.3em 0.3em 0.3em;

}


h7 {
  text-align: center;
}

h6 {
  margin-top: 10px;
}

.button {
  transition-duration: 0.4s;
}

.button:hover {
  background-color: #4CAF50; /* Green */
  color: white;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.button1 {
  transition-duration: 0.4s;
}

.button1:hover {
  background-color: #852424; /* Green */
  color: white;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.btn-group button{
  height: 100%;
  width: 100%;
  display: flex;
  float: left;
  position: relative;
  margin-left: 5px;
  margin-right: 5px;

}
.navitem {
  display: inline-block;
  font-size: 18px;
  width: 70px;
  height: 30px;
  text-align: center;
  border: #42b983;
  background-color: rgba(67, 87, 107, 0.57);
  color: #fff;
  cursor: pointer;
}

.navitem:hover {
  background-color: rgba(7, 8, 14, 0.5); /* Green */
  color: rgba(253, 245, 245, 0.93);
  box-shadow: rgba(51, 66, 100, 0.25) 0px 3px 8px;
}

</style>
