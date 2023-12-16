<template>
    <layout-div>
      <h2 class="text-center mt-5 mb-3">Tambah Jenis Barang</h2>
      <div class="card">
          <div class="card-header">
              <router-link 
                  class="btn btn-outline-info float-right"
                  to="/item-types">Tabel Jenis Barang
              </router-link>
          </div>
          <div class="card-body">
              <form>
                  <div class="form-group">
                      <label htmlFor="type_name">Nama Jenis Barang</label>
                      <input 
                          v-model="project.type_name"
                          type="text"
                          class="form-control"
                          id="type_name"
                          name="type_name"/>
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
    name: 'ItemTypeCreate',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        project: {
          type_name: '',
        },
        isSaving:false,
      };
    },
    methods: {
      handleSave() {
          this.isSaving = true
          axios.post('/api/item_type', this.project)
            .then(response => {
              Swal.fire({
                  icon: 'success',
                  title: 'Project saved successfully!',
                  showConfirmButton: false,
                  timer: 1500
              })
              this.isSaving = false
              this.project.type_name = ""
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
    },
  };
  </script>