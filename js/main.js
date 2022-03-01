let dsMaSv = [];
let dsSv = [];
let idSinhVienCanSua;
let renderTaleDSSV = () => {
  sinhVienService
    .layDanhSachSinhVien()
    .then((res) => {
      convertedArr = res.data.map((item) => {
        let { name, email, toan, ly, hoa, id, idSv } = item;
        dsMaSv.push(idSv * 1);

        return new SV(name, email, toan, ly, hoa, idSv, id);
      });

      sinhVienControllers.renderTable(convertedArr);
      dsSv = Array.from(convertedArr);
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
  // console.log(dsMaSv);
  // console.log(svOject.idSv);
  // console.log(dsMaSv.includes(svOject.idSv * 1));

  let isValid =
    validator.kiemTraDiem(svOject.toan, "spanToan") &
    validator.kiemTraDiem(svOject.ly, "spanLy") &
    validator.kiemTraDiem(svOject.hoa, "spanHoa") &
    validator.kiemTraEmail(svOject.email, "spanEmailSV") &
    (validator.kiemTraSo(svOject.idSv, "spanMaSV") &&
      validator.kiemTraIdDaSuDung(svOject.idSv * 1, dsMaSv, "spanMaSV")) &
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
    idSinhVienCanSua = id;

    document.getElementById("txtTenSV").value = sinhVienCanSua.name;
    document.getElementById("txtMaSV").value = sinhVienCanSua.idSv;
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
  svOject.id = idSinhVienCanSua;
  let nameRemoveUnicode = remove_unicode(svOject.name);
  console.log();
  let isValid =
    validator.kiemTraEmail(svOject.email, "spanEmailSV") &
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

document.getElementById("txtSearch").addEventListener("keyup", function (e) {
  console.log(e.target.value);
  if (e.target.value && e.target.value.trim() != "") {
    let dsIdSvPhuHop = timSvTheoTen(e.target.value);
    let getAllRowOfStudentTable =
      document.getElementsByClassName("student-for-search");
    for (let row of getAllRowOfStudentTable) {
      row.classList.remove("text-danger", "font-weight-bold");
    }
    console.log(document.getElementsByClassName("student-for-search").length);
    dsIdSvPhuHop.forEach((id) => {
      document
        .getElementsByClassName("student-for-search")
        [id].classList.add("text-danger", "font-weight-bold");
    });
  }
});

function timSvTheoTen(_string) {
  let dsTenSv = dsSv.map((sv) => {
    return remove_unicode(sv.name).trim();
  });
  let dsIdSvPhuHop = [];
  dsTenSv.forEach((name, index) => {
    if (name.includes(_string.trim())) {
      dsIdSvPhuHop.push(index);
    }
  });
  console.log(dsIdSvPhuHop);
  return dsIdSvPhuHop;
}
// let test = "tran ngoc bao binh";
// console.log(test.includes("bin"));
//console.log(timSvTheoTen("binh"));
