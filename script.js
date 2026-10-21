// Menunggu seluruh elemen dokumen HTML dimuat dengan sempurna
document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------------------
    // 1. INISIALISASI GRAFIK TEKNIKAL (CHARTBIT LAYOUT)
    // -------------------------------------------------------------
    const ctx = document.getElementById('stockbitChart').getContext('2d');
    
    // Membuat efek gradien memudar ke bawah khas platform trading pro
    const greenGradient = ctx.createLinearGradient(0, 0, 0, 300);
    greenGradient.addColorStop(0, 'rgba(38, 166, 154, 0.25)'); // Hijau transparan di atas
    greenGradient.addColorStop(1, 'rgba(38, 166, 154, 0.0)');  // Hilang total di bawah

    // Pembuatan objek Chart.js
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['09:00', '10:00', '11:00', '13:30', '14:30', '15:00', '16:00'],
            datasets: [{
                label: 'BBCA Intraday Price',
                data:,
                borderColor: '#26A69A',        // Garis grafik utama hijau
                borderWidth: 2,
                backgroundColor: greenGradient,
                fill: true,                    // Mengaktifkan arsiran gradien bawah
                pointRadius: 2,
                pointBackgroundColor: '#26A69A',
                tension: 0.15                  // Kelenturan lengkungan garis
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }     // Menyembunyikan label kotak atas bawaan
            },
            scales: {
                x: {
                    grid: { color: '#161B22' },// Warna grid vertikal samar
                    ticks: { color: '#8B949E', font: { size: 10, family: 'Inter' } }
                },
                y: {
                    grid: { color: '#161B22' },// Warna grid horisontal samar
                    ticks: { color: '#8B949E', font: { size: 10, family: 'Inter' } }
                }
            }
        }
    });

    // -------------------------------------------------------------
    // 2. LOGIKA FITUR VAULTSTREAM (TAMBAH DISKUSI INTERAKTIF)
    // -------------------------------------------------------------
    const streamInput = document.getElementById('streamInput');
    const streamBtn = document.getElementById('streamBtn');
    const streamFeed = document.getElementById('streamFeed');

    function addNewPost() {
        const textValue = streamInput.value.trim();
        
        if (textValue !== "") {
            // Membuat elemen kontainer postingan baru
            const postElement = document.createElement('div');
            postElement.className = "border-b border-stkBorder/60 pb-3 space-y-1.5 animate-fade-in";
            
            // Menyusun elemen HTML internal untuk struktur postingan baru
            postElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-white">@InvestorMuda_ID</span>
                    <span class="text-[10px] text-stkGreen font-mono font-medium">Just Now</span>
                </div>
                <p class="text-stkText text-xs font-light leading-relaxed">${textValue}</p>
            `;
            
            // Menyisipkan postingan baru di baris paling atas feed diskusi
            streamFeed.insertBefore(postElement, streamFeed.firstChild);
            
            // Mengosongkan kembali kolom input ketikan
            streamInput.value = "";
            
            // Otomatis menggulung panel scroll ke atas agar postingan terlihat
            streamFeed.scrollTop = 0;
        }
    }

    // Event trigger ketika tombol "Post" diklik
    streamBtn.addEventListener('click', addNewPost);

    // Event trigger ketika pengguna menekan tombol "Enter" di keyboard
    streamInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNewPost();
        }
    });
});
