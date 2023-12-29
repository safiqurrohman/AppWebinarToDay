<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Montserrat:300,400,500,700" rel="stylesheet">
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex justify-content-between">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/img/logowebinartoday.png" alt="" class="img-fluid">
        </router-link>
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/search">Webinar</router-link></li>
          <li><a href="#tentang">Tentang Kami</a></li>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li class="dropdown">
            <a href="#"><span>Profile</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><router-link to="/profile-user">Pengguna</router-link></li>
              <li><router-link to="/profile-penyelenggara">Penyelenggara</router-link></li>
              
            </ul>
          </li>
          <li class="dropdown">
            <a href="#"><span>Login</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><router-link to="/loginuser">Pengguna</router-link></li>
              <li><router-link to="/login">Penyelenggara</router-link></li>
            </ul>
          </li>
        </ul>
        <!-- <div class="humberger">
          <i class="bi bi-list mobile-nav-toggle"></i>
        </div> -->
      </nav>
    </div>
  </header>
  </div>
</template>

<script>
export default {
  // Add any component-specific logic here
}
</script>

<style scoped>

@import "@/assets/css/style.css";
@import "@/assets/vendor/aos/aos.css";
@import "@/assets/vendor/bootstrap/css/bootstrap.min.css";
@import "@/assets/vendor/bootstrap-icons/bootstrap-icons.css";
@import "@/assets/vendor/glightbox/css/glightbox.min.css";
@import "@/assets/vendor/swiper/swiper-bundle.min.css";
</style>
