<template>
  <div class="daftar">
    <section class="vh-100" style="background-color: #00428a;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form @submit.prevent="daftar($route.params.user_id, $route.params.webinar_id)">
                  <div class="form-outline mb-2">
                    <label class="form-label" for="form2Example17">Nama Lengkap</label>
                    <input v-model="NamaLengkap" type="name" id="form2Example17" class="form-control form-control-lg" placeholder="Nama Lengkap"/>
                    
                  </div>

                  <!-- <div class="form-outline mb-2">
                    <label class="form-label" for="form2Example27">Email</label>
                    <input type="email" id="form2Example27" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-2">
                    <label class="form-label" for="form2Example27">Alamat</label>
                    <input type="Address" id="form2Example27" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-2">
                    <label class="form-label" for="form2Example27">Nomor Handphone</label>
                    <input type="HP" id="form2Example27" class="form-control form-control-lg" />
                  </div> -->

                  <div class="pt-1 mb-4">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Daftar</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        NamaLengkap: '',
        judul: 'Daftar User',
      };
    },
    methods: {
      async daftar(user_id, webinar_id) {
        try {
          const response = await axios.post(`/daftarWebinar/${user_id}/${webinar_id}`, {
            NamaLengkap: this.NamaLengkap,
          });
          console.log('Server Response:', response.data);
          this.$router.push(`/profile-user`);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
    },
  };
</script>
