<template>
  <v-card class="mx-auto" width="800">
    <v-card-text class="addemployeeform">
      <v-form v-model="isFormValid">
        <!-- Divider -->
        <v-divider class="my-4">
          <strong>Employee Personal Details</strong>
        </v-divider>
        <br />
        <!-- Divider -->

        <v-row>
          <!-- Conatct No -->
          <v-col lg="6" cols="12">
            <label>Contact</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.contact"
              :rules="[required]"
            >
            </v-text-field>
          </v-col>

          <!-- Role -->
          <v-col lg="6" cols="12">
            <label>Designation</label>
            <div class="mt-2"></div>
            <v-select
              class="custom-input"
              variant="solo"
              v-model="form.designation"
              readonly
            ></v-select>
          </v-col>
        </v-row>
        <!-- Divider -->
        <v-divider class="my-4">
          <strong>Monthly Salary Package </strong>
        </v-divider>
        <br /><br />
        <!-- Divider -->

        <v-row>
          <!-- Monthly Salary Package -->
          <v-col lg="4" cols="12">
            <label>Monthly Salary Package</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.monthly_salary_package"
              :rules="[required]"
              type="number"
              prefix="Rs."
            >
            </v-text-field>
          </v-col>

          <!-- Monthly Tax Value -->
          <v-col lg="4" cols="12">
            <label>Monthly Tax Value</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.monthly_tax_value"
              readonly
              type="number"
              prefix="Rs."
            >
            </v-text-field>
          </v-col>

          <!-- Monthly Net Salary (Final Salary) -->
          <v-col lg="4" cols="12">
            <label>Monthly Net Salary (Final Salary)</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.net_salary"
              readonly
              prefix="Rs."
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- Divider -->
        <v-divider class="my-4">
          <strong>Yearly Increasing Bonus </strong></v-divider
        >
        <br />
        <!-- Divider -->

        <v-row>
          <!-- Yearly Increasing Bonus -->
          <v-col lg="6" cols="12">
            <label>Bonus Amount</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.yearly_increasing_bonus"
              type="number"
              readonly
              prefix="Rs."
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- Save and Cancel Buttons -->
        <v-row class="mt-4">
          <v-col lg="6" cols="6">
            <v-btn
              block
              class="add_button"
              @click="updateEmployee()"
              :loading="showloader"
              :disabled="!isFormValid"
            >
              <span class="text">Save</span>
            </v-btn>
          </v-col>

          <!-- Cancel Button -->
          <v-col lg="6" cols="6">
            <v-btn color="red" block class="add_button" @click="closeForm()">
              <span class="text">Cancel</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import EmployeeApi from "@/Api/Modules/employees.js";

export default {
  data() {
    return {
      showloader: false,
      isFormValid: false,
      form: {},
    };
  },

  props: {
    selecteItem: Object,
  },

  // assigned fetched data from table
  created() {
    this.form = this.selecteItem;
  },

  watch: {
    "form.monthly_salary_package"(data) {
      this.monthlyTaxValue();
      this.yearlyBonus();
      this.monthlyNetSalary();
    },
    "form.designation"(data) {
      this.yearlyBonus();
    },
  },

  methods: {
    monthlyTaxValue() {
      const monthlySalary = parseFloat(this.form.monthly_salary_package) || 0;
      let monthlyTax = 0;

      if (monthlySalary > 0) {
        if (monthlySalary >= 150000) {
          monthlyTax = (monthlySalary * 5) / 100;
        } else if (monthlySalary >= 100000 && monthlySalary < 150000) {
          monthlyTax = (monthlySalary * 3) / 100;
        } else {
          if (monthlySalary < 100000) {
            monthlyTax = 0;
          }
        }
      }
      this.form.monthly_tax_value = parseFloat(monthlyTax.toFixed(2));
    },

    monthlyNetSalary() {
      const monthlySalary = parseFloat(this.form.monthly_salary_package) || 0;
      const monthlyTax = parseFloat(this.form.monthly_tax_value) || 0;
      const netSalary = monthlySalary - monthlyTax;

      this.form.net_salary = parseFloat(netSalary.toFixed(2));
    },

    yearlyBonus() {
      const designation = this.form.designation;
      const monthlySalary = parseFloat(this.form.monthly_salary_package) || 0;

      let yearlyBonus = 0;
      if (designation === "Manager") {
        yearlyBonus = (monthlySalary * 5) / 100;
      } else if (designation === "Senior") {
        yearlyBonus = (monthlySalary * 3) / 100;
      } else if (designation === "Associate") {
        yearlyBonus = (monthlySalary * 1) / 100;
      } else if (designation === "Intern") {
        yearlyBonus = 0;
      }

      this.form.yearly_increasing_bonus = parseFloat(yearlyBonus.toFixed(2));
    },

    // Update employee
    async updateEmployee() {
      this.showloader = true;
      await EmployeeApi.updateEmployee(this.form.id, this.form)
        .then(() => {
          this.showloader = false;
          this.$emit("closeForm", false);
        })
        .catch(() => {
          this.showloader = false;
        });
    },

    //close form
    closeForm() {
      this.$emit("closeForm", false);
    },
  },
};
</script>
