<template>
    <AuthComponent v-if="currentTab == 'auth-tab'"></AuthComponent>
</template>

<script>
import AuthComponent from '@/components/Auth/AuthComponent.vue';
import Cookie from './assets/js/cookie.js';
export default {
  name: 'App',
  data() {
    return {
      currentTab: ''
    }
  },
  created() {
    const cookie = new Cookie();
    console.log(cookie.get('community_id'))
    if (cookie.get('community_id') == undefined) {
      this.currentTab = 'auth-tab'
    }
  },
  components: {
    AuthComponent
  }
}
</script>

<style>
@import url('/src/assets/css/index.css');
#app {
  background-size: cover;
  background: url('/src/assets/img/Moskvitch.jpeg') no-repeat center center;
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
