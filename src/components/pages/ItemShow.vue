<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Show</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/items">Tabel Barang
                 </router-link>
             </div>
             <div class="card-body">
                 <b className="text-muted">Nama:</b>
                 <p>{{project.name}}</p>
                 <b className="text-muted">Jenis Barang:</b>
                 <p>{{project.type_name}}</p>
             </div>
         </div>
    </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'ItemShow',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       project: {
        name: '',
        type_name: ''
       },
       isSaving:false,
     };
   },
   created() {
     const id = this.$route.params.id;
     axios.get(`/api/items/${id}`)
     .then(response => {
         let projectInfo = response.data.data
         let projectType = response.data.data.item_type
         this.project.name = projectInfo.name
         this.project.type_name = projectType.type_name
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
   methods: {
      
   },
 };
 </script>