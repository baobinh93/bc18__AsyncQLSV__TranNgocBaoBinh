function SV(name, email, toan, ly, hoa, idSv = 123, id) {
  this.name = name;
  this.email = email;
  this.toan = toan;
  this.ly = ly;
  this.hoa = hoa;
  this.idSv = idSv;
  this.id = id;
  this.getDiemTb = function () {
    return ((this.toan * 1 + this.hoa * 1 + this.ly * 1) / 3).toFixed(1);
  };
}
