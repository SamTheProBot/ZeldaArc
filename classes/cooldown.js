class Cooldown {
  constructor(cooldownTime) {
    this.lastActivationTime = Date.now();
    this.cooldownTime = cooldownTime;
  }
  isCooldownElapsed() {
    if (Date.now() - this.lastActivationTime > this.cooldownTime) {
      return true;
    }
  }
  updateActivationTime() {
    this.lastActivationTime = Date.now();
  }
}
