<template>
  <div class="mt-4 text-center">
    <b-spinner :variant="color" type="grow" label="Spinning"></b-spinner>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    color: String,
  },
};
</script>

<style></style>
