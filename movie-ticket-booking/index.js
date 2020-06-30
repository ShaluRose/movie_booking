const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

var ticketPrice = +movieSelect.value;

console.log(ticketPrice);

//setMovie function - save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//function to update the count and total
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedIndex = [...selectedSeats].map(event => [...seats].indexOf(event)
    );

    localStorage.setItem('selectedSeats', JSON.stringify(selectedIndex));
    
    
    selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    
    
}


//Get the data from the local storage and populate the UI (the booked seats part)
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    
    //Retrieve data for the movie select (the count and total part)

}



//event listener for the movie selector
movieSelect.addEventListener('change', function(e){
    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);
    
    updateSelectedCount();
});



//Event listener for the non occupied seats
container.addEventListener('click', function(e){
     
     if(e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied'))
      {
         e.target.classList.toggle('selected');
         updateSelectedCount();
             
     }
     
});

updateSelectedCount();