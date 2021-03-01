import { axiosHack } from "@/http";
export const chartjsScatterService = {
  findAll,
  findByName
};
function findAll() {
  return axiosHack
    .get("/timelapse/")

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
    .get("/timelapse?dataname=" + name)

    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
