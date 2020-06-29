<template>
  <div>
    <v-card>
      <v-card-title>
        Users manager
        <v-spacer></v-spacer>
        <v-text-field
          v-model="pagination.name"
          append-icon="search"
          label="Search by name"
          single-line
          hide-details
          @change="updatePagination('name', $event)"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="items"
        :server-items-length="totalItems"
        :loading="loading"
        :hide-default-footer="true"
        :page="pagination.page"
        :sort-by="pagination.sortBy"
        :sort-desc="pagination.sortDesc"
        @update:page="updatePagination('page', $event)"
        @update:sort-by="updatePagination('sortBy', $event)"
        @update:sort-desc="updatePagination('sortDesc', $event)"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New user</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-col>
                    <div role="alert" class="alert alert-danger" v-if="errors.message">
                      <div class="alert-text">{{ errors.message }}</div>
                    </div>
                  </v-col>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <!-- :rules="emailRules"
                          :rules="nameRules"-->
                          <v-text-field
                            v-model="editedItem.email"
                            :error-messages="errors.email[0]"
                            label="Email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.name"
                            :error-messages="errors.name[0]"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-pagination v-model="pagination.page" :length="totalPages" :total-visible="7"></v-pagination>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_USER_LIST,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  PURGE_ERROR
} from "@/store/users.module";

export default {
  name: "user",
  data() {
    return {
      valid: true,
      loading: true,
      dialog: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Email", value: "email" },
        { text: "Name", value: "name" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      pagination: {
        page: 1,
        sortBy: ["id"],
        sortDesc: [true],
        name: ""
      },
      editedIndex: -1,
      editedItem: {
        email: "",
        name: ""
      },
      defaultItem: {
        email: "",
        name: ""
      },
      watch: {
        dialog(val) {
          val || this.close();
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      items: "listUsers",
      totalItems: "totalUsers",
      totalPages: "totalPages",
      errors: "userErrors"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    updatePagination(property, value) {
      this.pagination[property] = value;
      this.fetchUsers();
    },
    fetchUsers() {
      this.loading = true;
      this.$store.dispatch(FETCH_USER_LIST, this.pagination).then(() => {
        this.loading = false;
      });
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      var accept = confirm("Are you sure you want to delete this item?");
      if (accept) {
        this.$store.dispatch(DELETE_USER, { id: item.id }).then(() => {
          this.items.splice(index, 1);
        });
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.$store.dispatch(PURGE_ERROR);
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        // Edit user
        this.$store
          .dispatch(UPDATE_USER, {
            id: this.editedItem.id,
            params: this.editedItem
          })
          .then(() => {
            Object.assign(this.items[this.editedIndex], this.editedItem);
            this.close();
          });
      } else {
        // Add new user
        this.$store
          .dispatch(CREATE_USER, {
            params: this.editedItem
          })
          .then(data => {
            console.log(data);
            this.fetchUsers();
            this.close();
          });
      }
    }
  }
};
</script>
