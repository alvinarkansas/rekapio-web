import { useToast } from "vue-toastification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default {
  methods: {
    groupDigit(value) {
      let grouped = value;
      if (value) {
        if (!Number.isNaN(Number(value)) || value !== "NaN") {
          grouped = +value;
          if (value % 1 !== 0) {
            grouped = value.toFixed(0);
          }
          return grouped.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
      }
      return "0";
    },
    toRupiah(value) {
      if (value < 0) {
        return `-Rp ${this.groupDigit(value)?.slice(1)}`;
      } else {
        return `Rp ${this.groupDigit(value)}`;
      }
    },
    toInteger(amount) {
      return amount ? parseInt(amount.replace(/,.*|[^0-9]/g, ""), 10) : 0;
    },
    revealError(error) {
      const toast = useToast();

      if (error.response) {
        /* The request was made and the server responded with a status code that falls out of the range of 2xx */
        console.log("❌ ERROR.RESPONSE: ", error.response);
        if (error.response.data?.message?.length) {
          for (let msg of error.response.data?.message) {
            toast.error(msg);
          }
          return;
        }

        if (error.response.data) {
          toast.error(error.response.data);
          return;
        }
      } else if (error.request) {
        /* The request was made but no response was received */
        console.log("❌ ERROR.REQUEST: ", error.request);
        toast.error(
          "No response from server, try refreshing the page or force close the app"
        );
      } else {
        /* Something happened in setting up the request that triggered an Error */
        console.log("❌ ERROR.MESSAGE: ", error.message);
        toast.error(
          "Something went wrong, try refreshing the page or force close the app"
        );
      }
    },
    getDates(startDate, stopDate) {
      Date.prototype.addDays = function (days) {
        let addedDate = new Date(this.valueOf());
        addedDate.setDate(addedDate.getDate() + days);
        return addedDate;
      };

      let dates = new Array();
      let currentDate = startDate;
      while (currentDate <= stopDate) {
        if (dayjs(currentDate).diff(dayjs(), "day") !== 0) {
          dates.push(dayjs(currentDate).format("D MMM YYYY"));
        } else {
          dates.push("Today");
        }
        currentDate = currentDate.addDays(1);
      }
      return dates;
    },
  },
};
