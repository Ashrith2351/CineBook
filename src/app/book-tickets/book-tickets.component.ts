import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {
  showtimes = ['9AM', '12PM', '6PM', '9PM'];
  seatMap = [
    [{ number: 'A1', booked: false }, { number: 'A2', booked: false }, { number: 'A3', booked: true }, { number: 'A4', booked: false }],
    [{ number: 'B1', booked: false }, { number: 'B2', booked: false }, { number: 'B3', booked: false }, { number: 'B4', booked: true }],
    // Add more rows
  ];
  selectedShowtime: string | null = null;
  selectedSeats: any[] = [];
  movie: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.movie = history.state.movie; // Get the selected movie from the state
  }

  selectShowtime(time: string) {
    this.selectedShowtime = time;
  }

  selectSeat(seat: any) {
    if (!seat.booked) {
      this.selectedSeats.push(seat);
      seat.booked = true;
    }
  }

  confirmBooking() {
    if (!this.isUserLoggedIn()) {
      // Redirect to login, passing the return URL as a query parameter
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    } else {
      // Proceed with booking confirmation
      alert(`Booking confirmed! Showtime: ${this.selectedShowtime}, Seats: ${this.selectedSeats.map(s => s.number).join(', ')}`);
    }
  }

  isUserLoggedIn(): boolean {
    // Check if the user is logged in (you can change this logic with actual auth check)
    return !!localStorage.getItem('userToken'); // Assuming you store a token in local storage after login
  }
}
