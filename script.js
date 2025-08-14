function checkNID() {
  let id = document.getElementById("nid").value.trim();
  let messageDiv = document.getElementById("message");
  let resultDiv = document.getElementById("result");

  messageDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  if (!/^\d{14}$/.test(id)) {
    messageDiv.innerHTML =
      "<div class='error'>❌ الرقم القومي لازم يكون 14 رقم</div>";
    return;
  }

  let century = id[0] === "2" ? 1900 : 2000;
  let year = century + parseInt(id.slice(1, 3));
  let month = parseInt(id.slice(3, 5));
  let day = parseInt(id.slice(5, 7));

  let governorates = {
    01: "القاهرة",
    02: "الإسكندرية",
    03: "بورسعيد",
    04: "السويس",
    11: "دمياط",
    12: "الدقهلية",
    13: "الشرقية",
    14: "القليوبية",
    15: "كفر الشيخ",
    16: "الغربية",
    17: "المنوفية",
    18: "البحيرة",
    19: "الإسماعيلية",
    21: "الجيزة",
    22: "بني سويف",
    23: "الفيوم",
    24: "المنيا",
    25: "أسيوط",
    26: "سوهاج",
    27: "قنا",
    28: "أسوان",
    29: "البحر الأحمر",
    31: "مطروح",
    32: "الوادي الجديد",
    33: "شمال سيناء",
    34: "جنوب سيناء",
    88: "خارج جمهورية مصر العربية",
  };

  let governorateCode = id.slice(7, 9);
  let governorate = governorates[governorateCode] || "غير معروف";

  let serial = parseInt(id.slice(9, 13));
  let gender = serial % 2 === 0 ? "أنثى" : "ذكر";

  let today = new Date();
  let birthDate = new Date(year, month - 1, day);

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
    ageMonths--;
  }

  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }

  messageDiv.innerHTML =
    "<div class='success'>✅ الرقم القومي صحيح من حيث الصيغة</div>";

  resultDiv.innerHTML = `
    <table>
      <tr><th> تاريخ الميلاد</th><td>${day}/${month}/${year}</td></tr>
      <tr><th> المحافظة</th><td>${governorate}</td></tr>
      <tr><th> النوع</th><td>${gender}</td></tr>
      <tr><th> العمر</th><td>${ageYears} سنة و ${ageMonths} شهر و ${ageDays} يوم</td></tr>
      <tr><th>ℹ️ معلومة</th>
          <td>الأرقام من العاشر وحتى الثالث عشر (${serial}) تشير إلى تسلسل الشخص على الكمبيوتر بين المواليد في يوم ميلاده.</td>
      </tr>
    </table>
  `;
}
