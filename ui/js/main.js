jQuery(function($) {
  $('.slide-toggle button').on('click', function(e) {
    e.preventDefault();

    $('.slide-toggle button').removeClass('active');

    $(this).addClass('active');
  });

  /**
   * Dropdown - hide on click outside.
   */
  $(document).on('click', function(e) {
    if (! $(e.target).closest('.dropdown').length) {
      $('.dropdown').removeClass('active');
    }
  });

  /**
   * Dropdown.
   */
  $('.dropdown button').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.dropdown').toggleClass('active');
  });

  /**
   * Dropdown - hide on selection.
   */
  $('.dropdown-content a').on('click', function(e) {
    e.preventDefault();

    let text = $(this).text();

    $(this).closest('.dropdown').children('button').first().text(text);

    $(this).closest('.dropdown').removeClass('active');
  });

  /**
   * Filter posts by search text.
   */
  $('.search-events-field').on('keyup', function() {
      var value = $(this).val().toLowerCase();

      $('.events-section__cell').each(function() {
         if ($(this).find('h4').first().text().toLowerCase().search(value) > -1) {
            $(this).show();
            $(this).prev().last().show();
         } else {
            $(this).hide();
         }
      });
   });
});