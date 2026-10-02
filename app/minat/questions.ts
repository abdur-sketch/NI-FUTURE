export type Choice={id:string;label:string;hint:string;symbol:string};
export type Question={id:string;prompt:string;choices:Choice[]};
const c=(id:string,label:string,hint:string,symbol:string):Choice=>({id,label,hint,symbol});
export const questions:Question[]=[
 {id:"q1",prompt:"Saat punya waktu luang, saya lebih menikmati…",choices:[c("design","Membuat desain","Warna, bentuk, dan layout","◈"),c("video","Mengedit video","Menyusun cerita bergerak","▶"),c("computer","Mengutak-atik komputer","Mencari tahu cara kerja teknologi","⌘")]},
 {id:"q2",prompt:"Dalam sebuah kelompok, saya paling ingin bertugas…",choices:[c("visual","Membuat tampilan","Poster dan identitas visual","✦"),c("document","Mendokumentasikan","Mengambil foto dan video","◎"),c("organize","Mengatur strategi","Membagi peran dan target","↗")]},
 {id:"q3",prompt:"Hasil karya yang paling membuat saya bangga adalah…",choices:[c("poster","Poster yang menarik","Pesannya mudah dipahami","▤"),c("film","Video bercerita","Ada alur dan suasana","▷"),c("app","Program yang berjalan","Solusi digital sederhana","{ }")]},
 {id:"q4",prompt:"Saya lebih cepat belajar ketika…",choices:[c("see","Melihat contoh","Membaca bentuk dan komposisi","◐"),c("practice","Langsung praktik","Mencoba alat dan memperbaiki","⚙"),c("discuss","Berdiskusi","Mengembangkan ide bersama","↔")]},
 {id:"q5",prompt:"Hal yang paling ingin saya pelajari lebih jauh…",choices:[c("camera","Kamera & cahaya","Mengabadikan momen dengan tepat","◉"),c("code","Coding","Membangun sesuatu dari logika","</>"),c("sell","Bisnis kreatif","Membawa karya bertemu pembeli","¤")]},
 {id:"q6",prompt:"Jika diberi satu proyek sekolah, saya memilih…",choices:[c("brand","Membuat brand","Logo, warna, dan kemasan","B"),c("shortfilm","Membuat film pendek","Konsep, rekam, dan edit","▻"),c("website","Membuat website","Tampilan dan fungsi","W")]},
 {id:"q7",prompt:"Tantangan yang terasa paling seru…",choices:[c("compose","Mengatur komposisi","Membuat visual terasa pas","▦"),c("debug","Mencari kesalahan","Menemukan penyebab dan solusi","!"),c("pitch","Meyakinkan orang","Menjelaskan nilai sebuah ide","↑")]},
 {id:"q8",prompt:"Saat melihat konten digital, saya sering memperhatikan…",choices:[c("look","Tampilan visual","Tipografi dan warna","Aa"),c("story","Cara bercerita","Transisi, ritme, dan suara","≈"),c("shot","Sudut pengambilan","Cahaya dan momen","⌾")]},
 {id:"q9",prompt:"Saya ingin karya saya nantinya…",choices:[c("useful","Memudahkan orang","Bekerja sebagai solusi","+"),c("memorable","Diingat orang","Punya cerita dan rasa","✧"),c("valuable","Punya nilai jual","Dapat dikembangkan jadi usaha","Rp")]},
 {id:"q10",prompt:"Lingkungan belajar yang paling membuat saya berkembang…",choices:[c("studio","Studio kreatif","Banyak eksplorasi visual","□"),c("lab","Lab teknologi","Banyak eksperimen dan logika","#"),c("market","Proyek nyata","Ada pengguna dan tujuan bisnis","↗")]},
];
export const categoryNames:Record<string,string>={creative:"Creative Visual",video:"Video Creator",photo:"Photography",technology:"Technology",coding:"Coding",business:"Entrepreneurship"};
