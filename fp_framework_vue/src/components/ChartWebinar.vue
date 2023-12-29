<template>
    <!-- ======= Portfolio Section ======= -->
    <section id="portfolio" class="section-bg">
        <div class="container" data-aos="fade-up">
            <header class="section-header">
                <h3 class="section-title">Webinar dan Seminar</h3>
            </header>

            <div class="row" data-aos="fade-up" data-aos-delay="100">
                <div class="col-lg-12">
                    <ul id="portfolio-flters">
                        <li data-filter="*" class="filter-active">All</li>
                        <li data-filter=".filter-app">App</li>
                        <li data-filter=".filter-card">Card</li>
                        <li data-filter=".filter-web">Web</li>
                    </ul>
                </div>
            </div>
            <div class="row portfolio-container d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200" >
                <div class="col-lg-4 col-md-6 portfolio-item filter-web " v-for="(webinar, index) in this.webinars" :key="index">
                    <div class="portfolio-wrap" >
                        <img :src="getImageUrl(webinar.img)" class="img-fluid" alt="Webinar Image" />
                        <div class="portfolio-info">
                            <router-link :to="'/page/' + webinar.webinar_id" @click.stop><div @click="incrementViews(webinar.webinar_id)">
                                <h4 style="color: white;">{{ webinar.namaWebinar }}</h4>
                            </div></router-link>
                            <p>{{ webinar.deskripsi }}</p>
                            <div>
                                <router-link :to="'/page/' + webinar.webinar_id" class="portfolio-lightbox link-preview"
                                    data-gallery="portfolioGallery" title="Web 3">
                                    <i @click="incrementViews(webinar.webinar_id)" class="bi bi-plus"></i>
                                </router-link>
                                <a href="portfolio-details.html" class="link-details" title="More Details"><i
                                        class="bi bi-link"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-lg-4 col-md-6 portfolio-item filter-web">
                    <div class="portfolio-wrap">
                        <img src="assets/img/portfolio/web3.jpg" class="img-fluid" alt="" />
                        <div class="portfolio-info">
                            <h4><a href="portfolio-details.html">Web 3</a></h4>
                            <p>Web</p>
                            <div>
                                <a href="assets/img/portfolio/web3.jpg" class="portfolio-lightbox link-preview"
                                    data-gallery="portfolioGallery" title="Web 3"><i class="bi bi-plus"></i></a>
                                <a href="portfolio-details.html" class="link-details" title="More Details"><i
                                        class="bi bi-link"></i></a>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
    <!-- End Portfolio Section -->
</template>

<script>
import axios from 'axios';
export default {
    name: 'Chartwebinar',
    data() {
        return {
            webinars: [],
            displayLimit: 2,
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
    },
}
</script>

<style>
.portfolio-container
{
    display: grid !important; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px;
}
</style>
