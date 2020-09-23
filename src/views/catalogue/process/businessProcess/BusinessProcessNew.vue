<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div class="card">
        <header class="card-header">Edit Process</header>
        <CCardBody>
          <div>
            <CRow>
              <CCol sm="9">
                <CInput
                  label="Name"
                  placeholder="Name"
                  v-model="process.name"
                />
                <p
                  class="error"
                  v-if="
                    !$v.process.name.required && uiState === 'form submitted'
                  "
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.process.name.minLength && uiState === 'form submitted'
                  "
                >
                  Field must have at least
                  {{ $v.process.name.$params.minLength.min }}
                  characters.
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.process.name.checkName && uiState === 'form submitted'
                  "
                >
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
                <p
                  class="error"
                  v-if="
                    !$v.process.description.required &&
                      uiState === 'form submitted'
                  "
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.process.description.minLength &&
                      uiState === 'form submitted'
                  "
                >
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
                <p
                  class="error"
                  v-if="
                    !$v.process.label.required && uiState === 'form submitted'
                  "
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.process.label.minLength && uiState === 'form submitted'
                  "
                >
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
                <p
                  class="error"
                  v-if="
                    !$v.process.organization.required &&
                      uiState === 'form submitted'
                  "
                >
                  This field is required
                </p>
                <p
                  class="error"
                  v-if="
                    !$v.process.organization.minLength &&
                      uiState === 'form submitted'
                  "
                >
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
                >Save</CButton
              >
              <CButton @click="goBusinessProcessList()">Cancel</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { axiosHack } from "@/http";
// eslint-disable-next-line no-unused-vars
import { required, minLength, between } from "vuelidate/lib/validators";
const querystring = require("querystring");
import { config } from "@/common";
export default {
  name: "ProcessNew",
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
      errors: []
    };
  },
  validations: {
    process: {
      id: {},
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

  methods: {
    handleSubmit() {
      this.formTouched = !this.$v.process.$anyDirty;
      this.errore = this.$v.process.$invalid;
      this.uiState = "form submitted";
      if (this.errore === false) {
        axiosHack
          .post("/processes", querystring.stringify(this.process), config)
          .then(response => {
            console.log(response);
            this.process = response.data;
            this.$router.push("/catalogue/process");
          });

        //this is where you send the responses

        return true;
      }
    }
  }
};
</script>
