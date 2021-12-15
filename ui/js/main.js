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

    $('.dropdown').removeClass('active');

    $(this).closest('.dropdown').toggleClass('active');
  });

  /**
   * Dropdown - hide on selection.
   */
  $('.dropdown-content a').on('click', function(e) {
    e.preventDefault();

    let text = $(this).text();

    $(this).closest('.dropdown-content').children('a').removeClass('active');

    $(this).addClass('active');

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

  let json_url = 'ui/js/data.json';

  let today = new Date().toISOString();

  /**
   * AJAX filtering.
   * 
   * Date in future or past.
   */
  $('.slide-toggle button').on('click', function(e) {
    e.preventDefault();

    let $this = $(this);

    // Show spinner
    $('.spinner').fadeIn(300);

    $.getJSON(json_url, function(data) {
      if (data.length) {
        let posts = [];

        $.each(data, function(key, val) {
          let post_title = data[key].title,
            post_thumbnail = data[key].thumbnail,
            post_author = data[key].author,
            post_date = data[key].date,
            post_date_format = data[key].date_format,
            post_length_minutes = data[key].length_minutes,
            post_location = data[key].location,
            post_seat_cost = data[key].seat_cost,
            post_event_size = data[key].event_size;

          let post_html = `
            <div class="events-section__cell">
              <a class="events-card" href="#">
                <div class="events-card__head" style="background-image: url('${post_thumbnail}');">
                  <div class="events-card__head-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg>
                    ${post_author} - ${post_length_minutes} mins
                  </div>
                </div>

                <div class="events-card__body">
                  <h4>${post_title}</h6>

                  <p>${post_date_format} · ${post_location}</p>
                </div>
              </a>
            </div>
          `;

          if ($this.hasClass('show-future')) {
            if (post_date > today) {
              posts.push($(post_html));
            }
          } else {
            if (post_date < today) {
              posts.push($(post_html));
            }
          }
        });

        if ($('.events-section__grid .events-section__cell').length > 0) {
          $('.events-section__grid .events-section__cell').fadeOut(300, function() {
            $('.events-section__grid .events-section__cell').remove();

            $('.events-section__grid').append(posts);

            $(posts).each(function() {
              $(this).fadeIn(300);
            });
          });
        } else {
          $('.events-section__grid').append(posts);
        }
      }
    }).done(function(data) {

      // Hide spinner
      $('.spinner').fadeOut(300);
    });
  });

  /**
   * AJAX filtering.
   * 
   * Event location.
   */
  $('.dropdown-location a').on('click', function(e) {
    e.preventDefault();

    let $this = $(this),
      this_location = $this.attr('title');

    // Show spinner
    $('.spinner').fadeIn(300);

    $.getJSON(json_url, function(data) {
      if (data.length) {
        let posts = [];

        $.each(data, function(key, val) {
          let post_title = data[key].title,
            post_thumbnail = data[key].thumbnail,
            post_author = data[key].author,
            post_date = data[key].date,
            post_date_format = data[key].date_format,
            post_length_minutes = data[key].length_minutes,
            post_location = data[key].location,
            post_seat_cost = data[key].seat_cost,
            post_event_size = data[key].event_size;

          let post_html = `
            <div class="events-section__cell">
              <a class="events-card" href="#">
                <div class="events-card__head" style="background-image: url('${post_thumbnail}');">
                  <div class="events-card__head-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg>
                    ${post_author} - ${post_length_minutes} mins
                  </div>
                </div>

                <div class="events-card__body">
                  <h4>${post_title}</h6>

                  <p>${post_date_format} · ${post_location}</p>
                </div>
              </a>
            </div>
          `;

          if (this_location == post_location) {
            posts.push($(post_html));
          }
        });

        if ($('.events-section__grid .events-section__cell').length > 0) {
          $('.events-section__grid .events-section__cell').fadeOut(300, function() {
            $('.events-section__grid .events-section__cell').remove();

            $('.events-section__grid').append(posts);

            $(posts).each(function() {
              $(this).fadeIn(300);
            });
          });
        } else {
          $('.events-section__grid').append(posts);
        }
      }
    }).done(function(data) {

      // Hide spinner
      $('.spinner').fadeOut(300);
    });
  });

  /**
   * AJAX filtering.
   * 
   * Event length.
   */
  $('.dropdown-length a').on('click', function(e) {
    e.preventDefault();

    let $this = $(this),
      this_length_minutes_min = $('.dropdown-length-min').find('a.active').attr('data-minutes'),
      this_length_minutes_max = $('.dropdown-length-max').find('a.active').attr('data-minutes');

    // Show spinner
    $('.spinner').fadeIn(300);

    $.getJSON(json_url, function(data) {
      if (data.length) {
        let posts = [];

        $.each(data, function(key, val) {
          let post_title = data[key].title,
            post_thumbnail = data[key].thumbnail,
            post_author = data[key].author,
            post_date = data[key].date,
            post_date_format = data[key].date_format,
            post_length_minutes = data[key].length_minutes,
            post_location = data[key].location,
            post_seat_cost = data[key].seat_cost,
            post_event_size = data[key].event_size;

          let post_html = `
            <div class="events-section__cell">
              <a class="events-card" href="#">
                <div class="events-card__head" style="background-image: url('${post_thumbnail}');">
                  <div class="events-card__head-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg>
                    ${post_author} - ${post_length_minutes} mins
                  </div>
                </div>

                <div class="events-card__body">
                  <h4>${post_title}</h6>

                  <p>${post_date_format} · ${post_location}</p>
                </div>
              </a>
            </div>
          `;

          if (this_length_minutes_min <= post_length_minutes && this_length_minutes_max >= post_length_minutes) {
            posts.push($(post_html));
          }
        });

        if ($('.events-section__grid .events-section__cell').length > 0) {
          $('.events-section__grid .events-section__cell').fadeOut(300, function() {
            $('.events-section__grid .events-section__cell').remove();

            $('.events-section__grid').append(posts);

            $(posts).each(function() {
              $(this).fadeIn(300);
            });
          });
        } else {
          $('.events-section__grid').append(posts);
        }
      }
    }).done(function(data) {

      // Hide spinner
      $('.spinner').fadeOut(300);
    });
  });

  /**
   * Filter seat cost.
   */
  $('.filters-form').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode === 13) { 
      e.preventDefault();

      if ($('.price-field input').is(':focus')) {
        let this_price_min = $('.price-field-min').val();
        let this_price_max = $('.price-field-max').val();

        // Show spinner
        $('.spinner').fadeIn(300);

        $.getJSON(json_url, function(data) {
          if (data.length) {
            let posts = [];

            $.each(data, function(key, val) {
              let post_title = data[key].title,
                post_thumbnail = data[key].thumbnail,
                post_author = data[key].author,
                post_date = data[key].date,
                post_date_format = data[key].date_format,
                post_length_minutes = data[key].length_minutes,
                post_location = data[key].location,
                post_seat_cost = data[key].seat_cost,
                post_event_size = data[key].event_size;

              let post_html = `
                <div class="events-section__cell">
                  <a class="events-card" href="#">
                    <div class="events-card__head" style="background-image: url('${post_thumbnail}');">
                      <div class="events-card__head-info">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg>
                        ${post_author} - ${post_length_minutes} mins
                      </div>
                    </div>

                    <div class="events-card__body">
                      <h4>${post_title}</h6>

                      <p>${post_date_format} · ${post_location}</p>
                    </div>
                  </a>
                </div>
              `;

              if (this_price_min <= post_seat_cost && this_price_max >= post_seat_cost) {
                posts.push($(post_html));
              }
            });

            if ($('.events-section__grid .events-section__cell').length > 0) {
              $('.events-section__grid .events-section__cell').fadeOut(300, function() {
                $('.events-section__grid .events-section__cell').remove();

                $('.events-section__grid').append(posts);

                $(posts).each(function() {
                  $(this).fadeIn(300);
                });
              });
            } else {
              $('.events-section__grid').append(posts);
            }
          }
        }).done(function(data) {

          // Hide spinner
          $('.spinner').fadeOut(300);
        });
      }

      return false;
    }
  });

  /**
   * Filter event size.
   */
  $('.filters-form .range-slider').on('change', function(e) {
    let this_event_size = $(this).val();

    // Show spinner
    $('.spinner').fadeIn(300);

    $.getJSON(json_url, function(data) {
      if (data.length) {
        let posts = [];

        $.each(data, function(key, val) {
          let post_title = data[key].title,
            post_thumbnail = data[key].thumbnail,
            post_author = data[key].author,
            post_date = data[key].date,
            post_date_format = data[key].date_format,
            post_length_minutes = data[key].length_minutes,
            post_location = data[key].location,
            post_seat_cost = data[key].seat_cost,
            post_event_size = data[key].event_size;

          let post_html = `
            <div class="events-section__cell">
              <a class="events-card" href="#">
                <div class="events-card__head" style="background-image: url('${post_thumbnail}');">
                  <div class="events-card__head-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path></svg>
                    ${post_author} - ${post_length_minutes} mins
                  </div>
                </div>

                <div class="events-card__body">
                  <h4>${post_title}</h6>

                  <p>${post_date_format} · ${post_location}</p>
                </div>
              </a>
            </div>
          `;

          if (this_event_size >= post_event_size) {
            posts.push($(post_html));
          }
        });

        if ($('.events-section__grid .events-section__cell').length > 0) {
          $('.events-section__grid .events-section__cell').fadeOut(300, function() {
            $('.events-section__grid .events-section__cell').remove();

            $('.events-section__grid').append(posts);

            $(posts).each(function() {
              $(this).fadeIn(300);
            });
          });
        } else {
          $('.events-section__grid').append(posts);
        }
      }
    }).done(function(data) {

      // Hide spinner
      $('.spinner').fadeOut(300);
    });
  });
});