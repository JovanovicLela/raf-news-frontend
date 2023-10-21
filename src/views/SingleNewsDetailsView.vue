<template>
  <div>
    <NewsDetails :news="news"></NewsDetails>
  </div>
</template>

<script>
import NewsDetails from "../components/SingleNewsDetailsView";
export default {
  name: "NewsDetailsView",

  components: {NewsDetails},
  data() {
    return {
      news: {},
    }
  },
  created() {
    this.$axios.get(`/api/news/${this.$route.params.id}`).then((response) => {
      this.news = response.data;
    });
  }
}
</script>

<style scoped>

</style>
