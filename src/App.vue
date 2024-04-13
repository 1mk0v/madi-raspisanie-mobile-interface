<template>
    <AuthComponent></AuthComponent>
</template>

<script>
import AuthComponent from '@/components/Auth/AuthComponent.vue';
export default {
  name: 'App',
  components: {
    AuthComponent
  }
}
</script>

<style>
@import url('/src/assets/css/index.css');
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
