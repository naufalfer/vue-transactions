<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Edit Transaksi</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/">Tabel Transaksi
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
                         <label htmlFor="sold">Jumlah Terjual</label>
                         <input 
                             v-model="project.sold"
                             type="text"
                             class="form-control"
                             id="sold"
                             name="sold"/>
                     </div>
                     <div class="form-group">
                         <label htmlFor="dates">Tanggal Transaksi</label>
                         <input 
                             v-model="project.dates"
                             type="date"
                             class="form-control"
                             id="dates"
                             name="dates"/>
                     </div>
                     <div class="form-group">
                         <label htmlFor="type_name">Jenis Barang</label>
                         <select v-model="selectedOption" class="form-control">
                            <option v-for="item_type in item_types" :key="item_type.id" :value="item_type.id" disabled>
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
   name: 'ProjectEdit',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       project: {
         name: '',
         stock: '',
         sold: '',
         dates: '',
         type_name: '',
         items_id: '',
       },
       selectedOption: null,
       selectedOptionItem: null,
       item_types: [],
       items: [],
       isSaving:false,
     };
   },
   mounted() {
    this.fetchDataItem();
    this.fetchItemTypeList();
    this.fetchItemList();
   },
   methods: {
    async fetchDataItem() {
      const id = this.$route.params.id;
      axios.get(`/api/transactions/${id}`)
      .then(response => {
          let projectInfo = response.data.data
          this.project.name = projectInfo.name
          this.project.stock = projectInfo.stock
          this.project.sold = projectInfo.sold
          this.project.dates = projectInfo.dates
          this.project.type_name = projectInfo.type_name
          this.project.items_id = projectInfo.items_id
          this.selectedOptionItem = projectInfo.items_id
          this.selectedOption = projectInfo.types_id
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
     handleSave() {
         this.isSaving = true
         const id = this.$route.params.id;
          this.project.items_id = this.selectedOptionItem
         axios.put(`/api/transactions/${id}`, this.project)
           .then(response => {
             Swal.fire({
                 icon: 'success',
                 title: 'Transactions updated successfully!',
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