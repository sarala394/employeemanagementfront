<template>
  <div class="employee_management">
    <v-container class="employee-table">
      <v-row class="search_box">
        <!-- on the Left -->
        <v-col cols="12" sm="6" md="4"> </v-col>

        <!-- Button on the Right -->
        <v-col cols="12" sm="6" md="3" class="text-right">
          <v-btn class="add_Newbutton" @click="openNewEmployeeForm()">
            Add New Labour
          </v-btn>
        </v-col>
      </v-row>

      <div class="mt-4"></div>
      <v-card class="pa-5" elevation="3">
        <v-skeleton-loader
          :loading="loading"
          height="240"
          type="image, list-item-two-line"
        >
          <v-data-table
            :items="items"
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
              <!-- Status Updates -->
              <div v-else-if="header.value === 'status'">
                <v-btn
                  :color="props.item.status === 'Active' ? 'green' : 'red'"
                  variant="flat"
                  class="status_chip"
                >
                  {{ props.item.status }}
                </v-btn>
              </div>
              <!-- Edit & Delete Button -->
              <div
                v-else-if="header.value === 'action'"
                class="d-flex align-center ga-2"
              >
                <!-- Edit Button -->
                <v-btn
                  class="edit_btn"
                  icon
                  size="small"
                  @click="openEditForm(props.item)"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
                <!-- Delete Button -->
                <v-btn
                  class="delete_btn"
                  icon
                  size="small"
                  @click="deleteUser(props.item.id)"
                >
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-skeleton-loader>
      </v-card>
    </v-container>
    <!-- add Employee Form -- dialog -->
    <v-dialog v-model="showForm" max-width="900px" persistent="">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between align-center add_form"
        >
          Add Employee
        </v-card-title>
        <v-card-text>
          <AddEmployee @closeForm="closeAddForm" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- edit Employee Form -- dialog -->
    <v-dialog v-model="showEditForm" max-width="500px" persistent="">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between align-center add_form"
        >
          Edit User
        </v-card-title>
        <v-card-text>
          <EditEmployee :selectedItem="selectedItem"  @closeModal="closeEditForm"/>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- dialogs box- Delete Confirmation-->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text> Are you sure you want to delete this user? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" variant="text" @click="confirmDelete()">
            Yes, Delete
          </v-btn>
          <v-btn color="grey" variant="text" @click="cancelDelete()">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AddEmployee from "@/views/EmployeeManagement/Components/AddEmployee.vue";
import EditEmployee from "@/views/EmployeeManagement/Components/EditEmployee.vue";

export default {
  components: {
    AddEmployee,
    EditEmployee,
  },

  data() {
    return {
      showForm: false,
      selectedItem: {},
      headers: [
        { title: "Employee Ref Id", value: "employee_ref_id" },
        { title: "Employee Name", value: "name" },
        { title: "Email", value: "email" },
        { title: "Contact", value: "contact" },
        { title: "Designation", value: "designation" },
        { title: "Status", value: "status" },
        { title: "Action", value: "action" },
      ],
      items: [
        {
          employee_ref_id: "dvfvf",
          name: "dvf",
          email: "hbjh@gmail.com",
          contact: "34234534",
          designation: "sdvf",
          status: "Active",
          action: "edit",
        },
      ],
    }; // end return
  }, // end data()

  methods: {
    openNewEmployeeForm() {
      this.showForm = true;
    },

    // Close Add Form
    closeAddForm(data) {
      this.showForm = false;
    },

    // Open Edit Form
    openEditForm(item) {
      this.selectedItem = item;
      this.showEditForm = true;
    },
  },
};
</script>
