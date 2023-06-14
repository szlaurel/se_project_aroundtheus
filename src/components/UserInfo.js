class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    this._name.value = this._name.textContent;
    this._job.value = this._job.textContent;
    return;
  }

  setUserInfo() {
    this._name.textContent = this._name.value;
    this._job.textContent = this._job.value;
  }
}

export default UserInfo;
