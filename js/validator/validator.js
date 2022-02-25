let validator = {
  kiemTraEmail: function (value, idErr) {
    let parten = /\S+@\S+\.\S+/;
    let errEl = document.getElementById("spanEmailSV");

    if (value == "") {
      errEl.innerText = "Vui lòng điền email";
      return false;
    }
    if (parten.test(value)) {
      errEl.innerText = "";
      return true;
    } else {
      errEl.innerText = "Email không hợp lệ";
      return false;
    }
  },
  kiemTraSo: function (value, idErr) {
    let errEl = document.getElementById(idErr);
    let parten = new RegExp("^(0|[1-9][0-9]*)$");
    if (parten.test(value)) {
      errEl.innerText = "";
      return true;
    } else {
      errEl.innerText = "Trường này phải điền số";
      return false;
    }
  },
  kiemTraKiTu: function (value, idErr) {
    let errEl = document.getElementById(idErr);

    let parten = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/g;
    if (parten.test(value)) {
      errEl.innerText = "";
      return true;
    } else {
      errEl.innerText = "Trường này phải điền chữ";
      return false;
    }
  },
  kiemTraDoDai: function (value, idErr) {
    errEl = document.getElementById(idErr);

    let length = value.trim().length;
    if (length < 5) {
      errEl.innerText = "Độ dài tối thiểu phải  lớn hơn 5";
      return false;
    }
    if (length > 15) {
      errEl.innerText = "Độ dài tối đa phải  bé hơn 15";
      return false;
    }
    errEl.innerText = "";
    return true;
  },
  kiemTraDiem: function (value, idErr) {
    errEl = document.getElementById(idErr);

    if (value >= 0 && value <= 10) {
      errEl.innerText = "";
      return true;
    }

    errEl.innerText = "Thang điểm 0-10";
    return false;
  },
};
