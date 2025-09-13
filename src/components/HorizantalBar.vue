<template>
  <v-card elevation="2" class="pa-1 card top-bar">
    <v-row>
      <v-col lg="10">
        <v-menu>
          <template> </template>
        </v-menu>
      </v-col>
      <v-col lg="2">
        <div class="text-right">
          <v-btn icon="mdi-account"> </v-btn>
          <br />
          <span class="role_text">HR Manager</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {};
</script>
<style scoped>
.top-bar {
  margin: 0;
  padding: 8px 16px;
  width: 100%;
  background-color: #274472;
  color: white;
}
.text-right .v-btn {
  background-color: #81d8d0 !important;
}
</style>
