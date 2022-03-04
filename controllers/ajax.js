function renderTableSinhVien(mangSV) {
  var sHTML = "";
  for (var index = 0; index < mangSV.length; index++) {
    //Mỗi lần duyệt lấy ra 1 sinh viên
    var sinhVien = mangSV[index];
    sHTML += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.soDienThoai}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')" > Xoá </button>
                    <button class="btn btn-primary ml-2" onclick="suaSinhVien('${sinhVien.maSinhVien}')">Chỉnh sửa</button>
                </td>
            </tr>
        `;
  }
  console.log("shtml", sHTML);
  //Ra khỏi vòng lặp for dom đến thẻ tbody đưa html vào
  document.querySelector("#tblSinhVien").innerHTML = sHTML;
}

function getApiSinhVien() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien",
    method: "GET",
  });

  // Thành công
  promise.then(function (result) {
    console.log("result", result.data);
    // Sau khi lấy dữ liệu từ backend về -> gọi hàm để dữ liệu hiện lên table
    renderTableSinhVien(result.data);
  });

  // Thất bại
  promise.catch(function (error) {
    console.log(error);
  });
}

// Gọi hàm ngay khi web vừa load
getApiSinhVien();

document.querySelector("#btnXacNhan").onclick = function () {
  // Lấy thông tin từ người dùng nhập vào -> chứa trong format object backend yêu cầu
  var sv = new SinhVien();
  sv.maSinhVien = document.querySelector("#maSinhVien").value;
  sv.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sv.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  sv.diemToan = document.querySelector("#diemToan").value;
  sv.diemLy = document.querySelector("#diemLy").value;
  sv.diemHoa = document.querySelector("#diemHoa").value;
  sv.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sv.email = document.querySelector("#email").value;
  sv.soDienThoai = document.querySelector("#soDienThoai").value;

  console.log("sv", sv);

  // Dùng axios gửi dữ liệu lên backend (thêm dữ liệu vào phía backend)
  var promise = axios({
    url: "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
    method: "POST",
    data: sv,
  });

  // Thành công
  promise.then(function (result) {
    console.log("result", result.data);
    // Gọi api lấy danh sách sinh viên mới nhất từ server về
    getApiSinhVien();
  });

  promise.catch(function (error) {
    console.log("error", error);
  });
};

// XÓA SINH VIÊN
function xoaSinhVien(maSinhVienClick) {
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=" +
      maSinhVienClick,
    method: "DELETE",
  });

  // Thành công
  promise.then(function (result) {
    console.log("result", result.data);
    // Gọi api get sinh viên mới về sau khi xóa
    getApiSinhVien();
  });

  // Thất bại
  promise.catch(function (error) {
    console.log("error", error);
  });
}

// SỬA SINH VIÊN
function suaSinhVien(maSinhVienClick) {
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=" +
      maSinhVienClick,
    method: "GET",
  });

  promise.then(function (result) {
    // Lấy thông tin sinh viên gán lên thẻ input
    var sinhVien = result.data;
    document.querySelector("#maSinhVien").value = sinhVien.maSinhVien;
    document.querySelector("#tenSinhVien").value = sinhVien.tenSinhVien;
    document.querySelector("#loaiSinhVien").value = sinhVien.loaiSinhVien;
    document.querySelector("#diemRenLuyen").value = sinhVien.diemRenLuyen;
    document.querySelector("#email").value = sinhVien.email;
    document.querySelector("#soDienThoai").value = sinhVien.soDienThoai;
    document.querySelector("#diemToan").value = sinhVien.diemToan;
    document.querySelector("#diemLy").value = sinhVien.diemLy;
    document.querySelector("#diemHoa").value = sinhVien.diemHoa;
  });
}

document.querySelector("btnCapNhat").onclick = function () {
  // Lấy thông tin sinh viên sau khi người dùng thay đổi
  var sinhVienUpdate = new SinhVien();
  sinhVienUpdate.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVienUpdate.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVienUpdate.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sinhVienUpdate.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  sinhVienUpdate.email = document.querySelector("#email").value;
  sinhVienUpdate.soDienThoai = document.querySelector("#soDienThoai").value;
  sinhVienUpdate.diemToan = document.querySelector("#diemToan").value;
  sinhVienUpdate.diemLy = document.querySelector("#diemLy").value;
  sinhVienUpdate.diemHoa = document.querySelector("#diemHoa").value;

  var promise=axios({
      url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sinhVienUpdate.maSinhVien,
      method:'PUT',
  })

  promise.then(function(result){
      console.log('result', result.data);
      // Gọi lại api load sinh viên về
      getApiSinhVien();
  })

  promise.catch(function(error){
      console.log('error',error);
  })
};


// Callback function là function đóng vai trò là tham số truyền vào function khác

function main(callback){ 
    callback('cybersoft');
}

function renderH3(content){ 
    document.querySelector('#content').innerHTML= '<h3>'+content+'</h3>'
}

main(renderH3);