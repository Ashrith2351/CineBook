import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    // Get the movie ID from the route and handle null or undefined cases
    const movieId = this.route.snapshot.paramMap.get('id');
    
    // Ensure the movieId is not null or undefined before using it
    if (movieId !== null) {
      const movieIndex = +movieId; // Convert movieId to number (array index)

      // Fetch movie details based on the movie ID
      this.movieService.getMovies().subscribe((movies: any[]) => {
        if (movies && movieIndex >= 0 && movieIndex < movies.length) {
          this.movie = movies[movieIndex]; // Fetch the movie using the index
        }
      });
    }
  }
}
