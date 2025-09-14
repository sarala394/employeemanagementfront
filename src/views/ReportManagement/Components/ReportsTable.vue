<template>
  <v-container class="header_employee">
    <h2 class="title_sub">Report Management</h2>
  </v-container>
  <div class="employee_management">
    <v-container class="employee-table">
      <div class="labour_management">
        <v-container class="title_box">
          <v-row>
            <!-- Search Box on the Left -->
            <v-col cols="6" sm="6" md="4">
              <v-text-field
                v-model="searchedData"
                placeholder="Type...."
                variant="none"
                style="background-color: #fdffff; height: 50px"
                class="elevation-3 sbox"
              ></v-text-field>
            </v-col>
            <!-- Button -->
            <v-col cols="6" sm="4" md="4">
              <v-btn
                rounded="xl"
                dense
                style="text-transform: capitalize; height: 45px background-color: #274472;"
                @click="getAllEmployees()"
                >Search</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="mt-4"></div>
      <v-card class="pa-5" elevation="3">
        <v-skeleton-loader
          :loading="loading"
          height="240"
          type="image, list-item-two-line"
        >
          <v-data-table
            :items="employees"
            :headers="headers"
            class="table-responsive"
          >
            <template
              v-for="header in headers"
              :key="header.value"
              v-slot:[`item.${header.value}`]="props"
            >
              <div v-if="header.value === 'employee_ref_id'">
                {{ props.item.employee_ref_id }}
              </div>

              <div v-else-if="header.value === 'name'">
                {{ props.item.name }}
              </div>

              <div v-else-if="header.value === 'email'">
                {{ props.item.email }}
              </div>

              <div v-else-if="header.value === 'contact'">
                {{ props.item.contact }}
              </div>

              <div v-else-if="header.value === 'designation'">
                {{ props.item.designation }}
              </div>

              <div v-else-if="header.value === 'monthly_salary_package'">
                {{ props.item.monthly_salary_package }}
              </div>

              <div v-else-if="header.value === 'monthly_tax_value'">
                {{ props.item.monthly_tax_value }}
              </div>

              <div v-else-if="header.value === 'net_salary'">
                {{ props.item.net_salary }}
              </div>

              <div v-else-if="header.value === 'yearly_increasing_bonus'">
                {{ props.item.yearly_increasing_bonus }}
              </div>

              <div v-else-if="header.value === 'yearly_net_salary'">
                {{ props.item.yearly_net_salary }}
              </div>
            </template>
          </v-data-table>
        </v-skeleton-loader>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import EmployeeApi from "@/Api/Modules/employees.js";

export default {
  data() {
    return {
      employees: [],
      loading: false,
      searchedData: null,
      headers: [
        { title: "Emp Ref Id", value: "employee_ref_id" },
        { title: "Name", value: "name" },
        { title: "Email", value: "email" },
        { title: "Contact", value: "contact" },
        { title: "Designation", value: "designation" },
        { title: "Monthly Salary Package", value: "monthly_salary_package" },
        { title: "Tax", value: "monthly_tax_value" },
        { title: "Net Salary", value: "net_salary" },
        { title: "Yearly Bonus", value: "yearly_increasing_bonus" },
        { title: "Yearly Net Salary", value: "yearly_net_salary" },
      ],
    };
  },

  async created() {
    await this.getAllEmployees();
  },

  methods: {
    // Get All employee Info or Get by Search Filter
    async getAllEmployees() {
      this.loading = true;
      const payload = {
        search_data: this.searchedData,
      };
      const res = await EmployeeApi.getAllEmployees(payload);
      this.employees = res.data.data;
      this.loading = false;
    },
  },
};
</script>
