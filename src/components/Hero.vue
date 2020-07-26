<template>
  <div class="hero-container">
    <div class="heading-container ">
      <h1 class="heading-primary">
        <span class="heading-primary--main">Compass</span>
        <span class="heading-primary--sub">find your next office</span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style scoped>
.hero-container {
  position: relative;
  background-image: url("/img/hero4.jpg");
  background-size: cover;
  background-position: top;
  height: 65vh;
}

.heading-container {
  position: absolute;
  top: 40%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}

.heading-primary {
  color: #fff;
  text-transform: uppercase;
  backface-visibility: hidden;
}

.heading-primary--main {
  display: block;
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 10px;
}

.heading-primary--sub {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 20px;
}
</style>
