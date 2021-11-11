/**
 * function dưới đây chạy trước khi trang sản phẩm hot được load 
 * Ý tưởng: lấy mảng sản phẩm từ localstorage, dùng vòng lặp for duyệt mảng, tạo element theo tầng và gán giá trị từ mảng để tạo NodeElement gán vào html
 */
window.onload = function(){
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))// lấy mảng sản phẩm từ localstorage
    // alert(mangsp[7].sale)
    for(let x of mangsp){
        if(x.sale != 'sale'){//nếu x.sale khác 'sale' mới xuất..vì nếu là sale sẽ xuất ở trang sale.html
            var nodecha = document.createElement("div");//tạo thẻ div
            nodecha.className = "sp col-6 col-lg-4 pl-3 pr-3 text-center pb-4 pt-4 " + x.danhmuc ;//class bootstrap 4 và x.danhmuc để lọc sản phẩm theo danh mục sau này.
            nodecha.id = x.masp;// id để khi click sản phẩm sẽ xử lí phần trang con (product_page.html)
            nodecha.setAttribute('onclick',"clicksanpham('"+ x.masp + "')");

            var nodecon_img = document.createElement("IMG");//Tạo thẻ img 
            nodecon_img.setAttribute('src',x.hinhsp);
            nodecon_img.className = "w-100";

            var nodecon_title = document.createElement("H6")//Tạo thẻ h6 để chứa tên sản phẩm
            nodecon_title.setAttribute('style','color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;')
            nodecon_title.className = "mt-3";
            nodecon_title.innerText = x.tensp;

            var nodecon_gia = document.createElement("strong");// tạo thẻ strong để đưa giá vào
            nodecon_gia.innerText = x.giasp;
            //đẩy thẻ img, h6, strong và Div
            nodecha.appendChild(nodecon_img);
            nodecha.appendChild(nodecon_title);
            nodecha.appendChild(nodecon_gia);
            document.getElementById('khungsp').appendChild(nodecha);//đẩy div vào khung chứa sản phẩm
       }

    }
    //đây là phần tính tổng và dán vào ngay bên trái icon giỏ hàng khung header
    var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))
    var tong = 0;
    for(let x of giohang_mangsp){
        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
    }
    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';

}

// Xử lí phần hiện thị sản phẩm theo mới nhất cũ nhất tại trang sanphamhot.html
var hienthi = document.getElementById('hienthi');//DOM đến thẻ selection
//Nếu thẻ selection có sự thay đổi về giá trị thì thực thi hàm dưới bằng sự kiện onchange
hienthi.onchange = function(){
    var khungsp = document.getElementById('khungsp').children;// tức là DOM đến thẻ div chứa từng sản phẩm 1
    if(hienthi.options[hienthi.selectedIndex].value == "moinhat"){// nếu thẻ selection có value là mới nhất:
        document.getElementById('khungsp').innerHTML = "";// đầu tiên phải reset khung chứa sản phẩm, để dán kết quả vào k bị lặp sản phẩm
        var mangloc= JSON.parse(localStorage.getItem('sanphammoi_array'))// lấy mảng chứa sản phẩm từ local về
        // console.log(mangsp[0].masp)
        //duyệt sản phẩm theo hướng ngược lại vì khi push sản phẩm mới nhất ở cuối mảng
        for(let i = mangloc.length-1; i>=0; i--){
            var nodecha = document.createElement("div");
            nodecha.className = "sp col-6 col-lg-4 pl-3 pr-3 text-center pb-4 pt-4 mt-3 " + mangloc[i].danhmuc;
            nodecha.id = mangloc[i].masp;
            nodecha.setAttribute('onclick',"clicksanpham('"+ mangloc[i].masp + "')");

            var nodecon_img = document.createElement("IMG");
            nodecon_img.setAttribute('src',mangloc[i].hinhsp);
            nodecon_img.className = "w-100";

            var nodecon_title = document.createElement("H6")
            nodecon_title.setAttribute('style','color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;')
            nodecon_title.className = "mt-3";
            nodecon_title.innerText = mangloc[i].tensp;

            var nodecon_gia = document.createElement("strong");
            nodecon_gia.innerText = mangloc[i].giasp;

            nodecha.appendChild(nodecon_img);
            nodecha.appendChild(nodecon_title);
            nodecha.appendChild(nodecon_gia);
            document.getElementById('khungsp').appendChild(nodecha);

        }
    }
    if(hienthi.options[hienthi.selectedIndex].value == "macdinh"){//Nếu selection có giá trị là macdinh thì hiện thị như code onload sản phẩm-- tức là vòng lặp for đi từ đầu mảng
        document.getElementById('khungsp').innerHTML = "";
        var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))

        for(let x of mangsp){
            var nodecha = document.createElement("div");
            nodecha.className = "sp col-6 col-lg-4 pl-3 pr-3 text-center pb-4 pt-4 mt-3 " + x.danhmuc;
            nodecha.id = x.masp;
            nodecha.setAttribute('onclick',"clicksanpham('"+ x.masp + "')");

            var nodecon_img = document.createElement("IMG");
            nodecon_img.setAttribute('src',x.hinhsp);
            nodecon_img.className = "w-100";

            var nodecon_title = document.createElement("H6")
            nodecon_title.setAttribute('style','color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;')
            nodecon_title.className = "mt-3";
            nodecon_title.innerText = x.tensp;

            var nodecon_gia = document.createElement("strong");
            nodecon_gia.innerText = x.giasp;

            nodecha.appendChild(nodecon_img);
            nodecha.appendChild(nodecon_title);
            nodecha.appendChild(nodecon_gia);
            document.getElementById('khungsp').appendChild(nodecha);

        }
    }
}