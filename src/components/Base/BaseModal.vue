<template>
  <Teleport to="#modal">
    <div class="modal-backdrop">
      <slot />
    </div>
  </Teleport>
</template>

<style lang="less" scoped>
.modal-backdrop {
  z-index: 100000;
  padding: 3rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
}
</style>
