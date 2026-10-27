// Öğretmenden Gelen Ödevleri Getir
function ogrenciOdevleriniGetir() {
    const tbody = document.getElementById('odevlerTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = `<tr><td colspan="6">Ödevler yükleniyor...</td></tr>`;

    // Gönderilen parametreleri konsoldan takip edin
    console.log("Ödevler isteniyor... No:", aktifNo, "Sınıf:", aktifSinif, "Şube:", aktifSube);

    const url = `${SCRIPT_URL}?action=ogrenciOdevleriGetir&ogrNo=${encodeURIComponent(aktifNo)}&sinif=${encodeURIComponent(aktifSinif)}&sube=${encodeURIComponent(aktifSube)}&t=${Date.now()}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log("Sunucudan gelen ödev verisi:", data); // Konsoldan gelen yanıtı inceleyin
        tbody.innerHTML = "";

        if (data.success && data.odevler && data.odevler.length > 0) {
            data.odevler.forEach(odev => {
                const tr = document.createElement('tr');
                const tamamlandiMi = odev.durum === "Tamamlandı";
                
                tr.innerHTML = `
                    <td>${odev.tarih || '-'}</td>
                    <td><b>${odev.ders || '-'}</b></td>
                    <td>${odev.konu || '-'}</td>
                    <td>${odev.tarih || 'Süresiz'}</td>
                    <td><span class="${tamamlandiMi ? 'badge-success' : 'badge-warning'}">${odev.durum || 'Bekliyor'}</span></td>
                    <td>
                        ${tamamlandiMi ? '✅ Tamamlandı' : `<button class="btn-complete" onclick="odevTamamla('${odev.odevID}')">Tamamla</button>`}
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="6">Henüz tarafınıza atanmış bir ödev bulunmamaktadır.</td></tr>`;
        }
    })
    .catch(err => {
        console.error("Ödev yükleme hatası:", err);
        tbody.innerHTML = `<tr><td colspan="6" style="color:red;">Ödevler yüklenirken bağlantı hatası oluştu.</td></tr>`;
    });
}