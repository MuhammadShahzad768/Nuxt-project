<template>
  <div class="loader-container">
    <img src="https://admin.dspcrm.com/wp-content/uploads/2025/09/DSP-final-logo-4-cropped.svg" alt="Logo" class="loader-logo" />
  </div>
</template>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white; /* or your brand color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999999999;
}

.loader-logo {
  width: 300px;
  animation: pulse 2s infinite ease-in-out;
}

.loader-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db; /* match brand color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
}
</style>
