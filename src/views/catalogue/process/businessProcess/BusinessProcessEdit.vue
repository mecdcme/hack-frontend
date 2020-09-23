<template>
  <div class="row" v-if="process">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <form>
          <CCardBody>
            <div>
              <!-- <CRow>
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                </p>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
                <p v-if="errore" class="error">
                  The form above has errors,
                  <br />please get your act together and resubmit
                </p>
                <p
                  v-else-if="formTouched && uiState === 'submit clicked'"
                  class="error"
                >
                  The form above is empty,
                  <br />cmon y'all you can't submit an empty form!
                </p>
                <p v-else-if="uiState === 'form submitted'" class="success">
                  >Hooray! Your form was submitted!
                </p>
              </CRow> -->

              <CRow>
                <CCol sm="9">
                  <CInput label="Id" placeholder="Id" disabled />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Name"
                    placeholder="Name"
                    v-model="process.name"
                  />
                  <p class="error" v-if="!$v.process.name.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.name.minLength">
                    Field must have at least
                    {{ $v.process.name.$params.minLength.min }}
                    characters.
                  </p>
                  <p class="error" v-if="!$v.process.name.checkName">
                    invalid character in field name.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Description"
                    placeholder="Description"
                    v-model="process.description"
                  />
                  <p class="error" v-if="!$v.process.description.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.description.minLength">
                    Field must have at least
                    {{ $v.process.description.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Label"
                    placeholder="Label"
                    v-model="process.label"
                  />
                  <p class="error" v-if="!$v.process.label.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.label.minLength">
                    Field must have at least
                    {{ $v.process.label.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="9">
                  <CInput
                    label="Organization"
                    placeholder="Organization"
                    v-model="process.organization"
                  />
                  <p class="error" v-if="!$v.process.organization.required">
                    This field is required
                  </p>
                  <p class="error" v-if="!$v.process.organization.minLength">
                    Field must have at least
                    {{ $v.process.organization.$params.minLength.min }}
                    characters.
                  </p>
                </CCol>
              </CRow>
            </div>
          </CCardBody>
          <CCardFooter>
            <CRow class="d-flex justify-content-middle">
              <CCol sm="9">
                <CButton
                  color="primary"
                  type="submit"
                  value="Submit"
                  @click.prevent="handleSubmit"
                  >Update</CButton
                >
                <CButton @click="goBusinessProcessList()">Cancel</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosHack } from "@/http";
import { config } from "@/common";
// eslint-disable-next-line no-unused-vars
import { required, minLength, between } from "vuelidate/lib/validators";
const querystring = require("querystring");

export default {
  name: "ProcessEdit",
  data() {
    return {
      uiState: "submit not clicked",
      errore: false,
      formTouched: false,
      empty: true,
      process: {
        name: "",
        description: "",
        label: "",
        organization: ""
      },
      /*  process: [], */
      errors: []
    };
  },
  validations: {
    process: {
      name: {
        required,
        minLength: minLength(4),
        checkName(name) {
          return (
            /[a-z]/.test(name) && !/[0-9]/.test(name) // checks for a-z
          );
        }
      },
      description: {
        required,
        minLength: minLength(4)
      },
      label: {
        required,
        minLength: minLength(4)
      },
      organization: {
        required,
        minLength: minLength(4)
      }
    }
  },
  created() {
    axiosHack.get("/processes/" + this.$route.params.id).then(response => {
      console.log(response);
      this.process = response.data;
    });
  },
  methods: {
    updateBusinessProcess() {
      axiosHack
        .put(
          "/processes/" + this.process.id,
          querystring.stringify(this.process),
          config
        )
        .then(response => {
          console.log(response);
          this.process = response.data;
        });
    },
    goBusinessProcessList() {
      this.$router.push("/catalogue/process");
    },
    handleSubmit() {
      this.formTouched = !this.$v.process.$anyDirty;
      this.errore = this.$v.process.$invalid;

      if (this.errore === false) {
        axiosHack
          .put(
            "/processes/" + this.process.id,
            querystring.stringify(this.process),
            config
          )
          .then(response => {
            console.log(response);
            this.process = response.data;
          });

        //this is where you send the responses
        this.uiState = "form submitted";
        this.$router.push("/catalogue/process");
        return true;
      }

      /*       this.errors = [];

      if (!this.process.name) {
        this.errors.push("Name required.");
      }
      if (!this.process.description) {
        this.errors.push("Description required.");
      }
      if (!this.process.label) {
        this.errors.push("Label required.");
      }
      if (!this.process.organization) {
        this.errors.push("Organization required.");
      } */
    }
  }
};
</script>
