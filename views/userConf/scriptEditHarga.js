const showEditHarga = () => {
  const namaBarang = $("#selectEditHarga").val();
  const hargaBarang = db[namaBarang].harga;
  $(".fieldEditHarga").show();
  $("#editHarga").val(hargaBarang);
};
