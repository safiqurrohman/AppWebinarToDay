<template>
  <div class="container">
    <div class="main-body">

        <div class="row gutters-sm">
          <h2>
            Webinar
          </h2>
          <div class="col mb-3 mt-3">
            <div class="card">
              <i class="fas fa-table me-1"></i>
              Edit Data Webinar
              <div class="card-body">
              <form @submit.prevent="editWebinar($route.params.webinar_id, $route.params.organisasi_id)">
                <table class="table table-striped">
                  <tr>
                    <th>Nama Webinar </th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.namaWebinar" type="text" class="input-group mb-3 form-control" required></td>
                  </tr>
                  <tr>
                    <th>host </th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.host" type="text" class="input-group mb-3 form-control" required></td>
                  </tr>
                  <tr>
                    <th>Online </th>
                  </tr>
                  <tr>
                    <td>
                      <select v-model="formData.Online" class="form-select form-select-sm" aria-label="Small select example" required>
                        <option value="n">Tidak</option>
                        <option value="y">Ya</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Waktu </th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.waktu" type="date" class="input-group mb-3 form-control" required></td>
                  </tr>
                  <tr>
                    <th>lokasi </th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.lokasi" type="text" class="input-group mb-3 form-control" required></td>
                  </tr>
                  <tr>
                    <th>Harga </th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.harga" type="text" class="input-group mb-3 form-control" required></td>
                  </tr>
                  <tr>
                    <th>cp </th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.cp" type="text" class="input-group mb-3 form-control" required></td>
                  </tr>
                  <tr>
                    <th>sertif </th>
                  </tr>
                  <tr>
                    <td>
                      <select v-model="formData.sertif" class="form-select form-select-sm" aria-label="Small select example" required>
                        <option value="n">Tidak</option>
                        <option value="y">Ya</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Upload Image Webinar </th>
                  </tr>
                  <tr>
                    <td><input type="file" @change="handleFileChange" class="input-group mb-3" accept="image/*" required></td>
                  </tr>
                  <tr>
                    <th>Deskripsi </th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.deskripsi" type="text" class="input-group mb-3 form-control" required></td>
                  </tr>
                  <tr>
                    <th>
                      <input type="submit" class="btn btn-success" value="SIMPAN"> 
                      &nbsp;&nbsp;&nbsp;
                      <router-link to="/profile-penyelenggara" class="btn btn-primary">Kembali</router-link>
                    </th>

                  </tr>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>

    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: [],
      };
    },

    created() {
      const organisasi_id = this.$route.params.organisasi_id;

      console.log('Organisasi ID edit:', organisasi_id);

      console.log('webinarid: ', this.$route.params.webinar_id);
      this.ambilDataWebinar(this.$route.params.webinar_id);
    },

    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          // Log the result to check if it's correct
          console.log('Image data:', reader.result);

          // Set the formData.img to the uploaded image data
          this.formData.img = reader.result;
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      },

      async ambilDataWebinar(webinar_id)
      {
        try {
          const response = await axios.get(`/webinar/${webinar_id}`);
          console.log(response.data);

          if(response.data.payload)
          {
            this.formData = response.data.payload[0];
            console.log("hai",this.formData);
          }
        } catch (error)
        {
          console.error('Error fetching data', error);
        }
      },
  
      async editWebinar(webinar_id, organisasi_id) {
      const apiUrl = `updateWebinar/${webinar_id}/${organisasi_id}`;

      const formData = new FormData();
      formData.append('img', this.dataURItoBlob(this.formData.img), 'webinar-image.jpg');
      formData.append('namaWebinar', this.formData.namaWebinar);
      formData.append('Online', this.formData.Online);
      formData.append('sertif', this.formData.sertif);
      formData.append('harga', this.formData.harga);
      formData.append('deskripsi', this.formData.deskripsi);
      formData.append('waktu', this.formData.waktu);
      formData.append('lokasi', this.formData.lokasi);
      formData.append('cp', this.formData.cp);
      formData.append('host', this.formData.host);

      console.log('FormData:', formData);

      // const updatedData = {
      //     namaWebinar: this.formData.namaWebinar,
      //     Online: this.formData.Online,
      //     sertif: this.formData.sertif,
      //     harga: this.formData.harga,
      //     deskripsi: this.formData.deskripsi,
      //     waktu: this.formData.waktu,
      //     lokasi: this.formData.lokasi,
      //     cp: this.formData.cp,
      //     host: this.formData.host,
      //     img: this.dataURItoBlob(this.formData.img)
      // };

      console.log('updateData:', formData);

      try {
        const response = await axios.put(apiUrl, formData);

        console.log('Webinar update successful:', response.data);

        // Handle success, update state, or perform other actions
        alert(response.data.message);
        this.$router.push(`/dashboard`);

      } catch (error) {
        console.error('Error updating webinar:', error);

        // Handle error
      }
    },
  
      // Convert data URI to Blob
      dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' }); // Adjust the type based on your image format
      },
    },
  };
  </script>
  
  <style>
  /* Tambahkan gaya sesuai kebutuhan */
  @import "@/assets/css/P_Profile.css";
  
  </style>
  