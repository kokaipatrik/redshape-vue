export default {
  methods: {
    valueStatus(value) {
      const v = Number(value);
      const status = this.getReferences().find(r => {
        if (v >= r.min && v <= r.max) {
          return r;
        }
      }).value;

      return status;
    },
    mealNameById(id) {
      switch (id) {
        case 0:
          return 'Breakfast 🥪';

        case 1:
          return 'Lunch 🍲';

        case 2:
          return 'Dinner 🍕';

        case 3:
          return 'Snack 🍿';
      }
    },
    getReferences() {
      return [
        {
          min: 0,
          max: 3.9,
          value: "low",
        },
        {
          min: 4.0,
          max: 6.3,
          value: "normal",
        },
        {
          min: 6.4,
          max: 8.0,
          value: "high",
        },
        {
          min: 8.1,
          max: 40.0,
          value: "danger",
        }
      ]
    },
  }
};
