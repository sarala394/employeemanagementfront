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
            v-model="searchedData"
            placeholder="Enter phone number to search..."
            label="Search Phone Number"
            variant="none"
            style="background-color: #fdffff; height: 50px"
            class="elevation-3 sbox"
            clearable
            type="tel"
            :rules="phoneRules"
          ></v-text-field>
        </v-col>

        <!-- Button -->
        <v-col cols="6" sm="4" md="4">
          <v-btn
            rounded="xl"
            dense
            style="text-transform: capitalize; height: 45px"
            @click="searchPhoneNumber()"
            :disabled="!isValidPhoneNumber"
          >
            <v-icon left>mdi-phone</v-icon>
            Search Phone
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- Employee Main Data Table -->
  <div><EmployeeTable /></div>
</template>
<script>
import EmployeeTable from "@/views/EmployeeManagement/Components/EmployeeTable.vue";

export default {
  data() {
    return {
      //   labours: [],
      //   loading: false,
      //   searchedData: null,
    };
  },
  components: {
    EmployeeTable,
  },

  //   async created() {
  //     await this.getLabours();
  //   },
  //   methods: {
  //     // // Get All Labours Info or Get by Search Filter
  //     // async getLabours() {
  //     //   this.loading = true;
  //     //   const payload = {
  //     //     search_data: this.searchedData,
  //     //   };
  //     //   const res = await LabourApi.getLabours(payload);
  //     //   this.labours = res.data.data;
  //     //   this.loading = false;
  //     // },
  //   },
};
</script>
