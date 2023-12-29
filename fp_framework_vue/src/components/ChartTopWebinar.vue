<template>
    <div>
        <section id="portfolio" class="w-100% flex">
            <div class="container" data-aos="fade-up">

                <header class="section-header">
                    <h3 class="section-title">Top Webinar dan Seminar</h3>
                </header>

                <div class="row portfolio-container flex" data-aos="fade-up" data-aos-delay="200">

                    <div class="d-flex justify-content-center portfolio-item filter-web">
                        <div class="card-list" v-for="(webinar, index) in this.webinars" :key="index">
                                <article class="card column tempat">
                                    <figure class="card-image">
                                        <img :src= "getImageUrl(webinar.img)"
                                            alt="webinar img" />
                                    </figure>
                                    <div class="card-header">
                                        <RouterLink :to="{ path: '/page/' + webinar.webinar_id }" @click.stop>
                                            <div @click ="incrementViews(webinar.webinar_id)"><h5>{{ webinar.namaWebinar }}</h5></div>
                                        </RouterLink>
                                        <button class="icon-button" @click="like(webinar.webinar_id)">
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
                                    
                                    </div>
                                    <RouterLink :to="{ path: '/page/' + webinar.webinar_id }" @click.stop>
                                        <button class="w-100 btn btn-primary more" @click="incrementViews(webinar.webinar_id)">Baca Selengkapnya</button>
                                    </RouterLink>
                                </article>
                        </div>
                    </div>

                </div>
                <div class="moreinfo">
                    <Router-link  class="cari" to="/search">Lihat semua</Router-link>
                </div>
            </div>
        </section><!-- End Portfolio Section -->
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'Chartwebinar',
    data() {
        return {
            webinars: [],
            displayLimit: 3,
        };
    },
    mounted() {
        this.getTopWebinars();
    },
    methods: {
        getTopWebinars() 
        {
            axios.get(`/webinar-toplist`).then(response=>{
                this.webinars = response.data.payload;
                console.log(this.webinars);
                //limit cuman 3
                this.webinars = response.data.slice(0, this.displayLimit);
            }).catch(error=>{
                console.log("Error fetching webinar data:", error);
            })
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

        incrementViews(webinar_id) {
        axios.put(`/increment-views/${webinar_id}`).then(response => {
            console.log('Views incremented successfully');
            //bisa kalau ada tampilan views harusnya tampilannya di update disisni
            })
            .catch(error => {
            console.error('Error incrementing views:', error);
            });
        },
        handleH4Click(webinar_id) {
            // Increment views when the <h4> tag is clicked
            this.incrementViews(webinar_id);
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
    },
};
</script>
  
<style scoped>
@import "@/assets/css/webpage.css";

.more {
    margin-top: 14px;
}
.koko {
    margin-top: -8px;
}
.tempat {
  width: 350px;
  height: 620px;
}
.moreinfo{
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
}

.moreinfo .cari{
    color: rgb(255, 255, 255);
    background-color: rgb(40, 40, 228);
    font-weight: 700;
    padding: 10px 15px;
    border-radius: 10px;
    /* width: 140px;
    height: 0px; */
}
.moreinfo .cari:hover{
    color: rgb(40, 40, 228);
    background-color: #ffff;
}


</style>
  