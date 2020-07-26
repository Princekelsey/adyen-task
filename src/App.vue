<template>
  <div id="app">
    <Hero />
    <MainPage />
  </div>
</template>

<script>
import Hero from "./components/Hero";
import MainPage from "./components/MainPage";

export default {
  name: "App",
  components: {
    Hero,
    MainPage,
  },
};
</script>

<style>
body {
  overflow-x: hidden;
}
</style>
