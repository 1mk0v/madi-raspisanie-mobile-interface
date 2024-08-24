<template>
  <div class="bunner-container">
    <div class="bunner-text-container">
      <span class="bunner-text-title">Приложение не доступно на компьютере!</span>
      <span>К сожалению данный сайт оптимизирован только для просмотра на мобильных устройствах</span>
    </div>
    <div class="bunner-img-container">
      <div class="bunner-img" style="left: 0px">
        <img src="/img/mockups/mockup-schedule.png">
      </div>
      <div class="bunner-img" style="left: 199px">
        <img src="/img/mockups/mockup-ico.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent"
}
</script>

<style scoped>
.bunner-text-title {
  font-size: 60px;
  font-weight:500;
}

.bunner-text-container {
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.bunner-img-container {
  position: relative;
  width: 100%;
}

.bunner-img,
.bunner-img img {
  height: 100%;
  position: absolute;
}

.bunner-container {
  line-height: normal;
  display: flex;
  gap: 10px;
  padding: 50px;
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 24px;
}
</style>