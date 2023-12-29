<template>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm">
        <h2>Edit Data User</h2>
        <div class="col mb-3 mt-3">
          <div class="card">
            <div class="card-body">

              <form @submit.prevent="submitForm($route.params.user_id)">
                <table class="table table-striped">
                <!-- Add input fields for the user data you want to update -->
                  <tr>
                    <th for="username" class="form-label">Username</th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.username" type="text" class="form-control" required></td>
                  </tr>
                  <tr>
                    <th for="email" class="form-label">Email</th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.email" type="email" class="form-control" required></td>
                  </tr>
                  <tr>
                    <th for="noTelp" class="form-label">Phone</th>
                  </tr>
                  <tr>
                    <td><input v-model="formData.noTelp" type="text" class="form-control" required></td>
                  </tr>
                <!-- Add more fields based on your user table structure -->
                  
                    <div class="d-grid mt-3">
                      <button type="submit" class="btn btn-success">Save </button>
                      &nbsp;&nbsp;&nbsp;
                      <router-link to="/profile-user" class="btn btn-info">Back</router-link>
                    </div>
                  
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: [],
      // {
      //   username: '',
      //   email: '',
      //   noTelp: '',
      //   // Add more fields based on your user table structure
      // },
    };
  },
  created() {
    const user_id = this.$route.params.user_id;

    console.log('User ID:', user_id);
    this.fetchUserData(user_id);
    },
  methods: {
    async fetchUserData(user_id) {
        try {
          // Ambil data user
          const formDataResponse = await axios.get(`http://localhost:8000/user/${user_id}`);
          console.log('User API Response:', formDataResponse.data);

          if (formDataResponse.data && formDataResponse.data.payload) {
            this.formData = formDataResponse.data.payload;
          }
        } catch (error) {
          console.error('Error fetching data', error);
        }
      },
      submitForm(user_id) {
      const apiUrl = `http://localhost:8000/user/${user_id}`; // Replace with your user update API endpoint

      axios
        .put(apiUrl, this.formData)
        .then(response => {
          console.log('Response from server:', response.data);
          // Add other logic after receiving a response from the server
          // Navigate back to the /profile-penyelenggara menu after a successful update
          this.$router.push('/profile-user');
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          // Handle error
        });
    },
  },
};
</script>

<style>
/* Add styles as needed */

</style>
