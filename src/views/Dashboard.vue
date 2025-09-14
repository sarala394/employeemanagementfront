<template>
  <v-container class="employee-dashboard">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mini-card">
          <v-card-title>{{ totemployees }}</v-card-title>
          <v-card-subtitle>Total Employees</v-card-subtitle>
          <v-card-text> 2020 - 2025 </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mini-card">
          <v-card-title>0%</v-card-title>
          <v-card-subtitle>Employee Turn Over</v-card-subtitle>
          <v-card-text> 2020 - 2025 </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HorizantalBar from "@/components/HorizantalBar.vue";
import mobilebar from "@/components/MobileSideBar.vue";
import EmployeeApi from "@/Api/Modules/employees.js";
export default {
  data() {
    return {
      totemployees: 0,
    };
  },
  components: {
    HorizantalBar,
    mobilebar,
  },

  async created() {
    await this.totalEmployees();
  },

  methods: {
    // get total employee count
    async totalEmployees() {
      const res = await EmployeeApi.totalEmployees();
      this.totemployees = res.data.data;
    },
  },
};
</script>
