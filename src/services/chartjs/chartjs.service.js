import { axiosHack } from "@/http";
export const chartjsService = {
  findAll,
  findById
};
function findAll(n) {
  return axiosHack
    .get("/chartjsData" + n)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function findById(id) {
  return axiosHack
    .get("/chartjsData/" + id)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
