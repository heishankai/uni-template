<script setup lang="ts">
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
/* 全局背景色 */
page {
  background-color: #f5f5f5;
}
</style>
