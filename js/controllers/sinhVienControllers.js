let sinhVienControllers = {
  renderTable: function (arr) {
    let tBodyEl = document.getElementById("tbodySinhVien");

    let contentHTML = "";

    arr.map((item) => {
      let trContent = `<tr  class="student-for-search">
                         <td class="text-center">${item.idSv}</td>
                         <td>${item.name} </td>
                         <td>${item.email} </td>
                         <td class="text-center">${item.getDiemTb()}</td>
                         <td>
                         <button class="btn btn-success" onclick="suaSV(${
                           item.id
                         })">Sửa</button>
                         <button class="btn btn-danger"  onclick="xoaSV(${
                           item.id
                         })">Xoá</button>
                         </td>
                     </tr>`;

      contentHTML += trContent;
    });

    tBodyEl.innerHTML = contentHTML;
  },
  layThongTinTuForm: function () {
    let tenSV = document.getElementById("txtTenSV").value.trim();
    let maSV = document.getElementById("txtMaSV").value * 1;
    let mailSV = document.getElementById("txtEmail").value;

    let diemToan = document.getElementById("txtDiemToan").value;
    let diemLy = document.getElementById("txtDiemLy").value;
    let diemHoa = document.getElementById("txtDiemHoa").value;

    return {
      name: tenSV,
      email: mailSV,
      toan: diemToan,
      ly: diemLy,
      hoa: diemHoa,
      idSv: maSV,
    };
  },
};
