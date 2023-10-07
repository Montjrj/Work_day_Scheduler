function refreshPage() {
  location.reload();
}
setInterval(refreshPage, 120000);

$(document).ready(function () {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = month + '-' + day + '-' + year;;

  $("#currentDay").text(formattedDate);

  $(document).on("click", ".save-btn", function () {
    const timeBlockId = $(this).closest(".time-block").attr("id");
    const userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  const now = new Date();
  const currentHour = now.getHours();
 
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id").replace("hour-", "");
    const hours = timeBlockId.slice(0, -2);
    const period = timeBlockId.slice(-2);
    let hours24Format = parseInt(hours);
  

    if (hours24Format < currentHour) {
      $(this).addClass("past");
      $(this).find(".description").prop("disabled", true);
      $(this).find(".save-btn").prop("disabled", true);   
    } 
    else if (hours24Format === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } 
    else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }

    const userInput = localStorage.getItem("hour-" + timeBlockId);
    $(this).find(".description").val(userInput);

    if (currentHour == 0 || currentHour < 9) {
      localStorage.clear();
    }
  });
});
