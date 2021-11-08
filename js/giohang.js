/**
 * Phương thức khi người dùng nhất nút xóa giỏ hàng
 */
xoagiohang = () => {
    localStorage.removeItem('giohang_mang');// biến giỏ hàng trên localstorage sẽ bị xóa
    window.location.href = '../html/giohang.html'// sau đó load lại trang web..vì lúc này mảng giỏ hàng là mảng trống nên không xuất kết quả ra màn hình
}
    //khi load trang giỏ hàng
    window.onload = function(){
        var table = document.getElementById('banggiohang');// DOM đến table giỏ hàng
        var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))// lấy mảng giỏ hàng và gán vào biến
        // vòng lặp for này dùng để xóa tất cả những dòng trong table..vì nếu không xóa, mỗi lần load trang table cứ thể mà tăng cấp số nhân
        for(let i = table.rows.length - 1; i > 0 ; i-- ){
            table.deleteRow(i);
        }

        for(let x of giohang_mangsp){
            var row = table.insertRow();//tạo dòng mới trong table
            cell1 = row.insertCell();//tạo cột 1
            cell1.innerHTML = '<img src="' + x.hinhsp +'" width="70px" alt="">';//gán giá trị là một thẻ img chứ src là đường dẫn hình ảnh
            cell2 = row.insertCell();// tạo cột 2
            cell2.innerText = x.giasp; // gán giá sản phẩm vào cột 2
            cell3 = row.insertCell();//Tạo cột 3
            cell3.innerText = "1";// gán giá trị 1 chính là số lượng sản phẩm mặc định là 1 sản phẩm
            cell4 = row.insertCell();//tạo cột 4
            cell4.innerText = x.giasp;// gán giá sản phẩm vào cột 4
        }

        //tổng phụ
         var sale = document.getElementById('mgg');// DOM đến input nhập mã giảm giá
        tinhtongtien();

        sale.onchange = function(){// nếu thẻ input có sự thay đổi sẽ gọi function tinhtongtien()
            tinhtongtien();
            }

        /**
         * Phương thức tính tổng tiền.
         */
        function tinhtongtien(){
                var tong = 0;
                var tongphu = 0;
                if(sale.value == 'quocduy123'){// nếu input mã giảm giá đúng với value đấy thì.
                    // chạy vòng lặp tính tổng tiền tất cả sản phẩm trong mảng giỏ hàng
                    for(let x of giohang_mangsp){
                        // vì khi thêm sản phẩm, phần giá đưa vào là một chuỗi có các kí tự ',' '₫' 'đ' nên phải loại bỏ thay bằng kí tự rỗng, sau đổi parseInt để đưa chuỗi thành mảng
                        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
                        tongphu = tong;//lưu biến tổng phụ trước khi áp dụng mã giảm giá..để lưu lại số tiền trước khi kích hoạt mã giảm giá
                    }
                    tong = tong - (tong*50/100);//số tiền khi đã áp dụng mã giảm giá
                    document.getElementById('tongphu').innerText = tongphu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    document.getElementById('tongtien').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
                else{// nếu không nhập mã giảm giá, hoặc mã giảm giá khác 'quocduy123'
                    for(let x of giohang_mangsp){
                        // vì khi thêm sản phẩm, phần giá đưa vào là một chuỗi có các kí tự ',' '₫' 'đ' nên phải loại bỏ thay bằng kí tự rỗng, sau đổi parseInt để đưa chuỗi thành mảng
                        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
                    }
                    document.getElementById('tongphu').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    document.getElementById('tongtien').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
       }
    }
    /**
     * phương thức khi nhấn nút đặt hàng sẽ gửi mail thông báo
     */
     function sendmail(){
        var giohang_mang = JSON.parse(localStorage.getItem('giohang_mang'));
        var phuongthucthanhtoan = document.getElementById('phuongthucthanhtoan')
        if(phuongthucthanhtoan.thanhtoan.value == 'tienmat'){
            phuongthucthanhtoan = 'Thanh toán khi nhận hàng';
        }
        else{
            phuongthucthanhtoan = 'Thanh toán bằng momo';
        }
        var tongtrigia = document.getElementById('tongtien').innerText;
        var form = document.getElementById('thanhtoan_form')
        var name = form.hoten.value;
        var email = form.email.value;
        var diachi = form.diachi.value;
        var tinhthanh = form.tinhthanh.value;
        var sdt = form.sdt.value;
        var subject = 'Thông tin đặt hàng';

        var Body='Subject: '+ subject + '<br>Họ và tên: '+name + '<br>Địa chỉ: ' + diachi + '<br>Tỉnh Thành phố: ' + tinhthanh +'<br>Số điện thoại: '+sdt + '<br>Email: ' + email + '<br><br> CÁC SẢN PHẨM' + '<br>';
        //console.log(name, phone, email, message);
        for(let x of giohang_mang){
            Body += x.tensp + ', trị giá: ' + x.giasp + '<br>';
        }
        Body += '<br><br>Phương thức thanh toán: ' + phuongthucthanhtoan + '<br>TỔNG TRỊ GIÁ: ' + tongtrigia + ' VNĐ';

    Email.send({
        SecureToken:"fbf31702-bb7f-4a4e-9c1c-4ccf17ee777f",
				To: 'quocduy13579113@gmail.com',
				From: "quocduy13579114@gmail.com",
				Subject: name + ' vừa mới đặt hàng',
				Body: Body
			}).then(
				message =>{
					//console.log (message);
					if(message=='OK'){
					alert('Đặt hàng thành công!!!.');
					}
					else{
						console.error (message);
						alert('Đặt hàng không thành công, xin hãy kiểm tra lại thông tin. ')
						
					}

				}
			);
    Email.send({
        SecureToken:"fbf31702-bb7f-4a4e-9c1c-4ccf17ee777f",
                To: email,
                From: "quocduy13579114@gmail.com",
                Subject: name + ' vừa mới đặt hàng',
                Body: Body
            })
}