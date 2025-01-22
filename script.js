document.addEventListener('DOMContentLoaded', function() {
    // initialize full calendar 
    const calendarEl = document.getElementById('calendarContainer');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        // plugins: [ 'dayGrid' ],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events:[],
          

    });

    calendar.render();
});

      // Handle reservation form submission
    const bookingForm = document.getElementById('bookingForm');
    const thankYouModal = document.getElementById("thankYouModal");
    bookingForm.addEventListener('submit', async function(event) {
        event.preventDefault();
         // Gather form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const service = document.getElementById('service').value;

        // Update the hidden CC field for client email
        const ccField = document.createElement("input");
        ccField.type = "hidden";
        ccField.name = "_cc";
        ccField.value = email; // Client's email
        reservationForm.appendChild(ccField);

        // Create a new event
        const newEvent = {
            title: `${service} - ${name}`,
            start: `${date}T${time}`,
            allDay: false,
            description: `Service: ${service}\nName: ${name}\nEmail: ${email}`
        };
        // Add event to calendar
        calendar.addEvent(newEvent);

        // Submit the form to FormSubmit
        reservationForm.submit();

        // Confirmation message
         alert("Your reservation has been added to the calendar and confirmation email sent.");

        // Reset form
        reservationForm.reset();

        // Display thank you modal
        thankYouModal.style.display = "block";

        // Close modal after 3 seconds
        setTimeout(() => {
        thankYouModal.style.display = "none";
        }, 3000);

    });

// Initialize PayPal Buttons
paypal.Buttons({
    createOrder: function (data, actions) {
      // Gather form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;

      if (!name || !email || !date || !time) {
        alert("Please fill in all the fields before making a payment.");
        return false; // Prevent button from triggering
      }

      // Create the PayPal order
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "60.00", // Set the price for the massage
            },
            description: `Massage Reservation for ${name}`,
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        // Payment successful
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        // Add the event to FullCalendar
        const newEvent = {
          title: `${name} - Paid Reservation`,
          start: `${date}T${time}`,
          allDay: false,
        };
        calendar.addEvent(newEvent);

        // Reset form
        reservationForm.reset();

        // Confirmation message
        alert(`Thank you, ${details.payer.name.given_name}. Your reservation has been confirmed.`);
      });
    },
    onError: function (err) {
      console.error(err);
      alert("An error occurred during the payment process. Please try again.");
    },
  }).render("#paypal-button-container"); // Render the PayPal button
