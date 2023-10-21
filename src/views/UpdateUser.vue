<template>
  <div class="pt-5">
    <h2 class="mt-4">Edit User</h2>
    <br>
    <form method="post" v-on:submit.prevent = "updateUser" >
      <div class="form-group">
        <label for="email">Email</label>
        <input style="margin-top: 10px;" required  v-model="email" v-text="email" type="email" class="form-control" id="email" >
      </div>
      <br>
      <div class="form-group">
        <label for="name" style="margin-top: 10px;">Name</label>
        <input style="margin-top: 10px;" required  v-model="name" v-text="name" type="name" class="form-control" id="name" placeholder="Enter name">

      </div>
      <br>
      <div class="form-group">
        <label for="lastname" style="margin-top: 10px;">Lastname</label>
        <input style="margin-top: 10px;" required  v-model="lastname" v-text="lastname" type="name" class="form-control" id="lastname" placeholder="Enter lastname">
      </div>
      <br>
      <br>
      <div class="form-group">
        <label for="isAdmin" style="margin-top: 10px;">Is Administrator</label>
        <input style="margin-top: 10px;" required  v-model="isAdmin" type="number" class="form-control" id="isAdmin" placeholder="Is Administrator">
      </div>
      <br>

      <button type="submit" class="btn btn-primary mt-2">Update user</button>
    </form>
  </div>
</template>

<script>


export default {
  name: "UpdateUser",
  data() {
    return {
      email: null,
      name: null,
      lastname: null,
      isAdmin: null,
    }
  },
  mounted() {
    this.$axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      const user = response.data;
      this.email = user.email;
      this.name = user.name;
      this.lastname = user.lastname;
      this.isAdmin = user.admin ? "1" : "0";
    });
  },
  methods: {
    updateUser(){
      this.$axios.put(`/api/users/${this.$route.params.id}`, {
        "email": this.email,
        "name": this.name,
        "lastname": this.lastname,
        "admin": this.isAdmin === 'true' || this.isAdmin === '1',

      }).then(() => {
        this.$router.push(`/users`);
      })
    },
  }
}
</script>

<style scoped>

</style>
