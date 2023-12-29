<template>
  <br><br><br><br>
  <div class="container">
    <!-- ***** Banner Start ***** -->
    <div class="row">
      <div class="col-lg-12">
        <div class="main-profile" v-for="(webinar, index) in this.webinars" :key="index">
          <div class="row" >
            <div class="col-lg-4 custom-image">
              <img :src="getImageUrl(webinar.img)" alt="Webinar Image" style="border-radius: 23px;">
            </div>
            <div class="col-lg-4 align-self-center">
              <div class="main-info header-text">
                <span>Gratis</span>
                <h4>{{ webinar.namaWebinar }}</h4>
                <p>{{ webinar.deskripsi }}</p>
                <div class="main-border-button">
                  <a href="#" @click="navigateToDaftarWebinar(webinar)" class="btn btn-success editbtn">Daftar Sekarang!</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 align-self-center">
              <ul>
                <li>Harga <span>{{ webinar.harga }}</span></li>
                <li>Host <span>{{ webinar.host }}</span></li>
                <li>Waktu <span>{{ formatWebinarDate(webinar.waktu) }}</span></li>
                <li>Contact Person <span>{{ webinar.cp }}</span></li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="clips">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="heading-section mb-3">
                      <h4><em>Deskripsi</em> Lengkap</h4>
                      <p>{{ webinar.deskripsi }}</p>
                    </div>
                  </div>
                  <!-- ... (lanjutkan dengan item klip) ... -->
                </div>
                <div class="col-lg-12">
                  <div class="main-button">
                    <router-link to="#">Cari tahu lebih lanjut</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ***** Banner End ***** -->

    <!-- ***** Gaming Library Start ***** -->
    <div class="gaming-library profile-library">
      <div class="col-lg-12">
        <div class="heading-section">
          <h4><em>Rekomendasi</em> Webinar lain</h4>
        </div>

        <!-- Game Item 1 -->
        <div class="webinar-list">
                <article v-for="webinar in displayedWebinars" :key="webinar.webinar_id" class="card custom-card mb-3">
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
                  <RouterLink :to="{ path: '/page/' + webinar.webinar_id }" @click.stop>
                    <button class="w-100 btn btn-primary more" @click="incrementViews(webinar.webinar_id)">Baca Selengkapnya</button>
                  </RouterLink>
                </article>
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
    <!-- ***** Gaming Library End ***** -->

    <!-- Contact Section -->
    <section id="contact">
      <div class="container-fluid">
        <!-- ... (bagian kontak) ... -->
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'webinars',
  data() {
    return {
      loginUserData: [],
      likedWebinars: [],
      webinars: [],
      webinarList: [],
      itemsPerPage: 6,
      currentPage: 1,
    }
  },
  mounted(){
    this.getWebinars(this.$route.params.id);
    console.log('mounted');

    axios.get('/webinar-list').then((res) => {
      this.webinarList = res.data.payload;
    });
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
          // Fetch liked webinars based on user_id
          this.fetchUserLikedWebinars(user_id);
        }
      } catch (error) {
        console.error('Error fetching data', error.response.data);
      }
    },

    async initializeData() {
      await this.fetchUserLoginData();

      if (this.loginUserData) {
        await this.fetchUserData(this.loginUserData);
        
      }
    },

    navigateToDaftarWebinar(webinar) {
      console.log('Clicked webinar:', webinar);
            // Fetch login data before navigating
            this.fetchUserLoginData().then(() => {
                // Navigate to AddWebinar with logindata
                console.log('ini navigate:', this.loginUserData, " ", webinar.webinar_id);
                this.$router.push(`/daftar/${this.loginUserData}/${this.$route.params.id}`);
            });
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
    getWebinars(webinar_id) {
      axios.get(`/webinar/${webinar_id}`).then(res => {
        this.webinars = res.data.payload;
        console.log(this.webinars);
      })
    },
    getImageUrl(blobData) {
      // console.log('Blob Data:', blobData);
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
    incrementViews(webinar_id) {
        axios.put(`/increment-views/${webinar_id}`).then(response => {
            console.log('Views incremented successfully');
            //bisa kalau ada tampilan views harusnya tampilannya di update disisni
            })
            .catch(error => {
            console.error('Error incrementing views:', error);
            });
    },
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
    async like(webinar_id) {
      await this.initializeData();
        if (this.loginUserData) {
          try {
            // Check if this.user is defined
            if (!this.user || !this.user.liked_webinars) {
              console.error('User data is undefined or missing liked_webinars array.');
              return;
            }
          
            // Cek apakah webinar_id sudah ada di dalam daftar yang disukai oleh user
            if (this.likedWebinars && Array.isArray(this.likedWebinars)) {
              const isLiked = this.likedWebinars.some((webinar) => webinar.webinar_id === webinar_id);

              if (isLiked) {
                await this.unlikeWebinar(webinar_id);
              } else {
                await this.likeWebinar(webinar_id);
              }
            } else {
                console.error('Liked webinars data is undefined or not an array.');
              }
          } catch (error) {
            console.error('Error handling like:', error);
            // Handle error accordingly
          }
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
  }
};
</script>

<style scoped>
  @import "@/assets/css/webpage.css";
  .custom-image {
  display: flex;
  min-height: 10px;
  min-width: 10px;
  padding: 1rem;
  max-width: 100%; 
  height: auto; 
  width: 350px; 
  max-height: 450px;
};


/*--------------------------------------------------------------
# List Webinar
--------------------------------------------------------------*/

.custom-card {
  width: 375px; /* Atur lebar sesuai kebutuhan */
  height: 475px; /* Atur tinggi sesuai kebutuhan */
}

.webinar-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Add styles for pagination */
.pagination {
display: flex;
list-style: none;
padding: 0;
justify-content: center;
}

.page-item {
cursor: pointer;
}

.page-link {
color: #007bff;
}
</style>
