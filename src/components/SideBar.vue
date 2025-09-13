<template>
  <!-- changes to be done -->
  <div class="sidebar">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      permanent
    >
      <div class="background">
        <div class="d-flex justify-content-start">
          <div class="pt-5">
            <v-img width="155px" src="@/assets/images/abclogo.png"></v-img>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 pt-5 activehovercolor">
          <v-list nav>
            <!-- dashboard -->
            <v-list-item
              active-class="active-color"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              value="Dashboard"
              @click="$router.push('/dashboard')"
            >
            </v-list-item>

            <!-- User -->
            <v-list-item
              active-class="active-color"
              prepend-icon="mdi-account"
              title="Employees"
              value="Employees"
              @click="$router.push('/employees')"
            >
            </v-list-item>

            <!-- Job card Management -->
            <v-list-item
              prepend-icon="mdi-smart-card"
              title="Reports"
              value="Reports"
              @click="$router.push('/reports')"
              active-class="active-color"
            >
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.active-color {
  background-color: #81d8d0;
  color: #274472;
}
</style>
