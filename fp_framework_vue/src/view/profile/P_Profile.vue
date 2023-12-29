<template>
  <div>
    <div class="container">
      <div class="main-body">

        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="main-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item"><router-link to="/profile-penyelenggara">Penyelenggara</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Penyelenggara Profile</li>
          </ol>
        </nav>
        
        <!-- /Breadcrumb -->

        <div class="row gutters-sm">
          <message-overlay :status="status" :message="message" ref="messageOverlay"></message-overlay>
            <div class="col mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <!-- foto profile -->
                    <div class="col-sm-4">
                    <div class="card h-100">
                      <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                          <div class="mt-3">
                            <h4>{{ organisasi.namaOrganisasi }}</h4>
                            <!-- <p class="text-secondary mb-1">Full Stack Developer</p>
                            <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> -->
                            <button @click.prevent="logout" class="btn btn-outline-danger mt-3">log out</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    <!-- Profile -->
                    <div class="col-sm-8">
                    <div class="card h-100 ">
                      <div class="card-body">
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Penyelenggara</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              {{ organisasi.namaOrganisasi }}
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              {{ organisasi.email }}
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Phone</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              {{ organisasi.noTelp }}
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                            </div>
                            <div class="col-sm-9">
                              <span class="text-secondary">{{ organisasi.website }}</span>
                            </div>
                          </div>
                          <!-- <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                            </div>
                            <div class="col-sm-9">
                              <span class="text-secondary"></span>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                            </div>
                            <div class="col-sm-9">
                              <span class="text-secondary"></span>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                            </div>
                            <div class="col-sm-9">
                              <span class="text-secondary"></span>
                            </div>
                          </div> -->
                          <hr>
                          <div class="row">
                            <div class="col-sm-12">
                              <button @click.prevent="updatePenyelenggara" class="btn btn-info">Edit</button>
                            </div>
                          </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <!-- skill -->
          <div class="row gutters-sm">

              <div class="col mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    
                    <div class="row">
                      <hr>
                      <div class="col-sm"> 
                        <h6 class="d-flex align-items-center mb-3">List Webinar:</h6>
                      </div>
                      <div class="col-sm text-end">
                        <button @click.prevent="navigateToAddWebinar" class="btn btn-success">Tambah Webinar</button>
                      </div>
                    </div>
                    <hr>

                    <div class="webinar-list">
                            <article v-for="webinar in displayedWebinars" :key="webinar.id" class="card custom-card">
                              <figure class="card-image">
                                <img :src="getImageUrl(webinar.img)" alt="Webinar Image" />
                              </figure>
                              <div class="card-header">
                                <router-link :to="'/page/' + webinar.webinar_id">{{ webinar.namaWebinar }}</router-link>
                                <button class="icon-button" @click="like(webinar.webinar_id)">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" display="block" id="Heart">
                                    <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                                  </svg>
                                </button>
                              </div>
                              <div class="card-footer">
                                <div class="card-meta card-meta--views">
                                  
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" display="block" id="EyeOpen">
                                    <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  {{ webinar.views }}
                                </div>
                                <hr>
                                <div class="card-meta card-meta--date">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" display="block" id="Calendar">
                                    <rect x="2" y="4" width="20" height="18" rx="4" />
                                    <path d="M8 2v4" />
                                    <path d="M16 2v4" />
                                    <path d="M2 10h20" />
                                  </svg>
                                  {{ formatWebinarDate(webinar.waktu) }}
                                </div>
                              </div>
                            </article>
                    </div>
                  </div>

                  <!-- Pagination controls -->
                  <nav v-if="totalPages > 1">
                    <ul class="pagination">
                      <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="prevPage">&laquo;</a>
                      </li>
                      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                        <a class="page-link" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
                      </li>
                      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="nextPage">&raquo;</a>
                      </li>
                    </ul>
                  </nav>

                </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import MessageOverlay from '@/components/MessageOverlay.vue'; // Adjust the path
  import webinar_page from '@/view/webinar/webinar_page.vue';

  export default {
    components: {
      MessageOverlay,
      webinar_page,
    },
    data() {
      return {
        logindata: [],
        webinarList: [], // Change to an array to store multiple webinars
        organisasi: {},
        itemsPerPage: 6,
        currentPage: 1,
        status: null, // Tambahkan status
        message: '', // Tambahkan pesan
      };
    },
    created() {
      // Make an Axios request to fetch organisasi data and associated webinars
      this.fetchLoginData();
    },
    computed: {
      // Calculate total pages based on the number of webinars and items per page
      totalPages() {
        return Math.ceil(this.webinarList.length / this.itemsPerPage);
      },
      // Calculate the array of webinars to display on the current page
      displayedWebinars() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.webinarList.slice(startIndex, endIndex);
      },
    },
    watch: {
      logindata: {
        immediate: true, // Triggers the handler immediately after component creation
        handler(newValue, oldValue) {
          if (newValue) {
              this.fetchOrganisasiData(newValue);
          } else {
            console.log("logindata is undefined");
          }
        },
      },
    },
    methods: {
      async fetchLoginData()
      {
        try {
        const response = await axios.get('protected', {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          console.log(response);
          console.log(response.data.logindata);
          if(response.data.logindata){
              this.logindata = response.data.logindata.organisasi_id;
              console.log(this.logindata);
              
          } else {
              console.error('logindata is undefined in response:', response);
          }

          this.message = response.data.message;
        } catch (error) {
          this.$router.push('/login');
          console.error('Failed to fetch protected data:', error.response.data.error);
        }
      },

      getImageUrl(blobData) {
        console.log('Blob Data:', blobData);

        // Check if blobData is an object with a data property
        if (blobData && blobData.data) {
          // Extract actual data from Proxy
          const bufferData = blobData.data || [];
        
          // Convert Buffer data to Uint8Array
          const uint8Array = new Uint8Array(bufferData);
        
          if (uint8Array.length > 0) {
            const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Adjust the type based on your image format
            return URL.createObjectURL(blob);
          }
        }
      
        return ''; // or set a default image URL
      },

      navigateToAddWebinar() {
          // Fetch login data before navigating
          this.fetchLoginData().then(() => {
          // Navigate to AddWebinar with logindata
          this.$router.push(`/addwebinar/${this.logindata}`);
          });
      },

      updatePenyelenggara() {
          // Fetch login data before navigating
          this.fetchLoginData().then(() => {
          // Navigate to AddWebinar with logindata
          this.$router.push(`/updatePenyelenggara/${this.logindata}`);
          });
      },

      async submitForm() {
        try {
          const response = await axios.post(apiUrl, this.formData);

          // Set status and message for the overlay
          this.status = 'success';
          this.message = 'Webinar berhasil ditambahkan!';

          // Show the overlay
          this.$refs.messageOverlay.showOverlay();

          // Clear the status and message after 5 seconds
          this.clearStatusAndMessage();

          // Perbarui data webinar setelah menambahkan
          this.fetchOrganisasiData();

          console.log('Form submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);

          // Set status and message for the overlay
          this.status = 'error';
          this.message = 'Gagal menambahkan webinar. Silakan coba lagi.';

          // Show the overlay with error message
          this.$refs.messageOverlay.showOverlay();

          // Clear the status and message after 5 seconds
          this.clearStatusAndMessage();

          console.error('Form submission failed!');
        }
      },

      clearStatusAndMessage() {
        setTimeout(() => {
          this.status = null;
          this.message = '';
        }, 5000);
      },

      formatWebinarDate(dateTimeString) {
        // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        const formattedDate = new Date(dateTimeString).toLocaleString(undefined, options);
        return formattedDate;
      },
      async fetchOrganisasiData(organisasi_id) {
        try {

          // Make a request to fetch organisasi data
          const organisasiResponse = await axios.get(`http://localhost:8000/penyelenggara/${organisasi_id}`);
          console.log('Organisasi API Response:', organisasiResponse.data);

          // Check if the response has the expected structure
          if (organisasiResponse.data && organisasiResponse.data.payload) {
            this.organisasi = organisasiResponse.data.payload;

            // Make another request to fetch webinars based on organisasi_id
            const webinarsResponse = await axios.get(`http://localhost:8000/webinars-list-penyelenggara/${organisasi_id}`);
            console.log('Webinars API Response:', webinarsResponse.data);

            // Check if the response has the expected structure
            if (webinarsResponse.data && webinarsResponse.data.payload) {
              this.webinarList = webinarsResponse.data.payload;
            }
          }
        } catch (error) {
          console.error('Error fetching data', error);
        }
      },

      async logout() {
          try {
              localStorage.removeItem('token');
              console.log('succesfully logged out');
              this.$router.push('/');
          } catch (error) {
              console.error('Error logging out:', error);
          }
      },

      // Other methods for pagination
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      gotoPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      // Other methods for liking, editing, etc.
    },
  };
</script>

<style scoped>
@import "@/assets/css/P_Profile.css";
</style>