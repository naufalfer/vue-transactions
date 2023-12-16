<template>
    <layout-div>
          <div class="container">
              <h2 class="text-center mt-5 mb-3">Transaksi</h2>
              <div class="card">
                  <div class="card-header">
                      <router-link to="/create"
                          class="btn btn-outline-primary"
                          >Tambah Transaksi
                      </router-link>
                      <router-link to="/items"
                          class="btn btn-outline-secondary ms-3"
                          > Tabel Barang
                      </router-link>
                      <router-link to="/item-types"
                          class="btn btn-outline-success ms-3"
                          > Tabel Jenis Barang
                      </router-link>
                      <router-link to="/transactions-sold"
                          class="btn btn-outline-danger ms-3"
                          > Transaksi Terjual
                      </router-link>
                  </div>
                  <div class="card-body">

                    <div class="d-flex justify-content-end">
                        <label for="searchInput">Search:</label>
                        <input type="text" v-model="searchTerm" @input="search" class="ms-3">
                    </div>

                      <table class="table table-bordered">
                          <thead>
                              <tr>
                                  <th @click="sortName('asc')">Name <font-awesome-icon icon="sort" /></th>
                                  <th>Stock</th>
                                  <th>Jumlah Terjual</th>
                                  <th @click="sortDate('asc')">Tanggal Transaksi <font-awesome-icon icon="sort" /></th>
                                  <th>Jenis Barang</th>
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                               
                              <tr v-for="project in projects" :key="project.id">
                                  <td>{{project.name}}</td>
                                  <td>{{project.stock}}</td>
                                  <td>{{project.sold}}</td>
                                  <td>{{project.dates}}</td>
                                  <td>{{project.type_name}}</td>
                                  <td>
                                      <router-link :to="`/show/${project.id}`" class="btn btn-outline-info mx-1">Show</router-link>
                                      <router-link :to="`/edit/${project.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
                                      <button 
                                          @click="handleDelete(project.id)"
                                          className="btn btn-outline-danger mx-1">
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                                   
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </layout-div>
  </template>
   
  <script>
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv';
  import Swal from 'sweetalert2'
   
  export default {
    name: 'ProjectList',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        projects:[],
        searchTerm: '',
        sortKey: null,
        sortDateKey: null,
        sortOrder: 1,
        sortOrderDate: 1,
      };
    },
    mounted() {
      this.fetchProjectList();
    },
    methods: {
      async fetchProjectList() {
        console.log(this.searchTerm)
        await axios.get('/api/transactions', {
            params: {
                name_sort: this.sortKey,
                date_sort: this.sortDateKey,
                str: this.searchTerm,
          },
        })
          .then(response => {
              this.projects = response.data.data;
              return response
          })
          .catch(error => {
            return error
          });
      },
      sortName(key) {
        if (this.sortKey === key) {
            this.sortKey = 'desc';
            this.sortOrder *= -1;
        } else {
            this.sortKey = 'asc';
            this.sortOrder = 1;
        }

        this.fetchProjectList(); // Fetch data with updated sort parameters
      },
      sortDate(key) {
        if (this.sortDateKey === key) {
            this.sortDateKey = 'desc';
            this.sortOrderDate *= -1;
        } else {
            this.sortDateKey = 'asc';
            this.sortOrderDate = 1;
        }

        this.fetchProjectList(); // Fetch data with updated sort parameters
      },
      search() {
        this.fetchProjectList();
      },
      handleDelete(id){
          Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                  axios.delete(`/api/transactions/${id}`)
                  .then( response => {
                      Swal.fire({
                          icon: 'success',
                          title: 'Project deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      this.fetchProjectList();
                      return response
                  })
                  .catch(error => {
                      Swal.fire({
                           icon: 'error',
                          title: 'An Error Occured!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      return error
                  });
              }
            })
      }
    },
  };
  </script>