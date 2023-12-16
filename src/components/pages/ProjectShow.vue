<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Show Project</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/">View All Projects
                 </router-link>
             </div>
             <div class="card-body">
                 <b className="text-muted">Name:</b>
                 <p>{{project.name}}</p>
                 <b className="text-muted">Stock:</b>
                 <p>{{project.stock}}</p>
                 <b className="text-muted">Jumlah Terjual:</b>
                 <p>{{project.sold}}</p>
                 <b className="text-muted">Tanggal Transaksi:</b>
                 <p>{{project.dates}}</p>
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
   name: 'ProjectShow',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       project: {
         name: '',
         description: '',
       },
       isSaving:false,
     };
   },
   created() {
     const id = this.$route.params.id;
     axios.get(`/api/transactions/${id}`)
     .then(response => {
         let projectInfo = response.data.data
         this.project.name = projectInfo.name
         this.project.stock = projectInfo.stock
         this.project.sold = projectInfo.sold
         this.project.dates = projectInfo.dates
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