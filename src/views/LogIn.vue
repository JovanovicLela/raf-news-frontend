<template>
  <div class="pt-5" style="margin-top: 70px">
    <h1 v-if="username" style="text-align: center">Welcome, {{username}}</h1>
    <br> <br>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Email</label>
        <input v-model="username" type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter email">
        <small @click="showToast" id="usernameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input @click="showToastWarn" v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button  type="submit" class="btn btn-primary mt-2">Submit</button>

    </form>
  </div>
</template>

<script>

export default {
  name: "LogIn",
  data() {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login() {
      this.$axios.post('/api/users/logIn', {
        email: this.username,
        password: this.password

      }).then(response => {
        localStorage.setItem('jwt', response.data.jwt)
        this.$router.push({name: 'Home'});
        this.message = response.data().message

      })

    },
    showToast() {
      this.$toast.info("Privacy policy statement.");
    },
    showToastWarn() {
      this.$toast.warning("Please enter correct credentials.");
    }
  },
}
</script>

<style scoped>

</style>
