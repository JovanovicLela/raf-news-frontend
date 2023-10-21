<template>
  <div class="pt-5">

    <h1 align="center" class="pt-5">All Users</h1>
    <br>

    <div class="row" style="display:inline;">
      <div class="col-8 mx-auto">

        <b-table
            id="my-table"
            :fields="fields"
            :items="users"
            :per-page="perPage"
            :current-page="currentPage"
        >
          <template #cell(action)="row">
            <b-button size="sm"  @click="updateUser(row.index)">Edit</b-button>
          </template>

        </b-table>

        <b-pagination align="center"
                      v-model="currentPage"
                      :total-rows="users.length"
                      :per-page="perPage"
                      aria-controls="my-table"
        ></b-pagination>

        <p align="center" class="mt-5">Current Page: {{ currentPage }}</p>

        <br> <br>
        <h3 align="center" class="pt-5">Add User</h3>

        <form method="post" v-on:submit.prevent="addUser">
          <div class="form-group">
            <label for="email">Email</label>
            <input @click="showToast"  style="margin-top: 10px;" required v-model="email" type="email" class="form-control" id="email"
                   placeholder="Enter Email">
          </div>
          <br>
          <div class="form-group">
            <label for="name" style="margin-top: 10px;">Name</label>
            <input style="margin-top: 10px;" required v-model="name" type="name" class="form-control" id="name"
                   placeholder="Enter Name">

          </div>
          <br>
          <div class="form-group">
            <label for="lastname" style="margin-top: 10px;">Lastname</label>
            <input style="margin-top: 10px;" required v-model="lastname" type="lastname" class="form-control"
                   id="lastname" placeholder="Enter lastname">
          </div>
          <br>
          <div class="form-group">
            <label for="password" style="margin-top: 10px;">Password</label>
            <input style="margin-top: 10px;" required v-model="password" type="password" class="form-control"
                   id="password" placeholder="Enter Password">
          </div>
          <div class="form-group">
            <input style="margin-top: 10px;" required v-model="confirmPassword" type="password" class="form-control"
                   id="confirmPassword" placeholder="Confirm Password">
          </div>
          <br>
          <div class="form-group">
            <label for="isAdmin" style="margin-top: 10px;">Role</label>
            <input style="margin-top: 10px;" required v-model="isAdmin" type="number" class="form-control" id="isAdmin"
                   placeholder="Is Administrator">
          </div>
          <br>
          <button type="submit" class="btn btn-primary mt-2">Add User</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: "new-user",
  data() {
    return {
      fields: [
        'email',
        'name',
        'lastname',
        {key: 'action', label: 'Edit'},
      ],

      users: [],
      email: null,
      name: null,
      lastname: null,
      password: null,
      confirmPassword: null,
      isAdmin: null,

      perPage: 10,
      currentPage: 1,
    }
  },
  mounted() {
    this.$axios.get('/api/users').then((response) => {
      this.users = response.data;
    });
  },
  methods: {
    updateUser(index) {
      let user = this.users[index]
      if (this.users[index].admin == false)
        this.$router.push(`/user/update/${user.userId}`)
    },
    addUser() {
      if (this.password != this.confirmPassword)
        return;

      this.$axios.post('/api/users', {
        "email": this.email,
        "name": this.name,
        "lastname": this.lastname,
        "password": this.password,
        "admin": this.isAdmin === 'true' || this.isAdmin === '1',

      }).then(() => {
        window.location.reload()
      })
    },
    showToast() {
      this.$toast.info("Please enter correct email format.");
    }
  }
}
</script>

<style scoped>

</style>
