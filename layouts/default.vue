

<template>
  <div class="layout-wrapper">
    <Header />

    <main class="content">
      <slot /> 
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
</style>