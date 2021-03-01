import { axiosHack } from "@/http";
export const geomapService = {
  findAll,
  findByName
};
function findAll() {
  return axiosHack
    .get("/countries")
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
function findByName(name) {
  return axiosHack
    .get("/countries/" + name)
    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
