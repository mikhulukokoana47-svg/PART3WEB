document.addEventListener('DOMContentLoaded', function() {
    
    // Accordion
    const accordions = document.querySelectorAll(".accordion-btn");
    accordions.forEach(btn => {
        btn.addEventListener("click", function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            panel.style.display = (panel.style.display === "block") ? "none" : "block";
        });
    });

    // Search Filter
    const searchInput = document.getElementById("productSearch");
    if (searchInput) {
        searchInput.addEventListener("keyup", function() {
            const filter = this.value.toLowerCase();
            const productList = document.querySelectorAll(".product-item");
            productList.forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
            });
        });
    }

    // Enquiry Form Validation
    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function(e) {
            e.preventDefault();
            document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
            let isValid = true;
            
            const name = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const enquiryType = document.querySelector('input[name="enquirytype"]:checked');
            const message = document.getElementById("message").value.trim();
            
            if (name.length < 3) { document.getElementById("nameError").textContent = "Name must be at least 3 characters."; isValid = false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { document.getElementById("emailError").textContent = "Please enter a valid email address."; isValid = false; }
            if (!enquiryType) { document.getElementById("typeError").textContent = "Please select an enquiry type."; isValid = false; }
            if (message.length < 10) { document.getElementById("messageError").textContent = "Message must be at least 10 characters."; isValid = false; }
            
            if (isValid) {
                const responseDiv = document.getElementById("formResponse");
                responseDiv.style.display = "block";
                responseDiv.innerHTML = "<strong>Thank you, " + name + "!</strong><br>Your enquiry regarding <em>" + enquiryType.value + "</em> has been received. Our team will review your message and contact you regarding availability and costs within 2 business days.";
                enquiryForm.reset();
            }
        });
    }

    // Contact Form Validation & Mailto
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
            let isValid = true;
            
            const name = document.getElementById("cfname").value.trim();
            const email = document.getElementById("cemail").value.trim();
            const subject = document.getElementById("csubject").value.trim();
            const message = document.getElementById("cmessage").value.trim();
            
            if (name === "") { document.getElementById("cNameError").textContent = "Name is required."; isValid = false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { document.getElementById("cEmailError").textContent = "Valid email is required."; isValid = false; }
            if (subject === "") { document.getElementById("cSubjectError").textContent = "Subject is required."; isValid = false; }
            if (message.length < 10) { document.getElementById("cMessageError").textContent = "Message must be at least 10 characters."; isValid = false; }
            
            if (isValid) {
                const mailtoLink = "mailto:info@medigrow.co.za?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);
                window.location.href = mailtoLink;
                contactForm.reset();
                alert("Your email client is opening to send the message.");
            }
        });
    }
});