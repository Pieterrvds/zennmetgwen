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
        let allowedTimes = ["12:00", "16:00", "21:00", "22:00"];
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

        let savedBookings = JSON.parse(localStorage.getItem("bookedSlots")) || [];

        // Check if the selected date & time is already booked
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
    });
    
});


document.addEventListener("DOMContentLoaded", function () {
    let navbarToggler = document.querySelector(".navbar-toggler");
    let navbarCollapse = document.querySelector("#navbarNav");

    navbarToggler.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
            navbarCollapse.classList.remove("show");
        } else {
            navbarCollapse.classList.add("show");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let bookingForm = document.getElementById('bookingForm');
    let submitButton = document.getElementById('bookingSubmit');
    let serviceSelect = document.getElementById('service');
    let payNowToggle = document.getElementById('payNow');
    let paypalContainer = document.getElementById('paypal-container');

    // Service prices
    const servicePrices = {
        "Yoga aan huis": 50.00,
        "Relax massage": 60.00,
        "Hot Stone Massage": 70.00,
        "Krachttraining senioren": 55.00,
        "Chinese rug en nek massage": 65.00
    };

    let selectedPrice = servicePrices[serviceSelect.value]; // Default price
    let paymentCompleted = false;

    function updatePayPalButton() {
        // Clear old button
        document.getElementById("paypal-button-container").innerHTML = "";

        // Create new PayPal button
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

    // Toggle PayPal option
    payNowToggle.addEventListener('change', function () {
        if (this.checked) {
            paypalContainer.style.display = "block";
            updatePayPalButton();
            submitButton.disabled = true; // Disable submit until payment is made
        } else {
            paypalContainer.style.display = "none";
            submitButton.disabled = false; // Enable submit if paying is not required
        }
    });

    // Update PayPal button when service changes
    serviceSelect.addEventListener('change', function () {
        selectedPrice = servicePrices[this.value];
        if (payNowToggle.checked) {
            updatePayPalButton();
        }
    });

    // Form submission logic
    bookingForm.addEventListener('submit', function (event) {
        if (payNowToggle.checked && !paymentCompleted) {
            event.preventDefault();
            alert("U moet eerst betalen voordat u uw boeking voltooit.");
        }
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
