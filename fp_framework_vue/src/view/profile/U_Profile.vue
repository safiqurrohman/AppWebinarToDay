<template>
  <div>
    <div class="container">
      <div class="main-body">

        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="main-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item"><router-link to="/profile-user">User</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">User</li>
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
                            <h4>{{ user.username }}</h4>
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
                              <h6 class="mb-0">Username</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              {{ user.username }}
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              {{ user.email }}
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <h6 class="mb-0">Phone</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                              {{ user.noTelp }}
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-12">
                              <button @click.prevent="updateUser" class="btn btn-info">Edit</button>
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
                        <h6 class="d-flex align-items-center mb-3">Webinar yang Anda Ikuti :</h6>
                      </div>
                      <div class="col-sm text-end">
                        <!-- <router-link to="/addWebinar" class="btn btn-success">Tambah Webinar</router-link> -->
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

          
          <!-- like -->
          <div class="row gutters-sm">

            <div class="col mb-3">
              <div class="card h-100">
                <div class="card-body">

                  <div class="row">
                    <hr>
                    <div class="col-sm"> 
                      <h6 class="d-flex align-items-center mb-3">Webinar yang Anda Sukai : :</h6>
                    </div>
                    <div class="col-sm text-end">
                      <!-- <router-link to="/addWebinar" class="btn btn-success">Tambah Webinar</router-link> -->
                    </div>
                  </div>
                  <hr>
                
                  <div class="webinar-list">
                        <article v-for="webinar in displayedlikedWebinars" :key="webinar.webinar_id" class="card custom-card">
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
                <nav v-if="totalPagesLike > 1">
                  <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPageLike === 1 }">
                      <a class="page-link" href="#" @click.prevent="prevPageLike">&laquo;</a>
                    </li>
                    <li class="page-item" v-for="page in totalPagesLike" :key="page" :class="{ active: page === currentPageLike }">
                      <a class="page-link" href="#" @click.prevent="gotoPageLike(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPageLike === totalPagesLike }">
                      <a class="page-link" href="#" @click.prevent="nextPageLike">&raquo;</a>
                    </li>
                  </ul>
                </nav>
              
              </div>

            </div>

          </div>


                <!-- <div class="col mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    
                    <div class="row">
                      <hr>
                      <div class="col-sm"> 
                        <h6 class="d-flex align-items-center mb-3">Webinar yang Anda Sukai :</h6>
                      </div>
                      <div class="col-sm text-end">
                        <router-link to="/addWebinar" class="btn btn-success">Tambah Webinar</router-link>
                      </div>
                    </div>
                </div>
                </div>
                </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import MessageOverlay from '@/components/MessageOverlay.vue';
  import webinar_page from '@/view/webinar/webinar_page.vue';

  export default {
    components: {
      MessageOverlay,
      webinar_page,
    },
    data() {
      return {
        loginUserData: [],
        // displayedWebinars: [],
        webinarList: [],
        likedWebinars: [],
        user: {},
        itemsPerPage: 6,
        itemsPerPageLike: 6,
        currentPage: 1,
        currentPageLike: 1,
        status: null,
        message: '',
      };
    },
    created() {
      // Panggil metode untuk mengambil data pengguna
      this.fetchUserLoginData();
    },
    computed: {
      totalPages() {
        return Math.ceil(this.webinarList.length / this.itemsPerPage);
      },
      totalPagesLike() {
        return Math.ceil(this.likedWebinars.length / this.itemsPerPageLike);
      },
      displayedWebinars() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.webinarList.slice(startIndex, endIndex);
      },
      displayedlikedWebinars() {
        const startIndex = (this.currentPageLike - 1) * this.itemsPerPageLike;
        const endIndex = startIndex + this.itemsPerPageLike;
        return this.likedWebinars.slice(startIndex, endIndex);
      },
    },

    watch: {
      loginUserData: {
        immediate: true, // Triggers the handler immediately after component creation
          handler(newValue, oldValue) {
          if (newValue !== null) {
            this.fetchUserData(newValue);
          } else {
            console.log("loginUserData is null");
          }
        },
      },
    },

    methods: {
      async fetchUserLoginData() {
        try {
          const response = await axios.get('profileUser', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          console.log(response);
          console.log(response.data.loginUserData);
          if(response.data.loginUserData){
              this.loginUserData = response.data.loginUserData.user_id;
              console.log(this.loginUserData);
              
          } else {
              console.error('loginUserData is undefined in response:', response);
          }

          this.message = response.data.message;
        } catch (error) {
          this.$router.push('/loginuser');
          console.error('Failed to fetch protected data:', error.response.data.error);
        }
      },

      // Ensure to pass the correct user_id to fetch liked webinars
      async fetchUserLikedWebinars(user_id) {
        try {
          const response = await axios.get(`/liked-webinars/${user_id}`);
          console.log(response.data);
        
          if (response.data.status === 'success') {
            this.likedWebinars = response.data.payload;
          }
        
          this.message = response.data.message;
        } catch (error) {
          console.error('Failed to fetch user liked webinars:', error);
        }
      },
    
      // Update your like and unlike methods as follows:
    
      async like(webinar_id) {
        try {
          // Check if this.user is defined
          if (!this.user || !this.user.liked_webinars) {
            console.error('User data is undefined or missing liked_webinars array.');
            return;
          }
        
          // Cek apakah webinar_id sudah ada di dalam daftar yang disukai oleh user
          const isLiked = this.likedWebinars.some(webinar => webinar.webinar_id === webinar_id);
        
          if (isLiked) {
            // Jika sudah disukai, lakukan request untuk menghapus dari daftar liked_webinars
            await this.unlikeWebinar(webinar_id);
          } else {
            // Jika belum disukai, lakukan request untuk menambahkan ke dalam daftar liked_webinars
            await this.likeWebinar(webinar_id);
          }
        } catch (error) {
          console.error('Error handling like:', error);
          // Handle error accordingly
        }
      },
    
      async likeWebinar(webinar_id) {
        try {
          const response = await axios.post(`/like-webinar/${this.loginUserData}/${webinar_id}`);
        
          if (response.data.status === 'success') {
            this.user.liked_webinars.push(webinar_id);
          }
        
          this.status = response.data.status;
          this.message = response.data.message;
        } catch (error) {
          console.error('Error liking webinar:', error);
        }
      },
    
      async unlikeWebinar(webinar_id) {
        try {
          const response = await axios.delete(`/unlike-webinar/${this.loginUserData}/${webinar_id}`);
        
          if (response.data.status === 'success') {
            const index = this.user.liked_webinars.indexOf(webinar_id);
            if (index !== -1) {
              this.user.liked_webinars.splice(index, 1);
            }
          }
        
          this.status = response.data.status;
          this.message = response.data.message;
        } catch (error) {
          console.error('Error unliking webinar:', error);
        }
      },

      
      async fetchUserData(user_id) {
        try {

          // Make a request to fetch organisasi data
          const userResponse = await axios.get(`http://localhost:8000/user/${user_id}`);
          console.log('User API Response:', userResponse.data);

          if (userResponse.data && userResponse.data.payload) {
            this.user = userResponse.data.payload;

            // Initialize liked_webinars array if it's not present
            if (!this.user.liked_webinars) {
              this.user.liked_webinars = [];
            }
            
            // Make another request to fetch webinars based on organisasi_id
            const webinarsResponse = await axios.get(`http://localhost:8000/webinars-list-user/${user_id}`);
            console.log('Webinars API Response:', webinarsResponse.data);

            if (webinarsResponse.data && webinarsResponse.data.payload) {
              this.webinarList = webinarsResponse.data.payload;
            };
            // Fetch liked webinars based on user_id
            this.fetchUserLikedWebinars(user_id);
          }
        } catch (error) {
          console.error('Error fetching data', error.response.data);
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

      formatWebinarDate(dateTimeString) {
        // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        const formattedDate = new Date(dateTimeString).toLocaleString(undefined, options);
        return formattedDate;
      },

      updateUser() {
          // Fetch login data before navigating
          this.fetchUserLoginData().then(() => {
          // Navigate to AddWebinar with logindata
          this.$router.push(`/edituser/${this.loginUserData}`);
          });
      },

      // Metode lain untuk navigasi halaman
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

      // Metode lain untuk navigasi halaman like
      prevPageLike() {
        if (this.currentPageLike > 1) {
          this.currentPageLike--;
        }
      },
      nextPageLike() {
        if (this.currentPageLike < this.totalPagesLike) {
          this.currentPageLike++;
        }
      },
      gotoPageLike(page) {
        if (page >= 1 && page <= this.totalPagesLike) {
          this.currentPageLike = page;
        }
      },

    },
  };
</script>


<style scoped>
@import "@/assets/css/P_Profile.css";
</style>