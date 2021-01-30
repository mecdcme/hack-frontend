import { axiosHack } from "@/http";
export const graphColaService = {
  findAll
};
function findAll() {
  return axiosHack
    .get("/colaData/")
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
