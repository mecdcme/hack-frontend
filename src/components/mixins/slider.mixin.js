export default {
  data: () => ({
    periodValue: "201912",
    timePeriod: [
      { id: "201912", name: "Dec 19" },
      { id: "202001", name: "Jan 20" },
      { id: "202002", name: "Feb 20" },
      { id: "202003", name: "Mar 20" },
      { id: "202004", name: "Apr 20" },
      { id: "202005", name: "May 20" },
      { id: "202006", name: "Jun 20" },
      { id: "202007", name: "Jul 20" },
      { id: "202008", name: "Aug 20" },
      { id: "202009", name: "Sep 20" },
      { id: "202010", name: "Oct 20" },
      { id: "202011", name: "Nov 20" }
    ],
    policyPeriodValue: "201912",
    policyPeriod: [
      { id: "202102", name: "Feb 21" },
      { id: "202103", name: "Mar 21" },
      { id: "202104", name: "Apr 21" },
      { id: "202105", name: "May 21" },
      { id: "202106", name: "Jun 21" },
      { id: "202107", name: "Jul 21" },
      { id: "202108", name: "Aug 21" },
      { id: "202109", name: "Sep 21" },
      { id: "202110", name: "Oct 21" },
      { id: "202111", name: "Nov 21" },
      { id: "202112", name: "Dec 21" }
    ]
  }),
  methods: {
    getSliderPeriod(value) {
      var period = [];
      this.policyPeriod.forEach(element => {
        if (parseInt(element.id) <= parseInt(value)) period.push(element);
      });
      return period;
    }
  }
};
