// ELSHAMI STORE — interactions
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
        menuToggle.textContent = "☰";
      });
    });
  }

  // This search filters the site's informational cards; it does not search an external product database.
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("siteSearch");
  const feedback = document.getElementById("searchFeedback");
  const cards = Array.from(document.querySelectorAll("[data-searchable]"));

  if (searchForm && searchInput && feedback) {
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      const query = searchInput.value.trim().toLocaleLowerCase("ar");

      if (!query) {
        cards.forEach(card => card.hidden = false);
        feedback.textContent = "اكتب كلمة للبحث أولاً.";
        return;
      }

      let matches = 0;
      cards.forEach(card => {
        const text = (card.innerText + " " + (card.dataset.searchable || "")).toLocaleLowerCase("ar");
        const found = text.includes(query);
        card.hidden = !found;
        if (found) matches++;
      });

      feedback.textContent = matches
        ? `تم العثور على ${matches} نتيجة ضمن مميزات الموقع.`
        : "لم نجد نتيجة مطابقة ضمن مميزات الموقع. جرّب كلمة أخرى.";
      document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    });

    searchInput.addEventListener("input", () => {
      if (!searchInput.value.trim()) {
        cards.forEach(card => card.hidden = false);
        feedback.textContent = "";
      }
    });
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const updateButton = () => backToTop.classList.toggle("visible", window.scrollY > 350);
    window.addEventListener("scroll", updateButton, { passive: true });
    updateButton();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
 document.addEventListener("DOMContentLoaded", () => {
    // استبدل الرابط أدناه برابط الـ API الخاص بـ Google Sheet (مثلاً من Sheet.best أو Sheety)
    const apiURL = "https://api.sheetbest.com/sheets/96d53644-fd4c-436b-a432-26c585b8f39a";

    const productsContainer = document.getElementById("products-container");

    if (productsContainer) {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                productsContainer.innerHTML = ""; // تفريغ الحاوية قبل الإضافة
                
                if (data && data.length > 0) {
                    data.forEach(product => {
                        // بناء شكل بطاقة المنتج
                        const productCard = document.createElement("div");
                        productCard.className = "feature-card product-card"; // يمكنك تخصيص التصميم في ملف style.css
                        
                        productCard.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;">
                            <h3 style="margin-top: 10px;">${product.name}</h3>
                            <p style="color: #27ae60; font-weight: bold;">${product.price} ج.م</p>
                        `;
                        
                        productsContainer.appendChild(productCard);
                    });
                } else {
                    productsContainer.innerHTML = "<p>لا توجد منتجات حالياً.</p>";
                }
            })
            .catch(error => {
                console.error("خطأ في جلب بيانات المنتجات:", error);
                // في حال لم تقم بربط الـ API بعد، يمكنك ترك رسالة أو تركها فارغة
            });
    }
});
}
});
