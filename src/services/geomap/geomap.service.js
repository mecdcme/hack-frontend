import { axiosHack } from "@/http";
export const geomapService = {
  findAll,
  findByName
};
function findAll() {
  return (
    axiosHack
      //.get("/mondo/")
      .get("/country/")
      .then(res => {
        var data = res.data ? res.data : {};
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      })
  );
}
function findByName(name) {
  return axiosHack
    .get("/country?country=" + name)
    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
