<template>


  <div class="box">
    <div class="text1">
      <h3>Webinar</h3>
      <p>Cari semua webinar yang ada disini sesuai yang kamu inginkan dengan mudah:</p>
    </div>


    <!-- SEARCH BAR -->
    <div class="search-bar">
      <div class="input-group mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Ketik Kata Kunci disini" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button @click="search" class="btn btn-outline-info" type="button" id="button-addon2">Enter</button>
      </div>
      <div class="category">
        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
          <input v-model="filter.free" @change="handleCheckboxChange" type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck1">Gratis</label>


          <input v-model="filter.paid" @change="handleCheckboxChange" type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck2">Berbayar</label>


          <input v-model="filter.online" @change="handleCheckboxChange" type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck3">Online</label>


          <input v-model="filter.offline" @change="handleCheckboxChange" type="checkbox" class="btn-check" id="btncheck4" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck4">Offline</label>


          <input v-model="filter.certificate" @change="handleCheckboxChange" type="checkbox" class="btn-check" id="btncheck5" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck5">Sertifikat</label>


          <input v-model="filter.thisWeek" @change="handleCheckboxChange" type="checkbox" class="btn-check" id="btncheck6" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck6">Minggu Ini</label>


          <input v-model="filter.upcoming" @change="handleCheckboxChange" type="checkbox" class="btn-check" id="btncheck7" autocomplete="off">
          <label class="btn btn-outline-primary" for="btncheck7">Yang akan datang</label>
        </div>
      </div>
    </div>


    <!-- LIST WEBINAR -->
    <div class="list-webinar d-flex justify-content-center">
      <!-- <div class="card-list" v-for="webinar in filteredWebinars" :key="webinar.id"> -->
      <div class="card-list" v-for="(webinar, index) in displayedWebinars" :key="index">
        <article class="card column tempat">
          <figure class="card-image">
          <img :src= "getImageUrl(webinar.img)"
              alt="webinar img" />
          </figure>
          <div class="card-header">
            <RouterLink :to="{ path: '/page/' + webinar.webinar_id }" @click.stop>
              <div @click ="incrementViews(webinar.webinar_id)"><h5>{{ webinar.namaWebinar }}</h5></div>
            </RouterLink>
          <button class="icon-button" @click="like(webinar.webinar_id)" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" display="block" id="Heart">
              <path
                d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
            </svg>
          </button>
         
          </div>
            <div class="card-body">
              <ul>
                <li>Harga : {{ formatharga(webinar.harga) }}</li>
                <li>Sertifikat : {{ formatsertifikat(webinar.sertif) }}</li>
              </ul>
            </div>
            <div class="card-footer koko">
                                        <div class="card-meta card-meta--views">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" display="block" id="EyeOpen">
                                                <path
                                                    d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                            {{ webinar.views }}
                                        </div>
                                        <div class="card-meta card-meta--date">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" display="block" id="Calendar">
                                            <rect x="2" y="4" width="20" height="18" rx="4" />
                                            <path d="M8 2v4" />
                                            <path d="M16 2v4" />
                                            <path d="M2 10h20" />
                                        </svg>
                                        {{ formatWebinarDate(webinar.waktu) }}
              </div>
                         <!-- <button @click="like(webinar.webinar_id)">jo</button>           -->
              </div>
            <RouterLink :to="{ path: '/page/' + webinar.webinar_id }" @click.stop>
              <button class="w-100 btn btn-primary more" @click="incrementViews(webinar.webinar_id)">Baca Selengkapnya</button>
           </RouterLink>
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
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      searchQuery: '',
      filter: {
        free: false,
        paid: false,
        online: false,
        offline: false,
        certificate: false,
        thisWeek: false,
        upcoming: false,
      },
      webinars: [],
      loading: false,
      loginUserData: [],
      likedWebinars: [],
      itemsPerPage: 12,
      currentPage: 1,
    };
  },
  mounted() {
    // this.fetchUserLoginData();
    this.getWebinars();
  },
  computed: {
    filteredWebinars() {
      const searchTerm = this.searchQuery.toLowerCase().trim();
      const currentDate = new Date(); // Current date and time


      // Calculate the end of the current week
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Assuming Sunday is the end of the week


      return this.webinars.filter((webinar) => {
        // cek search input
        const namaWebinarMatch = webinar.namaWebinar.toLowerCase().includes(searchTerm);
        // checkboxes
        const isFree = this.filter.free ? (webinar.harga === 0) : true;
        const isPaid = this.filter.paid ? (webinar.harga !== 0) : true;
        const isOnline = this.filter.online ? (webinar.Online === 'y') : true;
        const isOffline = this.filter.offline ? (webinar.Online === 'n') : true;
        const hasCertificate = this.filter.certificate ? (webinar.sertif === 'y') : true;
        const isThisWeek = this.filter.thisWeek ? (new Date(webinar.waktu) >= currentDate && new Date(webinar.waktu) <= endOfWeek) : true;
        const isUpcoming = this.filter.upcoming ? (new Date(webinar.waktu) >= endOfWeek) : true;


        // return conditions that are met
        return namaWebinarMatch && isFree && isPaid && isOnline && isOffline && hasCertificate && isThisWeek && isUpcoming;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredWebinars.length / this.itemsPerPage);
    },
    // Calculate the array of webinars to display on the current page
    displayedWebinars() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredWebinars.slice(startIndex, endIndex);
    },
  },
  methods: {
    async getWebinars() {
            try {
                const response = await axios.get(`/webinar-list`);
                // console.log(response);
                this.webinars = response.data.payload;
                // console.log(this.webinars);
            }
            catch (error) {
                console.error('Error fetching webinars:', error);
            }
    },


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


        incrementViews(webinar_id) {
        axios.put(`/increment-views/${webinar_id}`).then(response => {
            console.log('Views incremented successfully');
            //bisa kalau ada tampilan views harusnya tampilannya di update disisni
            })
            .catch(error => {
            console.error('Error incrementing views:', error);
            });
        },
       
        formatWebinarDate(dateTimeString) {
            // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' };
            const formattedDate = new Date(dateTimeString).toLocaleString(undefined, options);
            return formattedDate;
        },
        formatharga(harga)
        {
            if(harga == 0)
            {
                return "free";
            } else {
                return harga;
            }
        },
        formatsertifikat(sertif)
        {
            if(sertif == "y")
            {
                return "ya";
            } else {
                return "no";
            }
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
    search() {
      // Logika pencarian, jika diperlukan
    },
    handleCheckboxChange() {
      // Logika untuk menangani perubahan pada checkbox
    },
  },
};
</script>


<style scoped>
@import "@/assets/css/list.css";
.tempat {
  width: 350px;
  height: 620px;
}
.more {
    margin-top: 14px;
}
.koko {
    margin-top: -8px;
}

.box{
  width: 100%;
  padding: 0 40px 30px 40px;
}
</style>