<script>

export default {
  props: {
    project: Object
  },
}
</script>

<template>
  <div class="card-box">
    <div class="card">
      <h3>{{ project.title }}</h3>
      <p><strong>Descrizione: </strong>{{ project.description }}</p>
      <p><strong>Link: </strong>{{ project.link }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.card-box {
  padding: 10px;
  width: calc(100% / 3);
  .card {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    background-color: antiquewhite;
    border-radius: 10px;
    p {
      padding: 5px 0;
    }
  }
}
</style>