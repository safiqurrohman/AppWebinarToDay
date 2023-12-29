<template>
    <div class="hero" id="Home">
        <div>
            <Hero />
        </div>
        <main id="main">
            <div  >
                <ChartTopWebinar />
            </div>
            <section id="tentang">
      <div class="container" data-aos="fade-up">
        <header class="section-header">
          <h3>Tentang Kami</h3>
          <p>
            WebinarToDay merupakan salah satu platform online yang bergerak dalam bidang jasa. Kami membawa bersama
            pemimpin industri, ahli, dan pembicara terkemuka untuk berbagi pengetahuan, pengalaman, dan wawasan terbaru.
          </p>
        </header>

        <div class="row about-container">
          <div class="col-lg-6 content order-lg-1 order-2">
            <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
              <div class="icon"><i class="bi bi-card-checklist"></i></div>
              <h4 class="title">Sesi Weninar</h4>
              <p class="description">
                Nikmati pembelajaran langsung dengan para ahli di bidangnya.
              </p>
            </div>

            <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
              <div class="icon"><i class="bi bi-brightness-high"></i></div>
              <h4 class="title">Webinar Berkualitas Tinggi</h4>
              <p class="description">
                Menyajikan topik Webinar yang Berkualitas dan relevan dalam berbagai industri.
              </p>
            </div>

            <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
              <div class="icon"><i class="bi bi-calendar4-week"></i></div>
              <h4 class="title">Kesempatan pengalaman</h4>
              <p class="description">
                Mendapatkan pengetahuan dan pengalaman baru yang menarik
              </p>
            </div>
          </div>

          <div class="col-lg-6 background order-lg-2" data-aos="zoom-in">
            <img src="assets/img/about-img.svg" class="img-fluid" alt="" />
          </div>
        </div>

        <div class="row about-extra">
          <div class="col-lg-6" data-aos="fade-right">
            <img src="assets/img/about-extra-1.svg" class="img-fluid" alt="" />
          </div>
          <div class="col-lg-6 pt-5 pt-lg-0" data-aos="fade-left">
            <h4>
              Platform pihak 3
            </h4>
            <p>
              Menyediakan platform yang dapat menjadi wadah bagi penyelenggara webinar agar dapat memudahkan dalam mempromosikan program webinar yang ingin diselenggarakan oleh penyelenggara.
            </p>
          </div>
        </div>

      </div>
    </section>

            <!-- ======= Tawaran Layanan Post Webinar Section ======= -->
            <section id="services" class="section-bg">
                <div class="container" data-aos="fade-up">
                    <header class="section-header">
                        <h3>Tawaran Kami</h3>
                        <p>
                            Kami menyediakan paket layanan bagi para penyelenggara webinar berikut diantaranya:
                        </p>
                    </header>

                    <div class="row justify-content-center">
                        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                            <div class="col">
                                <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">Free Trial</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">Rp0<small class="text-body-secondary fw-light">/mo</small></h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                    <li>1 webinar included</li>
                                    <li>low chance of appearing in top</li>
                                    <li>no Email support</li>
                                    <li>Dashboard access</li>
                                    </ul>
                                    <RouterLink :to="{path:'/sign-up'}" class="w-100 btn btn-lg btn-outline-primary">
                                        Sign up for free
                                    </RouterLink> 
                                </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">Pro</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">Rp100k<small class="text-body-secondary fw-light">/mo</small></h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                    <li>10 webinars included</li>
                                    <li>more chance of appearing in top</li>
                                    <li>no Email support</li>
                                    <li>Dashboard access</li>
                                    </ul>
                                    <RouterLink :to="{path:'/sign-up'}" class="w-100 btn btn-lg btn-primary">
                                        Get started
                                    </RouterLink> 
                                </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card mb-4 rounded-3 shadow-sm border-primary">
                                <div class="card-header py-3 text-bg-primary border-primary">
                                    <h4 class="my-0 fw-normal">Enterprise</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">Rp210k<small class="text-body-secondary fw-light">/mo</small></h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                    <li>100 webinars included</li>
                                    <li>high chance of appearing in top</li>
                                    <li>Email support</li>
                                    <li>Dashboard access</li>
                                    </ul>

                                    <RouterLink :to="{path:'/sign-up'}" class="w-100 btn btn-lg btn-primary">
                                        Get started
                                    </RouterLink> 
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End Tawaran Layanan Post Webinar Section -->

            <!-- ======= Why Us Section ======= -->
            <section id="why-us">
                <div class="container" data-aos="fade-up">
                    <header class="section-header">
                        <h3>Kenapa Harus Memilih kami?</h3>
                        <p>
                            
                        </p>
                    </header>

                    <div class="row row-eq-height justify-content-center">
                        <div class="col-lg-4 mb-4">
                            <div class="card" data-aos="zoom-in" data-aos-delay="100">
                                <i class="bi bi-calendar4-week"></i>
                                <div class="card-body">
                                    <h5 class="card-title">Corporis dolorem</h5>
                                    <p class="card-text">
                                        Deleniti optio et nisi dolorem debitis. Aliquam nobis est
                                        temporibus sunt ab inventore officiis aut voluptatibus.
                                    </p>
                                    <a href="#" class="readmore">Read more </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 mb-4">
                            <div class="card" data-aos="zoom-in" data-aos-delay="200">
                                <i class="bi bi-camera-reels"></i>
                                <div class="card-body">
                                    <h5 class="card-title">Voluptates dolores</h5>
                                    <p class="card-text">
                                        Voluptates nihil et quis omnis et eaque omnis sint aut.
                                        Ducimus dolorum aspernatur.
                                    </p>
                                    <a href="#" class="readmore">Read more </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 mb-4">
                            <div class="card" data-aos="zoom-in" data-aos-delay="300">
                                <i class="bi bi-chat-square-text"></i>
                                <div class="card-body">
                                    <h5 class="card-title">Eum ut aspernatur</h5>
                                    <p class="card-text">
                                        Autem quod nesciunt eos ea aut amet laboriosam ab. Eos quis
                                        porro in non nemo ex.
                                    </p>
                                    <a href="#" class="readmore">Read more </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End Why Us Section -->


            <!-- ======= Team Section ======= -->
            <!-- <section id="team">
                <div class="container" data-aos="fade-up">
                    <div class="section-header">
                        <h3>Team</h3>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque
                        </p>
                    </div>

                    <div class="row">
                        <div class="col-lg-3 col-md-6" data-aos="zoom-out" data-aos-delay="100">
                            <div class="member">
                                <img src="assets/img/team-1.jpg" class="img-fluid" alt="" />
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>Walter White</h4>
                                        <span>Chief Executive Officer</span>
                                        <div class="social">
                                            <a href=""><i class="bi bi-twitter"></i></a>
                                            <a href=""><i class="bi bi-facebook"></i></a>
                                            <a href=""><i class="bi bi-instagram"></i></a>
                                            <a href=""><i class="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6" data-aos="zoom-out" data-aos-delay="200">
                            <div class="member">
                                <img src="assets/img/team-2.jpg" class="img-fluid" alt="" />
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>Sarah Jhonson</h4>
                                        <span>Product Manager</span>
                                        <div class="social">
                                            <a href=""><i class="bi bi-twitter"></i></a>
                                            <a href=""><i class="bi bi-facebook"></i></a>
                                            <a href=""><i class="bi bi-instagram"></i></a>
                                            <a href=""><i class="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6" data-aos="zoom-out" data-aos-delay="300">
                            <div class="member">
                                <img src="assets/img/team-3.jpg" class="img-fluid" alt="" />
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>William Anderson</h4>
                                        <span>CTO</span>
                                        <div class="social">
                                            <a href=""><i class="bi bi-twitter"></i></a>
                                            <a href=""><i class="bi bi-facebook"></i></a>
                                            <a href=""><i class="bi bi-instagram"></i></a>
                                            <a href=""><i class="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6" data-aos="zoom-out" data-aos-delay="400">
                            <div class="member">
                                <img src="assets/img/team-4.jpg" class="img-fluid" alt="" />
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>Amanda Jepson</h4>
                                        <span>Accountant</span>
                                        <div class="social">
                                            <a href=""><i class="bi bi-twitter"></i></a>
                                            <a href=""><i class="bi bi-facebook"></i></a>
                                            <a href=""><i class="bi bi-instagram"></i></a>
                                            <a href=""><i class="bi bi-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> -->
            <!-- End Team Section -->

            <!-- ======= Contact Section ======= -->
            <section id="contact">
                <div class="container-fluid" data-aos="fade-up">
                    <div class="section-header">
                        <h3>Contact Us</h3>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="map mb-4 mb-lg-0">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                                    frameborder="0" style="border: 0; width: 100%; height: 340px" allowfullscreen></iframe>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-md-5 info">
                                    <i class="bi bi-geo-alt"></i>
                                    <p>A108 Adam Street, NY 535022</p>
                                </div>
                                <div class="col-md-4 info">
                                    <i class="bi bi-envelope"></i>
                                    <p>info@example.com</p>
                                </div>
                                <div class="col-md-3 info">
                                    <i class="bi bi-phone"></i>
                                    <p>+1 5589 55488 55</p>
                                </div>
                            </div>

                            <div class="form">
                                <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                                    <div class="row">
                                        <div class="form-group col-lg-6">
                                            <input type="text" name="name" class="form-control" id="name"
                                                placeholder="Your Name" required />
                                        </div>
                                        <div class="form-group col-lg-6 mt-3 mt-lg-0">
                                            <input type="email" class="form-control" name="email" id="email"
                                                placeholder="Your Email" required />
                                        </div>
                                    </div>
                                    <div class="form-group mt-3">
                                        <input type="text" class="form-control" name="subject" id="subject"
                                            placeholder="Subject" required />
                                    </div>
                                    <div class="form-group mt-3">
                                        <textarea class="form-control" name="message" rows="5" placeholder="Message"
                                            required></textarea>
                                    </div>
                                    <div class="my-3">
                                        <div class="loading">Loading</div>
                                        <div class="error-message"></div>
                                        <div class="sent-message">
                                            Your message has been sent. Thank you!
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" title="Send Message">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End Contact Section -->
        </main>
        <!-- End #main -->
    </div>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Tentang from './Tentang/Tentang.vue';
import ChartTopWebinar from '@/components/ChartTopWebinar.vue';
import axios from 'axios';
export default {
    name: "Home",
    components: {
        Hero,
        Tentang,
        ChartTopWebinar,
    },
    data() {
        return {
            webinars: [],
        };
    },

    methods: {
        setwebinars(data) {
            this.webinars = data;
        },
    },

    mounted() {
        axios
            .get("http://localhost:8000")
            .then((Response) => this.setwebinars(Response.data))
            .catch((error) => console.log(error))
    },


};
</script>
   
<style scoped>
/* Component-specific styles go here */
</style>
   