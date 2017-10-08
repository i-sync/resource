<template>
  <div class="app-container">
    <div style='margin:30px 0 5px 20px;font-weight: lighter;color: #369;'>不打勾可不显示该项</div>
    <unfixed-thead></unfixed-thead>
  </div>
</template>

<script>
import unfixedThead from './unfixedThead'

export default {
  components: { unfixedThead }
}
</script>
