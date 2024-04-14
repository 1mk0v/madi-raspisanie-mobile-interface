<template>
    <AuthComponent
      @registrationCompleteEvent="changeTab"
      v-if="currentTab == 'auth-tab'"></AuthComponent>
    <MainComponent v-if="currentTab == 'main-tab'"></MainComponent>
    
</template>

<script>
import AuthComponent from '@/components/Auth/AuthComponent.vue';
import MainComponent from '@/components/MainBlock/MainComponent.vue';
import Cookie from './assets/js/cookie.js';
export default {
  name: 'App',
  data() {
    return {
      currentTab: 'main-tab'
    }
  },
  created() {
    if (window.innerWidth > 500) {
      this.currentTab = 'banner'
    }
    const cookie = new Cookie();
    if (
      cookie.get('community_id') == undefined 
      || cookie.get('community_type') == undefined
      || cookie.get('community_value') == undefined) {
      this.currentTab = 'auth-tab'
    }
  },
  methods: {
    changeTab() {
      this.currentTab = 'main-tab'
    }
  },
  components: {
    AuthComponent, MainComponent
  }
}
</script>

<style>
@import url('/src/assets/css/index.css');
#app {
  background: url('/src/assets/img/Moskvitch.jpeg') no-repeat center center;
  background-size: cover;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
</style>
