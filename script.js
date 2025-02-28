document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const form = document.getElementById("bookingForm");

    // Allowed days: Sunday (0), Monday (1), Tuesday (2), Wednesday (3)
    dateInput.addEventListener("input", function () {
        let selectedDate = new Date(this.value);
        let day = selectedDate.getDay();
        if (![0, 1, 2, 3].includes(day)) {
            alert("Je kunt alleen een reservering maken op zondag, maandag, dinsdag of woensdag.");
            this.value = "";
        }
    });

    // Allowed times: 12:00 PM, 16:00 PM, 21:00 PM, 22:00 PM
    timeInput.addEventListener("input", function () {
        let allowedTimes = [ "16:00","17:00","18:00","19:00", "20:00", "21:00"];
        if (!allowedTimes.includes(this.value)) {
            alert("Je kunt alleen kiezen uit 12:00, 16:00, 21:00 of 22:00.");
            this.value = "";
        }
    });

    // Check if the selected date and time are already booked
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const date = dateInput.value;
        const time = timeInput.value;
        const service = document.getElementById("service").value;

        if (!date || !time) {
            alert("Kies alstublieft een datum en tijd.");
            return;
        }

        let savedBookings = localStorage.getItem("bookedSlots");
        savedBookings = savedBookings ? JSON.parse(savedBookings) : []; // Zorgt ervoor dat null niet crasht
        
        let isAlreadyBooked = savedBookings.some(booking => booking.date === date && booking.time === time);
        
        if (isAlreadyBooked) {
            alert("Deze tijd en datum zijn al geboekt. Kies een andere tijd of datum.");
            return;
        }

        

        // If not booked, save the reservation
        let newBooking = { name, email, date, time, service };
        savedBookings.push(newBooking);
        localStorage.setItem("bookedSlots", JSON.stringify(savedBookings));

        alert("Reservering succesvol! Je ontvangt een bevestiging per e-mail.");

        form.submit(); // Now submit the form to FormSubmit
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendarContainer');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: JSON.parse(localStorage.getItem('bookedEvents')) || [] // Load saved events
    });

    calendar.render();

    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default only for processing
    
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const service = document.getElementById('service').value;
    
        // Save event to local storage
        const newEvent = { title: `${service} - ${name}`, start: `${date}T${time}`, allDay: false };
        let savedEvents = JSON.parse(localStorage.getItem('bookedEvents')) || [];
        savedEvents.push(newEvent);
        localStorage.setItem('bookedEvents', JSON.stringify(savedEvents));
    
        // Show thank-you modal
        document.getElementById("thankYouModal").style.display = "block";
        
        // Hide modal after 6 seconds
        setTimeout(() => {
            document.getElementById("thankYouModal").style.display = "none";
        }, 6000);
    
        // Submit the form programmatically to FormSubmit
        setTimeout(() => {
            event.target.submit(); // Allows the form to submit after processing
        }, 1000); // Delay for smooth transition

            // Convert date & time into ICS format (YYYYMMDDTHHMMSS)
    let startDate = new Date(`${date}T${time}`);
    let endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1-hour session

    let formattedStart = startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    let formattedEnd = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    // ICS file content
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Zen Met Gwen//Booking System//EN
BEGIN:VEVENT
UID:${Date.now()}@zenmetgwen.com
DTSTAMP:${formattedStart}
DTSTART:${formattedStart}
DTEND:${formattedEnd}
SUMMARY:${service} Appointment
DESCRIPTION:Afspraak met ${name} (${email}) voor ${service}
LOCATION:Zen met Gwen, Belgium
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    // Generate ICS file as a downloadable link
    let blob = new Blob([icsContent], { type: "text/calendar" });
    let icsURL = URL.createObjectURL(blob);

    // Add ICS link to the hidden input
    document.getElementById("calendarLink").value = icsURL;

    // Show download option for manual saving
    let downloadLink = document.createElement("a");
    downloadLink.href = icsURL;
    downloadLink.download = "booking.ics";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    });
    
});


document.addEventListener("DOMContentLoaded", function () {
    let navbarToggler = document.querySelector(".navbar-toggler");
    let navbarCollapse = document.querySelector("#navbarNav");
    let navLinks = document.querySelectorAll("#navbarNav .nav-link");
    let body = document.body;

    // Toggle menu on button click
    navbarToggler.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up
        navbarCollapse.classList.toggle("show");

        // Prevent scrolling when menu is open
        if (navbarCollapse.classList.contains("show")) {
            body.classList.add("no-scroll");
        } else {
            body.classList.remove("no-scroll");
        }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            navbarCollapse.classList.remove("show");
            body.classList.remove("no-scroll"); // Re-enable scrolling
        }
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navbarCollapse.classList.remove("show");
            body.classList.remove("no-scroll"); // Re-enable scrolling
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const submitButton = document.getElementById("bookingSubmit");
    const payNowToggle = document.getElementById("payNow");
    const paypalContainer = document.getElementById("paypal-container");

    // Service prices
    const servicePrices = {
        "Yoga aan huis": 41.00,
        "Relax massage": 61.00,
        "Hot Stone Massage": 71.00,
        "Krachttraining senioren": 41.00,
        "Chinese rug en nek massage": 61.00
    };

    let paymentCompleted = false;

    function updatePayPalButton(selectedPrice) {
        document.getElementById("paypal-button-container").innerHTML = "";

        paypal.Buttons({
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: selectedPrice.toFixed(2) }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert("Betaling geslaagd! Bedankt " + details.payer.name.given_name);
                    paymentCompleted = true;
                    submitButton.disabled = false; // Enable the submit button after payment
                });
            },
            onError: function (err) {
                alert("Betaling mislukt, probeer opnieuw.");
            }
        }).render('#paypal-button-container');
    }

    // Toggle PayPal payment
    payNowToggle.addEventListener('change', function () {
        if (this.checked) {
            paypalContainer.style.display = "block";
            let selectedService = document.getElementById('service').value;
            updatePayPalButton(servicePrices[selectedService]);
            submitButton.disabled = true;
        } else {
            paypalContainer.style.display = "none";
            submitButton.disabled = false;
        }
    });

    // Ensure correct PayPal amount when changing service
    document.getElementById('service').addEventListener('change', function () {
        if (payNowToggle.checked) {
            updatePayPalButton(servicePrices[this.value]);
        }
    });

    // Form Submission
    form.addEventListener("submit", function (event) {
        if (payNowToggle.checked && !paymentCompleted) {
            event.preventDefault();
            alert("U moet eerst betalen voordat u uw boeking voltooit.");
            return;
        }

        // Store booked slots in localStorage
        let bookedSlots = JSON.parse(localStorage.getItem("bookedSlots")) || [];
        let newBooking = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            date: dateInput.value,
            time: timeInput.value,
            service: document.getElementById("service").value
        };

        bookedSlots.push(newBooking);
        localStorage.setItem("bookedSlots", JSON.stringify(bookedSlots));

        alert("Reservering succesvol! Je ontvangt een bevestiging per e-mail.");
    });
});


document.getElementById('payNow').addEventListener('change', function () {
    let toggleText = document.getElementById('toggleText');
    toggleText.innerText = this.checked ? "Ja, ik wil betalen" : "Nee, ik betaal later";
});




document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const modal = document.getElementById("thankYouModal");
    const closeBtn = document.querySelector(".close");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default submission

        // Show modal with smooth animation
        modal.classList.add("show");

        // Hide modal after 3 seconds
        setTimeout(() => {
            modal.classList.remove("show");
        }, 3000);

        // Optionally, reset form after submission
        setTimeout(() => {
            form.reset();
        }, 3500);
    });

    // Close modal when clicking close button
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Close modal if clicking outside modal content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript is geladen!");

    const popup = document.getElementById("paypal-popup");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");
    const paypalContainer = document.getElementById("paypal-button-container");
    const closeButton = document.querySelector(".close-btn");

    function showPopup(title, description, price) {
        console.log(`Popup geopend: ${title}, Prijs: €${price}`);

        popupTitle.innerText = title;
        popupDescription.innerText = description;
        popup.style.display = "flex";

        // Verwijder oude PayPal knop als die er al is
        paypalContainer.innerHTML = "";

        // Controleer of PayPal correct is geladen
        if (typeof paypal !== "undefined") {
            paypal.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: price } }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        alert("Betaling geslaagd! Bedankt " + details.payer.name.given_name + " voor je aankoop van " + title + ".");
                        popup.style.display = "none"; // Sluit pop-up na betaling
                    });
                },
                onError: function (err) {
                    alert("Betaling mislukt, probeer opnieuw.");
                }
            }).render("#paypal-button-container");
        } else {
            alert("Fout: PayPal kon niet worden geladen.");
        }
    }

    // 🔥 **Selecteer alleen de beurtenkaarten!**
    const beurtenkaarten = document.querySelectorAll(".beurtenkaart");
    console.log(`Aantal gevonden beurtenkaarten: ${beurtenkaarten.length}`);

    beurtenkaarten.forEach(card => {
        card.addEventListener("click", function () {
            console.log("Een beurtenkaart is aangeklikt!");
            
            const title = this.querySelector("h3") ? this.querySelector("h3").innerText : "Onbekend";
            const description = this.querySelector("p") ? this.querySelector("p").innerText : "Geen beschrijving beschikbaar.";
            let price = this.querySelector(".price") ? this.querySelector(".price").innerText.replace("€", "").trim() : "0";

            showPopup(title, description, price);
        });
    });

    // Sluiten van de pop-up
    closeButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Sluiten bij klikken buiten de pop-up
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});


