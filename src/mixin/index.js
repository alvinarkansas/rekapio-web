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
  },
};
