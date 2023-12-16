<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Edit Item</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/items">Tabel Barang
                 </router-link>
             </div>
             <div class="card-body">
                 <form>
                     <div class="form-group">
                         <label htmlFor="type_name">Nama</label>
                         <input 
                             v-model="project.name"
                             type="text"
                             class="form-control"
                             id="name"
                             name="name"/>
                     </div>
                     <div class="form-group">
                         <label htmlFor="type_name">Jenis Barang</label>
                         <select v-model="selectedOption" class="form-control">
                            <option v-for="item_type in item_types" :key="item_type.id" :value="item_type.id">
                            {{ item_type.type_name }}
                        </option>
                        </select>
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
   name: 'ItemEdit',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       project: {
        name: '',
        type_name: '',
        types_id: ''
       },
       item_types: [],
       selectedOption: null,
       isSaving:false,
     };
   },
   mounted() {
        this.fetchDataItem();
        this.fetchItemTypeList();
    },
   methods: {
    async fetchDataItem() {
        const id = this.$route.params.id;
        await axios.get(`/api/items/${id}`)
        .then(response => {
            let projectInfo = response.data.data
            let projectType = response.data.data.item_type
            this.project.name = projectInfo.name
            this.project.type_name = projectType.type_name
            this.selectedOption = projectType.id
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
        })
    },
     async handleSave() {
         this.isSaving = true
         const id = this.$route.params.id;
         this.project.types_id = this.selectedOption;
         await axios.put(`/api/items/${id}`, this.project)
           .then(response => {
             Swal.fire({
                 icon: 'success',
                 title: 'Item updated successfully!',
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
     async fetchItemTypeList() {
        await axios.get('/api/item_type')
          .then(response => {
              this.item_types = response.data.data;

              return response
          })
          .catch(error => {
            return error
          });
      },
   },
 };
 </script>