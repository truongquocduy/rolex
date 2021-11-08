window.onload = function(){
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))
    // console.log(mangsp[0].masp)
    for(let x of mangsp){
           if(x.sale == "sale"){
                var nodecha = document.createElement("div");
                nodecha.className = "sp col-6 col-lg-4 pl-3 pr-3 text-center pb-4 pt-4 " + x.danhmuc ;
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
                document.getElementById('khungsanpham').appendChild(nodecha);
           }
    }
    var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))
    var tong = 0;
    for(let x of giohang_mangsp){
        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
    }
    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';
}