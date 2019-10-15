const updateTabel = () => {
  const selectedTanggal = $("#selectGudang").val();
  const pembelian = Object.keys(pembeliandb[selectedTanggal]);
  pembelian.forEach(jam => {
    const jamBeli = Object.keys(pembeliandb[selectedTanggal][jam]).slice(0, -1);
    jamBeli.forEach(barang => {
      const total = pembeliandb[selectedTanggal][jam].total;
      const { harga, jumlah, subtotal } = pembeliandb[selectedTanggal][jam][
        barang
      ];
      $("#gudang").append(`<tr>
        <td>${jam}</td>
        <td>${barang}</td>
        <td>${toMoney(harga)}</td>
        <td>${jumlah}</td>
        <td>${toMoney(subtotal)}</td>
        <td>${toMoney(total)}</td>
        </tr>`);
      $("#tableGudang").show();
    });
  });
};
