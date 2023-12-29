<!-- src/components/Footer.vue -->
<template>
  <footer id="footer" class="mt-20">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-4 col-md-6 footer-info">
            <h3  style="text-align: justify; margin-right: 20px;">WebinarToday</h3>
            <p  style="text-align: justify; margin-right: 20px;">Webinar Today adalah platform inovatif yang didedikasikan untuk menyediakan akses kepada para peserta untuk berbagai webinar berkualitas tinggi di berbagai bidang. Kami membawa bersama pemimpin industri, ahli, dan pembicara terkemuka untuk berbagi pengetahuan, pengalaman, dan wawasan terbaru.</p>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4 style="margin-bottom: 43px; margin-top: 10px;">Useful Links</h4>
            <ul>
              <li><router-link to="/dashboard/#Home">Home</router-link></li>
              <li><router-link to="/about">About us</router-link></li>
              <li><router-link to="/services">Services</router-link></li>
              <li><router-link to="/terms">Terms of service</router-link></li>
              <li><router-link to="/privacy">Privacy policy</router-link></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-contact">
            <h4 style="margin-bottom: 5px; margin-top: 10px;">Contact Us</h4>
            <p style="text-align: justify; margin-right: 20px; color: white;">
              Jl. Medokan Ayu no 1 Surabaya, Jawa Timur, Indonesia <br>
              <strong>Phone:</strong> +62 5589 55488 55<br>
              <strong>Email:</strong> WebinarToday@gmail.com<br>
            </p>

            <div class="social-links">
              <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
              <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div class="col-lg-3 footer-newsletter">
            <h4 style="margin-bottom: 5px; margin-top: 10px;">Our Newsletter</h4>
            <p  style="text-align: justify; margin-right: 20px; color: white;">Bergabunglah bersama kami dan dapatkan akses eksklusif ke informasi terbaru, update acara, serta berita dan artikel menarik.</p>
            <form action="" method="post">
              <input type="email" name="email" /><input type="submit" value="Subscribe" />
            </form>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>WebinarToday</strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. You can delete the links only if you purchased the pro version. Licensing information: https://bootstrapmade.com/license/ Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=NewBiz -->
        <!-- Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> -->
      </div>
    </div>
  </footer>
</template>

<script>
import "@/assets/vendor/purecounter/purecounter_vanilla.js";
import "@/assets/vendor/aos/aos.js";
import "@/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "@/assets/vendor/glightbox/js/glightbox.min.js";
import "@/assets/vendor/isotope-layout/isotope.pkgd.min.js";
import "@/assets/vendor/swiper/swiper-bundle.min.js";
import "@/assets/vendor/php-email-form/validate.js";

export default {
  // Add any component-specific logic here
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
