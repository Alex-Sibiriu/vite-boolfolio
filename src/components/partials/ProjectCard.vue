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
      <p><strong>Tipo: </strong><span class="type-badge">{{ project.type.name }}</span></p>
      <p v-if="project.technologies.length > 0">
        <strong class="pb-l">Tecnologie: </strong>
        <span
          v-for="technology in project.technologies"
          :key="`${project.title}-t-${technology.id}`"
          class="tech-badge">{{ technology.name }}</span>
        </p>
      <p class="link"><strong>Link: </strong>{{ project.link }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.card-box {
  padding: 10px;
  width: calc(100% / 3);
  .card {
    height: 100%;
    display: flex;
    flex-direction: column; 
    justify-content: space-between;
    padding: 10px;
    text-align: center;
    background-color: ivory;
    border-radius: 10px;
    h3 {
      padding-bottom: 10px;
    }
    p {
      padding: 10px 0;
      .tech-badge {
        padding: 6px 10px;
        border-radius: 20px;
        background: steelblue;
        color: white;
        margin: 10px 5px;
      }
      .type-badge {
        padding: 6px 10px;
        border-radius: 20px;
        background: palevioletred;
        color: white;
        margin: 5px 5px;
      }
    }
  }
}
</style>