function renderSanPham(arraySanPham) {
    chuoi = ''; // chuỗi html
    for (index = 0; index < arraySanPham.length; index++) {
        var sp = arraySanPham[index]; // lấy từng phần tử trong xuất ra table
        chuoi += `
        <tr>
            <th>${sp.id}</th>
            <th><img src="${sp.img}" style="width:100%"/></th>
            <th>${sp.name}</th>
            <th>${sp.price}</th>
            <th>${sp.description}</th>
            <th>${sp.type}</th>
            <td>
                    <button class="btn btn-warning ml-2 " onclick="chinhSua('${sp.id}')">Sửa</button>
            </td>
            <td>
                    <button class="btn btn-danger " onclick="xoaSanPham('${sp.id}')">Xoá</button>
            </td>
        </tr>
        `;
    }
    document.querySelector('#tblSanPham').innerHTML = chuoi;
}

function layDanhSachSanPhamAPI() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET' // method backend cung cấp
    });

    // xử lí thành công
    promise.then(function (result) {
        console.log(result.data)
        // sau khi lấy dữ liệu từ backend thì xuất ra table
        renderSanPham(result.data)
    });
    // xử lí thất bại
    promise.catch(function (err) {
        console.log(err)
    })
}
// lấy dữ liệu khi trang wed vừa loand lên
window.onload = function () {
    layDanhSachSanPhamAPI();
}

/*----------POST : thêm dữ liệu (tạo dữ liệu) */
document.querySelector('#btnKhoiTao').onclick = function () {
    var sanPham = new Product();
    // LẤY THÔNG tin từ người dùng nhập liệu
    sanPham.id = document.querySelector('#product_id').value;
    sanPham.name = document.querySelector('#product_name').value;
    sanPham.price = document.querySelector('#product_price').value;
    sanPham.img = document.querySelector('#product_image_link').value;
    sanPham.type = document.querySelector('#product_type').value;
    sanPham.description = document.querySelector('#product_description').value;
    //console.log(sinhVien);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: sanPham// dữ liệu
    })
    promise.then(function (result) {
        console.log(result.data)
        layDanhSachSanPhamAPI();
    });
    promise.catch(function (err) {
        console.log(err)

    })
}
// hàm xóa dữ liệu
function xoaSanPham(maSanPhamClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + maSanPhamClick,
        method: 'DELETE'

    });
    promise.then(function (result) {
        console.log(result.data)
        // gọi danh sách sau khi render thành công
        layDanhSachSanPhamAPI();
    });
    promise.catch(function (err) {
        console.log(err);
    });

}

// hàm chỉnh sửa
function chinhSua(id) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + id,
        method: 'GET'
    })
    promise.then(function (result) {
        var sanPham = result.data;
        // dem sinh viên load lên table
        document.querySelector('#product_id').value = sanPham.id;
        document.querySelector('#product_name').value = sanPham.name;
        document.querySelector('#product_price').value = sanPham.price;
        document.querySelector('#product_image_link').value = sanPham.img;
        document.querySelector('#product_type').value = sanPham.type;
        document.querySelector('#product_description').value = sanPham.description;
    })
    promise.catch(function (err) {
        console.log(err)
    })
}

// Put dữ liệu
document.querySelector('#btnCapNhat').onclick = function () {
    var sanPhamUpDate = new Product();
    sanPhamUpDate.id = document.querySelector('#product_id').value;
    sanPhamUpDate.name = document.querySelector('#product_name').value;
    sanPhamUpDate.price = document.querySelector('#product_price').value;
    sanPhamUpDate.img = document.querySelector('#product_image_link').value;
    sanPhamUpDate.type = document.querySelector('#product_type').value;
    sanPhamUpDate.description = document.querySelector('#product_description').value;
    // call gọi api
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + sanPhamUpDate.id,
        method: 'PUT',
        data: sanPhamUpDate
    })
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSanPhamAPI();
    })
    promise.catch(function (err) {
        console.log(err)
    })
} 
// hàm tìm kiếm lấy dữ liệu
document.querySelector('#btnTimKiem').onclick =function(){
    console.log("Ô")
    var thongBao = document.querySelector('#tuKhoa').value;
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/SearchByName?name='+thongBao,
        method:'GET'
    })
    promise.then(function(result){
        console.log(result.data)
      
        renderSanPham(result.data)
        document.querySelector('#err_notfind').innerHTML = '';
    })
    promise.catch(function(err){
        console.log(err.response.data.content)
        //dom
        document.querySelector('#err_notfind').innerHTML = 'Không tìm thấy giá trị !';
        layDanhSachSanPhamAPI();
    })
}
