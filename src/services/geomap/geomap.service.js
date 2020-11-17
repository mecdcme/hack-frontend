import { axiosHack } from "@/http";

export const geomapService = {
  findAll
  //,
  //findById,
  //save,
  //update,
  //delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosHack.get("/countries/").then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}

/*
function findById(id) {
  return new Promise((resolve, reject) => {
    axiosHack.get("/maps/" + id).then(
      response => {
        //var data = response.data ? response.data : null;
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
*/
/*
function save(data) {
  return new Promise((resolve, reject) => {
    axiosHack.post("/maps/", data, config).then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
*/
/*
function update(data) {
  return new Promise((resolve, reject) => {
    const map = {
      //name: data.name,
      //surname: data.surname,
      //email: data.email,
      //role: data.role
    };
    axiosHack.put("/maps/" + data.id, map, config).then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}
*/
/*
function _delete(id) {
  return new Promise((resolve, reject) => {
    axiosHack.delete("/maps/" + id).then(
      response => {
        console.log(response.data);
        console.log(response.statusText);
        resolve(response.data);
      },
      error => {
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
    
  });

}
*/
