<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Show</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/item-types">Tabel Jenis Barang
                 </router-link>
             </div>
             <div class="card-body">
                 <b className="text-muted">Name:</b>
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
   name: 'ItemTypeShow',
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
   created() {
     const id = this.$route.params.id;
     axios.get(`/api/item_type/${id}`)
     .then(response => {
         let projectInfo = response.data.data
         this.project.type_name = projectInfo.type_name
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