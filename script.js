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


      // Handle reservation form submission
    const bookingForm = document.getElementById('bookingForm');
    const thankYouModal = document.getElementById("thankYouModal");
    bookingForm.addEventListener('submit', function(event) {
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
        bookingForm.appendChild(ccField);
     
        // Create a new event
        const newEvent = {
            title: `${service} - ${name}`,
            start: `${date}T${time}`,
            allDay: false,
            //description: `Service: ${service}\nName: ${name}\nEmail: ${email}`
        };
        // Add event to calendar
        calendar.addEvent(newEvent);

        // Reset form
        bookingForm.reset();

        // Submit the form to FormSubmit
        bookingForm.submit();

        // Display thank you modal
        thankYouModal.style.display = "block";
        // Close modal after 3 seconds
            setTimeout(() => {
            thankYouModal.style.display = "none";
            }, 6000);

    });

  });

