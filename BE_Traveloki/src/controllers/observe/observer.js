class Observer {
  update(data) {
    throw new Error("Observer must implement update method");
  }
}

module.exports = Observer;
