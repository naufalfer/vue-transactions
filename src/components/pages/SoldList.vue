<template>
    <layout-div>
          <div class="container">
              <h2 class="text-center mt-5 mb-3">Transaksi Terjual</h2>
              <div class="card">
                  <div class="card-header">
                      <router-link to="/"
                          class="btn btn-outline-primary"
                          > Tabel Transaksi
                      </router-link>
                  </div>
                  <div class="card-body">
                    
                    <div class="d-flex justify-content-center">
                        <label for="startDate">Start Date:</label>
                        <input type="date" v-model="startDate" @change="filterData" class="ms-3 mb-3">

                        <label for="endDate" class="ms-3">End Date:</label>
                        <input type="date" v-model="endDate" @change="filterData" class="ms-3 mb-3">
                    </div>
                    
                      <table class="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Jenis Barang</th>
                                  <th>Total Terjual</th>
                              </tr>
                          </thead>
                          <tbody>
                               
                              <tr v-for="project in projects" :key="project.id">
                                  <td>{{project.type_name}}</td>
                                  <td>{{project.total_terjual}}</td>
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
   
  export default {
    name: 'TransactionSoldList',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        projects:[],
        filteredData:[],
        startDate: '',
        endDate: '',
      };
    },
    mounted() {
      this.fetchProjectList();
    },
    methods: {
      fetchProjectList() {
        axios.get('/api/transactions-sold', {
            params: {
            from: this.startDate,
            to: this.endDate,
            }
          })
          .then(response => {
              this.projects = response.data.data;
              this.filterData();
          })
          .catch(error => {
            return error
          });
      },
      filterData() {
        this.fetchProjectList();
      },
    },
  };
  </script>