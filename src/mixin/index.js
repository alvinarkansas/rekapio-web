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
      return `Rp ${this.groupDigit(value)}`;
    },
  },
};
