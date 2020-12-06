
$(function() {
  $(".devour_btn").on("click", function(event) {
    const id = $(this).data("id");
    const burger_name = $(this).data("burger_name");
    const nowDevoured = $(this).data("nowDevoured");

    const nowDevouredState = {
      devoured: nowDevoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: nowDevouredState
    }).then(
      function() {
        console.log("You have eaten a " + burger_name + " burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".burger-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      burger_name: $("#burger").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("New burger grilled!");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
  