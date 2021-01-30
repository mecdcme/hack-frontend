import { axiosHack } from "@/http";
export const graphCoseService = {
  findAll
};

function findAll() {
  return axiosHack
    .get("/coseData/")
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
