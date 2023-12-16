<template>
    <layout-div>
      <h2 class="text-center mt-5 mb-3">Create New Project</h2>
      <div class="card">
          <div class="card-header">
              <router-link 
                  class="btn btn-outline-info float-right"
                  to="/">View All Projects
              </router-link>
          </div>
          <div class="card-body">
              <form>
                 <div class="form-group">
                         <label htmlFor="name">Name</label>
                         <select v-model="selectedOptionItem" class="form-control">
                            <option v-for="item in items" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                        </select>
                  </div>
                  <div class="form-group">
                      <label htmlFor="stock">Stock</label>
                      <input 
                          v-model="project.stock"
                          type="text"
                          class="form-control"
                          id="stock"
                          name="stock"/>
                  </div>
                  <div class="form-group">
                      <label htmlFor="sold">Terjual</label>
                      <input 
                          v-model="project.sold"
                          type="text"
                          class="form-control"
                          id="sold"
                          name="sold"/>
                  </div>
                  <div class="form-group">
                      <label htmlFor="dates">Tanggal</label>
                      <input 
                          v-model="project.dates"
                          type="date"
                          class="form-control"
                          id="dates"
                          name="dates"/>
                  </div>
                  <button 
                      @click="handleSave()"
                      :disabled="isSaving"
                      type="button"
                      class="btn btn-outline-primary mt-3">
                      Save Project
                  </button>
              </form>
          </div>
      </div>
    </layout-div>
  </template>
   
  <script>
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv';
  import Swal from 'sweetalert2'
   
  export default {
    name: 'ProjectCreate',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        project: {
          id: '',
          items_id: '',
          stock: '',
          dates: '',
        },
        items: [],
        selectedOptionItem: null,
        isSaving:false,
      };
    },
    mounted() {
      this.fetchItemList();
    },
    methods: {
      handleSave() {
          this.isSaving = true
          this.project.items_id = this.selectedOptionItem
          axios.post('/api/transactions', this.project)
            .then(response => {
              Swal.fire({
                  icon: 'success',
                  title: 'Project saved successfully!',
                  showConfirmButton: false,
                  timer: 1500
              })
              this.isSaving = false
              return response
            })
            .catch(error => {
              this.isSaving = false
              Swal.fire({
                  icon: 'error',
                  title: 'An Error Occured!',
                  showConfirmButton: false,
                  timer: 1500
              })
              return error
            });
      },
      async fetchItemList() {
        await axios.get('/api/items')
          .then(response => {
              this.items = response.data.data;
              return response
          })
          .catch(error => {
            return error
          });
      },
    },
  };
  </script>