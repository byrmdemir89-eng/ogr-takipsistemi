// Çalışma Geçmişini Getir
function gecmisiGetir(no) {
    console.log("Çalışma geçmişi isteniyor... No:", no);
    
    // URL parametresinin action=gecmis ve no şeklinde gittiğinden emin oluyoruz
    fetch(`${SCRIPT_URL}?action=gecmis&no=${encodeURIComponent(no)}&t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
        console.log("Sunucudan gelen geçmiş verisi:", data);
        const tbody = document.getElementById('historyTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = "";
        
        if (data.success && data.gecmis && data.gecmis.length > 0) {
            data.gecmis.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.tarih || '-'}</td>
                    <td>${item.gun || '-'} (${item.blok || '-'})</td>
                    <td>${item.ders || '-'}</td>
                    <td>${item.hedef || '0'}</td>
                    <td>${item.cozulen || '0'}</td>
                    <td><b>${item.net || '0.00'}</b></td>
                    <td style="color: ${item.durum === 'Tamamlandı' ? 'green' : 'red'};">${item.durum || '-'}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="7">Henüz kayıtlı çalışmanız bulunmuyor.</td></tr>`;
        }
    })
    .catch(err => {
        console.error("Geçmiş yükleme hatası:", err);
        const tbody = document.getElementById('historyTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="7" style="color:red;">Geçmiş yüklenirken bağlantı hatası oluştu.</td></tr>`;
        }
    });
}