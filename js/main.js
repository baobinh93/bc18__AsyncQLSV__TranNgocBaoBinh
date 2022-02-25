let renderTaleDSSV = () => {
  sinhVienService
    .layDanhSachSinhVien()
    .then((res) => {
      convertedArr = res.data.map((item) => {
        let { name, email, toan, ly, hoa, id } = item;
        return new SV(name, email, toan, ly, hoa, id);
      });
      //console.log("convertedArr", convertedArr);
      sinhVienControllers.renderTable(convertedArr);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
renderTaleDSSV();

// thêm sinh viên
document.getElementById("btn-add").addEventListener("click", function () {
  let svOject = sinhVienControllers.layThongTinTuForm();
  let nameRemoveUnicode = remove_unicode(svOject.name);
  let isValid =
    validator.kiemTraDiem(svOject.toan, "spanToan") &
    validator.kiemTraDiem(svOject.ly, "spanLy") &
    validator.kiemTraDiem(svOject.hoa, "spanHoa") &
    validator.kiemTraEmail(svOject.email, "spanEmailSV") &
    validator.kiemTraSo(svOject.id, "spanMaSV") &
    (validator.kiemTraKiTu(nameRemoveUnicode, "spanTenSV") &&
      validator.kiemTraDoDai(nameRemoveUnicode, "spanTenSV"));

  isValid &&
    sinhVienService
      .themSinhVien(svOject)
      .then((res) => {
        renderTaleDSSV();
        alert("Thêm thành công");
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
});

function xoaSV(id) {
  sinhVienService
    .xoaSinhVien(id)
    .then((res) => {
      renderTaleDSSV();
      alert("Xoá thành công");
    })
    .catch((err) => {
      console.log(err);
    });
}

function suaSV(id) {
  sinhVienService.layChiTietSinhVien(id).then((res) => {
    let sinhVienCanSua = res.data;
    console.log(sinhVienCanSua);
    document.getElementById("txtTenSV").value = sinhVienCanSua.name;
    document.getElementById("txtMaSV").value = sinhVienCanSua.id;
    document.getElementById("txtMaSV").disabled = true;
    document.getElementById("btn-add").disabled = true;
    document.getElementById("btn-update").disabled = false;
    document.getElementById("txtEmail").value = sinhVienCanSua.email;

    document.getElementById("txtDiemToan").value = sinhVienCanSua.toan;
    document.getElementById("txtDiemLy").value = sinhVienCanSua.ly;
    document.getElementById("txtDiemHoa").value = sinhVienCanSua.hoa;
  });
}

function resetForm() {
  document.getElementById("formQLSV").reset();
  document.getElementById("txtMaSV").disabled = false;
  document.getElementById("btn-add").disabled = false;
  document.getElementById("btn-update").disabled = true;
  document.getElementById("spanTenSV").innerHTML = "";
  document.getElementById("spanEmailSV").innerHTML = "";
  document.getElementById("spanMaSV").innerHTML = "";
}

function capNhatSV() {
  let svOject = sinhVienControllers.layThongTinTuForm();
  let nameRemoveUnicode = remove_unicode(svOject.name);
  let isValid =
    validator.kiemTraEmail(svOject.email, "spanEmailSV") &
    validator.kiemTraSo(svOject.id, "spanMaSV") &
    validator.kiemTraDiem(svOject.toan, "spanToan") &
    validator.kiemTraDiem(svOject.ly, "spanLy") &
    validator.kiemTraDiem(svOject.hoa, "spanHoa") &
    (validator.kiemTraKiTu(nameRemoveUnicode, "spanTenSV") &&
      validator.kiemTraDoDai(nameRemoveUnicode, "spanTenSV"));

  isValid &&
    sinhVienService.capNhatSinhVien(svOject.id, svOject).then((res) => {
      renderTaleDSSV();
      resetForm();

      alert("cập nhật thành công");
    });
}

function remove_unicode(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    " "
  );

  str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
  str = str.replace(/^\-+|\-+$/g, "");

  return str;
}
