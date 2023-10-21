<template>
  <div class="pt-5">

    <h1 align="center" class="mt-4">All Categories</h1>
    <br>

    <div class="row" style="display:inline;">
      <div class="col-9 mx-auto">

        <b-table class="table table-hover"
            id="my-table"
                 hover fixed
            :fields="fields"
            :items="categories"
            :per-page="perPage"
            :current-page="currentPage"
        >


        <template>

        </template>
          <template #cell(action)="row">
            <b-button size="sm" @click="editCategory(row.index)">Edit</b-button>
          </template>
          <template #cell(actionDelete)="row2">
            <b-button size="sm" @click="deleteCategory(row2.index)">Delete</b-button>
          </template>
        </b-table>

        <b-pagination align="center"
                      v-model="currentPage"
                      :total-rows="categories.length"
                      :per-page="perPage"
                      aria-controls="my-table"
        ></b-pagination>

        <p align="center" class="mt-3">Current Page: {{ currentPage }}</p>

        <form method="post" v-on:submit.prevent="addCategory">
          <div class="form-group">
            <label for="name">Name</label>
            <input style="margin-top: 10px;" required v-model="name" type="text" class="form-control" id="name"
                   placeholder="Enter name" aria-required="true">
          </div>
          <div class="form-group">
            <label for="description" style="margin-top: 10px;">Description</label>
            <textarea style="margin-top: 10px;" required v-model="description" type="text" class="form-control"
                      id="description"
                      placeholder="Enter description" aria-required="true"></textarea>
          </div>
          <br>
          <button type="submit" class="btn btn-primary mt-2">Add Category</button>
        </form>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "new-category",
  data() {
    return {
      fields: [
        'name',
        'description',
        {key: 'action', label: 'Edit'},
        {key: 'actionDelete', label: 'Delete'}

      ],
      date: '',
      name: null,
      description: null,
      categories: [],

      perPage: 10,
      currentPage: 1,
    }
  },
  mounted() {
    this.$axios.get('/api/categories').then((response) => {
      this.categories = response.data;
    });
  },
  methods: {
    findCategory(id) {
      this.$router.push(`/news/category/${id}`);
    },
    editCategory(index) {
      let category = this.categories[index]
      this.$router.push(`/category/update/${category.categoryId}`)
    },
    deleteCategory(index) {
      let category = this.categories[index]
      this.$axios.delete(`/api/categories/${category.categoryId}`).then(() => {
      });
      window.location.reload()
    },
    addCategory() {
      this.$axios.post('/api/categories', {
        "name": this.name,
        "description": this.description,
      }).then(() => {
        window.location.reload()
      })
    },
    /* computed: {
      categories() {
        const items = this.categories
        // Return just page of items needed
        return items.slice(
            (this.currentPage - 1) * this.perPage,
            this.currentPage * this.perPage
        )
      }*/
  }
}
</script>

<style scoped>

</style>
