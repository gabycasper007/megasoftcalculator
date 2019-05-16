module.exports = class Now {
  static getLastMonday() {
    let date = new Date();
    const day = date.getDay() || 7;

    date.setDate(date.getDate() - day + 1);
    return this.getStartOfDay(date);
  }

  static getStartOfDay(date = new Date()) {
    return this.getLocalTime(new Date(date.setHours(0, 0, 0, 0)));
  }

  static getFirstDayOfMonth() {
    const date = new Date();
    return this.getStartOfDay(new Date(date.setDate(1)));
  }

  static getLocalTime(date = new Date()) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }
};
