<template>
  <div class="row">
    <div class="col-sm-6 col-md-6">
      <div class="card ">
        <header class="card-header">
          User
          <router-link
            tag="a"
            :to="{
              name: 'UserList'
            }"
          >
            <span class="pl-1"
              ><users-icon class="pr-3" />back to user list</span
            >
          </router-link>
        </header>

        <div class="card-body">
          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.name.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Name</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.name"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.user.name.required">
                Name is required
              </div>
              <div class="error" v-if="!$v.user.name.minLength">
                Name must have at least
                {{ $v.user.name.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.surname.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Surname</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.surname"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.user.surname.required">
                Surname is required
              </div>
              <div class="error" v-if="!$v.user.surname.minLength">
                Name must have at least
                {{ $v.user.surname.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.email.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Email</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.email"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.user.email.required">
                Email is required
              </div>
              <div class="error" v-if="!$v.user.email.email">
                must have a valid
                {{ $v.user.email.$params.email }}.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.role.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Role</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.role"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.user.role.required">
                role is required
              </div>
              <div class="error" v-if="!$v.user.role.minLength">
                role must have at least
                {{ $v.user.role.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div
            class="input-group mb-3"
            :class="{ 'form-group--error': $v.user.password.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Password</span
              >
            </div>
            <input
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              v-model="user.password"
            />
            <div class="row col-12">
              <div class="error" v-if="!$v.user.password.required">
                password is required
              </div>
              <div class="error" v-if="!$v.user.password.minLength">
                password must have at least
                {{ $v.user.password.$params.minLength.min }} letters.
              </div>
            </div>
          </div>

          <div class="row col-12">
            <button
              class="btn btn-outline-dark btn-sm"
              @click.prevent="handleSubmit()"
              :disabled="submitStatus === 'PENDING'"
            >
              Add!
            </button>

            <Button
              class="btn btn-outline-dark btn-sm"
              @click.prevent="handleReset()"
              :disabled="disabled"
              >Reset</Button
            >
          </div>
          <div class="row col-12">
            <p class="typo__p" v-if="submitStatus === 'OK'">
              Thanks for your submission!
            </p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">
              Please fill the form correctly.
            </p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">
              Sending...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosHack } from "@/http";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "UserAdd",
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        role: "",
        password: ""
      },
      disabled: false,
      submitStatus: false
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4)
      },
      surname: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      role: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    handleReset() {
      this.user.name = "";
      this.user.surname = "";
      this.user.email = "";
      this.user.role = "";
      this.user.password = "";
    },
    handleSubmit() {
      console.log("submit!");
      //this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        return new Promise((resolve, reject) => {
          const config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          };
          const data = {
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email,
            role: this.user.role,
            password: this.user.password
          };

          const querystring = require("querystring");

          axiosHack.post("/users/", querystring.stringify(data), config).then(
            response => {
              console.log(response);
              const token = response.headers["jwt-auth"];
              const data = {
                token: token,
                user: response.data
              };
              resolve(data);
              this.submitStatus = response.statusText;
            },
            error => {
              console.log(error.response.data.code);
              const err = {
                code: error.response.status,
                message: error.response.data.code
              };
              reject(err);
            }
          );
        });
      }
    }
  }
};
</script>
