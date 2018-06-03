<template>
  <ul class='tab tab-block'>
    <li class='tab-item' v-for="route in list" :key="route.name">
      <router-link :to="route"
        :class="{'active': $route.path === route.path || $route.name === route.name}">
        <slot :name="route.name"/>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: Array
  }
}
</script>
<style>
.tab{
  border-bottom: none;
}
.tab-item a:focus{
  box-shadow: none;
}
.tab{
  border-bottom: none;
}
.tab-item a:focus{
  box-shadow: none;
}

</style>

