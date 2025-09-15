<template>
  <v-container class="header_employee">
    <h2 class="title_sub">Employee Management</h2>
  </v-container>
  <!-- Search Bar -->
  <div class="employee_management">
    <v-container class="employee-table">
      <v-row>
        <!-- Search Box on the Left -->
        <v-col cols="6" sm="6" md="4">
          <v-text-field
            v-model="searchNumber"
            placeholder="Enter phone number to search..."
            label="Search Phone Number"
            variant="none"
            style="background-color: #fdffff; height: 50px"
            class="elevation-3 sbox"
            clearable
            type="text"
          ></v-text-field>
        </v-col>

        <!-- Button -->
        <v-col cols="6" sm="4" md="4">
          <v-btn
            rounded="xl"
            dense
            style="text-transform: capitalize; height: 45px"
            @click="getEmployees()"
          >
            Search Phone
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- Employee Main Data Table -->
  <div><EmployeeTable :employees="employees" :loading="loading" /></div>
</template>
<script>
import EmployeeTable from "@/views/EmployeeManagement/Components/EmployeeTable.vue";
import EmployeeApi from "@/Api/Modules/employees.js";

export default {
  data() {
    return {
      employees: [],
      loading: false,
      searchNumber: null,
    };
  },
  components: {
    EmployeeTable,
  },

  async created() {
    await this.getEmployees();
  },
  methods: {
    // Get All employees Info or Get by Search Filter
    async getEmployees() {
      this.loading = true;
      const payload = {
        search_data: this.searchNumber,
      };
      const res = await EmployeeApi.getEmployees(payload);
      this.employees = res.data.data;
      this.loading = false;
    },
  },
};
</script>
