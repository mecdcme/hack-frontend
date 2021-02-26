import { axiosHack } from "@/http";
export const chartjsBarService = {
  findAll,
  findByName
};
function findAll() {
  return axiosHack

    .get("/covid/")
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
    .get("/covid?country=" + name)
    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
