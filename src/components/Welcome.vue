<template>
  <div class="block block--welcome">
    <h1 class="block__title">
      {{ $t("Welcome") }}
    </h1>
    <p class="block__lead">
      {{
        $t("Log into your RedShape account to save your blood sugar values.")
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
};
</script>

<style lang="scss">
.block.block--welcome {
  width: 100%;
  text-align: center;

  .block__title {
    margin-bottom: 16px;
    color: white;
    font-size: 22px;
    font-weight: 700;
  }

  .block__lead {
    width: 65%;
    margin: 0 auto;
    color: var(--medium-gray-2);
    font-size: 15px;
    line-height: 25px;
  }
}
</style>
