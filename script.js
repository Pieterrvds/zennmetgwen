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
        event.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const service = document.getElementById('service').value;

        const newEvent = { title: `${service} - ${name}`, start: `${date}T${time}`, allDay: false };

        let savedEvents = JSON.parse(localStorage.getItem('bookedEvents')) || [];
        savedEvents.push(newEvent);
        localStorage.setItem('bookedEvents', JSON.stringify(savedEvents));

        calendar.addEvent(newEvent);
        calendar.refetchEvents();

        document.getElementById("thankYouModal").style.display = "block";
        setTimeout(() => document.getElementById("thankYouModal").style.display = "none", 6000);
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
