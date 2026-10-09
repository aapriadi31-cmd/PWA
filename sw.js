let totalEstimasi = 0;
let itemCount = 0;
const sisaPlafon = 12500000; // Contoh batas kas bebas dari omzet

function toggleItem(checkbox, hargasatuan) {
  const card = checkbox.closest('div');
  const qtyInput = card.querySelector('input[type="number"]');
  const qty = parseInt(qtyInput.value) || 1;
  const itemTotal = hargasatuan * qty;

  if (checkbox.checked) {
    totalEstimasi += itemTotal;
    itemCount++;
    card.classList.add('border-amber-400/50', 'bg-slate-800/90');
  } else {
    totalEstimasi -= itemTotal;
    itemCount--;
    card.classList.remove('border-amber-400/50', 'bg-slate-800/90');
  }

  updateSummary();
}

function updateSummary() {
  document.getElementById('totalEstimasiPo').innerText = 'Rp ' + totalEstimasi.toLocaleString('id-ID');
  document.getElementById('selectedCount').innerText = itemCount;

  const statusElement = document.getElementById('statusAnggaran');
  if (totalEstimasi > sisaPlafon) {
    statusElement.innerText = '⚠️ Over Budget!';
    statusElement.className = 'text-xs font-semibold text-red-400';
  } else {
    statusElement.innerText = 'Status: Safe';
    statusElement.className = 'text-xs font-semibold text-emerald-400';
  }
}

function submitOrder() {
  if (itemCount === 0) {
    alert('Pilih minimal 1 obat untuk dipesan.');
    return;
  }
  if (totalEstimasi > sisaPlafon) {
    alert('Total pesanan melebihi sisa plafon belanja 65%! Kurangi kuantitas atau obat non-vital.');
    return;
  }
  alert('Surat Pesanan (SP) berhasil dibuat dan disinkronkan ke Firebase!');
}
