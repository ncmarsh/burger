// Will attach handlers when DOM is fully loaded
$(function() {
  // When the DEVOUR! button is clicked
  $(".devour_btn").on("click", function(event) {
    const id = $(this).data("id");
    const burger_name = $(this).data("burger_name");
    const nowDevoured = $(this).data("devoured");

    const nowDevouredState = {
      devoured: nowDevoured
    };

    // send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: nowDevouredState
    }).then(
      function() {
        console.log("You have eaten a " + burger_name + " burger");
        // reload the page to get up to date lists
        location.reload();
      }
    );
  });

  // When the button is clicked to make a new burger
  $(".burger-form").on("submit", function(event) {
    if ($("#burger").val() === "") {
      console.log("No burger entered");
    } else {
      // preventDefault on a form submit event
      event.preventDefault();

      const notEaten = parseInt(0);
      const newBurger = {
        burger_name: $("#burger").val().trim(),
        devoured: notEaten
      };

      // send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("New burger grilled!");
          // reload the page to get up to date lists
          location.reload();
        }
      );
    }
  });
});
  