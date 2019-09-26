export function countdown(endDate, node) {
    let days, hours, minutes, seconds;
    
    let curEndDate = endDate
    endDate = new Date(endDate).getTime();
    
    if (isNaN(endDate)) {
      return;
    }
    
    setInterval(calculate, 1000);
    
    function calculate() {
      let startDate = new Date();
      startDate = startDate.getTime();

      let curTimeremaining = parseInt((endDate - startDate) / 1000)

      if( curTimeremaining <= 0 ){
        endDate = new Date(new Date().setDate(new Date().getDate() + 1)).getTime()
      }

      let timeRemaining = parseInt((endDate - startDate) / 1000)

      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);
      
      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);
      
      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);    

      seconds = parseInt(timeRemaining);   

      let hoursHTML = hours == 1 ? `${hours} time` : `${hours} timer`
      let minutesHTML = minutes == 1 ? `${minutes} minut` : `${minutes} minutter`
      let secondsHTML = seconds == 1 ? `${seconds} sekund` : `${seconds} sekunder`
      
      node.querySelector(".hours").innerHTML = hoursHTML
      node.querySelector(".minutes").innerHTML = minutesHTML
      node.querySelector(".seconds").innerHTML = secondsHTML
    }
}