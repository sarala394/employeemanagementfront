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
          <!-- Labour Id -->
          <v-col lg="6" cols="12">
            <label>Employee Id</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.employee_ref_id"
              :rules="[required]"
              readonly
            >
            </v-text-field>
          </v-col>

          <!-- Labour Name -->
          <v-col lg="6" cols="12">
            <label>Name</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.name"
              :rules="[required]"
            >
            </v-text-field>
          </v-col>

          <!-- Contact -->
          <v-col lg="6" cols="12">
            <label>Email</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.email"
              :rules="[required]"
            >
            </v-text-field>
          </v-col>

          <!-- Hourly Rate -->
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
              :items="['Manager', 'Senior', 'Associate', 'Intern']"
              label="Select Designation"
              required
            ></v-select>
          </v-col>

          <!-- Status -->
          <v-col lg="6" cols="12">
            <label>Status</label>
            <div class="mt-2"></div>
            <v-text-field
              class="custom-input"
              variant="none"
              v-model="form.status"
              :rules="[required]"
              readonly
            >
            </v-text-field>
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
              @click="storeLabour()"
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
export default {
  data() {
    return {
      isFormValid: false,
      showloader: false,
      form: {
        status: "Active",
        monthly_salary_package: 0,
        monthly_tax_value: 0,
        net_salary: 0,
        yearly_increasing_bonus: 0,
      },
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
    generateLabourId() {
      const randomId = "EPF-" + Math.floor(100000 + Math.random() * 9000);
      this.form.employee_ref_id = randomId;
    },

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

    required(value) {
      return !!value || "This field is required";
    },

    storeLabour() {
      // Add your store labour logic here
      console.log("Storing labour data:", this.form);
    },

    closeForm() {
      this.$emit("closeForm", false);
    },

    // Open Edit Form
    openEditForm(item) {
      this.selectedItem = item;
      this.showEditForm = true;
      // console.log(this.selectedItem);
    },
  },
};
</script>
