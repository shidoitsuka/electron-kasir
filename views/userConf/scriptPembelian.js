const updateHarga = () => {
  let selectedBarang = document.getElementById("barang").value;
  let hargaBarang = db[selectedBarang].harga;
  let tipeBarang = db[selectedBarang].tipe;
  $("#jumlahBarang").attr("placeholder", `Jumlah Barang (per ${tipeBarang})`);
  $("#jumlahBarang").fadeIn(800);
};

const updateTotal = () => {
  let selectedBarang = document.getElementById("barang").value;
  let jumlah = document.getElementById("jumlahBarang").value;
  let total = db[selectedBarang].harga * jumlah;
  if (jumlah == 0) {
    $("#total").fadeOut(500);
    $("#proses-btn").fadeOut(500);
    $("#tambahBeli-btn").fadeOut(500);
  } else {
    $("#total").html(`Total Belanja : ${total}`);
    $("#total").fadeIn(500);
    $("#proses-btn").fadeIn(500);
    $("#tambahBeli-btn").fadeIn(500);
  }
};
