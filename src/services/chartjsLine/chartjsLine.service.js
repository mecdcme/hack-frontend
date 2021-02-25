import { axiosHack } from "@/http";
export const chartjsLineService = {
  findAll,
  findByName
};
function findAll() {
  return (
    axiosHack

      .get("/timelaps/")
      //.get("/scatterDemo/")
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
    .get("/timelaps?dataname=" + name)
    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
