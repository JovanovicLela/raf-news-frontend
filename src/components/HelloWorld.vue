<template>

  <div class="hello">
    <h1>{{ msg }}</h1>
    <br>
    <h5>A news platform for calling extra attention to learning, information, acquired facts and knowledge.</h5>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: "Calibri", Times, serif;
  font-weight: bold;
  text-shadow: 5px 5px 10px #9cbcf6;

  font-size: 54px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
