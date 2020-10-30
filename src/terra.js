"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

/* global terra, DocumentTouch */
(function ($) {
  var terraSearch = document.querySelectorAll('.terra-search');
  var request;
  var lastFormData; // Used to check if the filters have been changed
  // This is going to be set to FALSE when using the buil-in LOAD MORE button.

  var clearContainer = true;
  /**
   * Detect if the device has touch screen
   * https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript#4819886
   */

  function isTouchDevice() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    var mq = function mq(query) {
      return window.matchMedia(query).matches;
    };

    if ('ontouchstart' in window || window.DocumentTouch && _instanceof(document, DocumentTouch)) {
      return true;
    } // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH


    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }
  /**
   * Close all the custom dropdowns
   */


  function closeDropdowns() {
    var dropdowns = document.querySelectorAll('.terra__dropdown');
    var transitionEnd = whichTransitionEvent();
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.classList.contains('visible')) {
        return;
      }
      /**
       * Hide the element when the animation is done
       */


      if (transitionEnd) {
        var list = dropdown.querySelector('.terra__dropdown__list');
        list.style.height = '0';
        list.addEventListener(transitionEnd, function hideBlock() {
          this.style.display = 'none';
          this.removeEventListener(transitionEnd, hideBlock);
        });
      } else {
        dropdown.style.display = 'none';
      }

      dropdown.classList.remove('visible');
    });
  }
  /**
   * Get all the data from the serialized form and "append" all the filters
   * to the URL, with the exception of the one starting with `terra-`.
   */


  function updateUrl(formData) {
    var values = formData.split('&');
    var urlData = [];
    var queryUrl = '';
    var urlParameters = {};
    var search = window.location.search.substr(1);
    var hash = window.location.hash;
    var result = {};
    search.split('&').forEach(function (part) {
      var item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    urlParameters = result;
    /**
     * Only the keys not starting with terra- and not empty, please :)
     */

    values.forEach(function (value) {
      if (value.indexOf('posts-') === -1 && value.indexOf('query-') === -1 && value.indexOf('posts_per') === -1) {
        var parts = value.split('=');
        var v = parts[0]; // If the key already exists in the URL need to remove it from the latter.

        if (urlParameters[v]) {
          delete urlParameters[v];
        }

        if (v.length > 0) {
          urlData.push(value);
        }
      } // get the pages base url with no pagination or filtering.
      // if (value.indexOf('posts-base_url') === 0) {
      //   queryUrl = decodeURIComponent(value.split('=')[1]);
      // }

    });
    /**
     * queryUrl was not being set due to a bug (one of many...) in Terra.
     * So lets explicitly set the base url.
     */

    queryUrl = terra.archiveurl;
    /**
     * If `parameters` contains only `query=` there is nothing to do here
     */
    // if (urlData.length === 1 && urlData[0].indexOf('query') >= 0) {
    //   window.history.pushState({}, '', queryUrl);
    //   return;
    // }
    // Append the parameters that exists from the url.
    // Object.keys(urlParameters).forEach(parameterKey => {
    //   const value = urlParameters[parameterKey];
    //   urlData.push(`${parameterKey}=${value}`);
    // });

    /**
     * Update the URL without refresh
     */

    var parameters = urlData.join('&');
    var qmark = parameters.length ? '?' : '';
    var url = queryUrl + qmark + parameters + hash;
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if (! isIE11) {
    window.history.pushState({}, '', url);
    }
  }
  /**
   * Perform the ajax request.
   *
   * @param {string} data serialized data.
   */


  function doAjax($form, formData, $container) {
    if (request) {
      request.abort();
    }

    $('body').trigger('terraStart', [$form, $container]);
    var data = {
      action: 'nine3_terra',
      nonce: terra.nonce,
      terraFilter: true,
      terraName: $form.attr('name'),
      terraAppend: !clearContainer,
      params: formData,
      uid: $form.data('uid')
    };
    $form.removeClass('terra--done');
    console.log(data);
    request = $.ajax({
      // eslint-disable-line
      type: 'POST',
      url: terra.ajaxurl,
      data: data,
      success: function success(response) {
        /**
         * Remove all the children
         */
        if (clearContainer) {
          $container.empty();
        }

        var $items = $(response);

        if ($items.length) {
          $items.not('.terra-posts-found').addClass('loaded');
          $container.append($items); // There are more elements to load?

          var foundPosts = parseInt($container.find('terra-found').html(), 10);
          var terraPostsCount = parseInt($container.find('terra-posts-count').html(), 10);
          var terraOffset = parseInt($container.find('terra-offset').html(), 10);
          var terraTax = $container.find('terra-tax').html();

          if (terraTax) {
            var terraTaxArray = terraTax.split(',');

            if (terraTax.length) {
              $('.terra__select.terra-filter option').each(function (i, el) {
                if (terraTaxArray.includes(el.value) || el.value === '' || el.value == null || el.value === 'ASC' || el.value === 'DESC') {
                  el.removeAttribute('disabled');
                } else {
                  el.setAttribute('disabled', 'disabled');
                }
              });
            }
          }

          $form.find('input[name="posts-offset"]').val(terraOffset); // if (terraOffset + terraPostsCount >= foundPosts) {
          //   $form.addClass('terra-more--none');
          // }

          if (foundPosts === 0 || terraOffset === foundPosts) {
            $form.addClass('terra-more--none');
            $form.find('.terra-submit').hide();
          } else {
            $form.removeClass('terra-more--none');
            $form.find('.terra-submit').show();
          }
          /**
           * Update the label for founded posts, if any.
           */


          var $postsFound = $form.find('.terra-posts-found__label');

          if ($postsFound.length) {
            $postsFound.html($container.find('terra-posts-found-label').html());
          } // Don't need the custom <terra-*> tags anymore


          $container.find('terra-tax').remove();
          $container.find('terra-found').remove();
          $container.find('terra-offset').remove();
          $container.find('terra-posts-count').remove();
          $container.find('terra-posts-found-label').remove();
          $form.removeClass('terra--ajax');
          $form.addClass('terra--done');
        } else {
          // No more items.
          $form.addClass('terra-more--none');
        }

        clearContainer = true;
        $('body').trigger('terraDone', [$container, $items]);
      }
    });
  }
  /**
   * Prevent the form submission and do the ajax request.
   */


  function submitForm(form, event) {
    if (!form.classList.contains('terra')) {
      return true;
    }

    if (event) {
      event.preventDefault();
    } // The ajax process is started


    var $form = $(form);
    /**
     * Update the "terra-more" property:
     *
     * 0 => no load more (so ignore the offset parameter)
     * 1 => load more
     */

    $form.find('input[name="terra-more"]').val(clearContainer ? 0 : 1);
    var formData = $form.serialize();
    var $container = $form.find('.terra-container');
    /**
     * The form is submitted every time you click on a filter, even if you have selected the same option.
     * So, to avoid uploading the content when no filter has changed, we're going to compare the current
     * formData with the one used for the previous request.
     *
     * If something has changed, we perform the request, if not we ignore everything :)
     *
     * But this is true only when clearContainer is set to false.
     */
    // eslint-disable-next-line eqeqeq

    if (clearContainer && formData == lastFormData) {
      return false;
    }

    lastFormData = formData;
    $form.addClass('terra--ajax');
    /**
     * Update the URL with the filters selected
     */

    updateUrl(formData);
    /**
     * Perform the ajax request
     */

    doAjax($form, formData, $container);
    return false;
  }
  /**
   * Reset the fields within the form.
   */


  function clearForm(form) {
    var elements = form.elements;
    form.reset();

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var fieldType = element.type.toLowerCase();

      switch (fieldType) {
        case 'search':
          element.value = '';
          element.defaultValue = '';
          break;

        case 'text':
        case 'password':
        case 'textarea':
        case 'hidden':
          element.value = '';
          break;

        case 'radio':
        case 'checkbox':
          if (element.checked) {
            element.checked = false;
          }

          break;

        case 'select':
        case 'select-one':
        case 'select-multi':
          element.selectedIndex = 0;
          break;

        default:
          break;
      }
    }

    submitForm(form);
  }
  /**
   * Collapse the dropdown when clicking outside it.
   */


  document.addEventListener('click', function (e) {
    var target = e.target;
    var parent = target.parentNode; // Am I clicking any of the <span> element inside the "terra__dropdown__selected" button?

    if (parent.classList.contains('terra__dropdown__selected')) {
      target = parent;
      parent = target.parentNode;
    } // Check if the current element is already open


    var isOpen = parent.classList.contains('visible'); // Close all the dropdowns (included this one)

    closeDropdowns(); // If the element was open before calling closeDropdowns don't need to do anything else!

    if (isOpen) {
      return;
    } // Am I clicking on the custom select button?


    if (target.classList.contains('terra__dropdown__selected')) {
      /**
       * Toggle the list height
       */
      var list = target.nextSibling; // list.style.setProperty('--max-height', 0);
      // list.style.setProperty('--max-height', `${list.children[0].clientHeight}px`);

      list.style.maxHeight = 'none';
      list.style.height = '0px';
      list.style.display = 'block';
      list.style.height = "".concat(list.children[0].clientHeight, "px");
      parent.classList.add('visible');
      e.stopPropagation(); // Am I clicking on the custom select single item?
    } else if (target.classList.contains('terra__dropdown__list__button')) {
      /**
       * When submitting the form with AJAX, need to update the <select>
       * as the button itself is not part of the value got from
       * $form.serialize();
       */
      var name = target.getAttribute('name'); // IE doesn't support .closest on a JS node.

      var form = $(target).closest('form')[0];
      var select = form.querySelector("select[data-filter=\"".concat(name, "\"]")); // The span "selected" label

      var _terra = $(target).closest('.terra__dropdown')[0];

      var label = _terra.querySelector('.terra__dropdown__selected__label');

      select.value = target.value; // Update the <span> label

      label.innerHTML = target.innerHTML; // Am I clicking on the custom checkbox / radio filters?
    } else if (target.classList.contains('terra-filter') && target.type && ['checkbox', 'radio'].indexOf(target.type) >= 0) {
      /**
       * Checkboxes and radio boxes will automatically trigger the form submit
       */
      var _form = $(target).closest('form')[0];
      submitForm(_form);
    }
  });
  /**
   * Search input trigger load on change
   */

  terraSearch.forEach(function (input) {
    // IE doesn't support .closest on a JS node.
    var form = $(input).closest('form.terra')[0];
    var debounce = parseInt(input.getAttribute('data-debounce'), 10) || 200;
    var timeout = null;
    input.addEventListener('input', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        submitForm(form);
      }, debounce);
    });
    var suggestions = document.querySelectorAll('.terra .g02__suggested-link');

    var _loop = function _loop(i) {
      suggestions[i].addEventListener('click', function (event) {
        var searchTerm = suggestions[i].innerHTML;
        event.preventDefault();
        input.value = searchTerm;
        submitForm(form);
      });
    };

    for (var i = 0; i < suggestions.length; i++) {
      _loop(i);
    }
  });

  function whichTransitionEvent() {
    var el = document.createElement('fakeelement');
    var transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };
    var keys = Object.keys(transitions);

    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];

      if (el.style[key] !== undefined) {
        return transitions[key];
      }
    }

    return null;
  }
  /**
   * When clicking on the "LOAD MORE" button we have to keep the items in the container
   */


  $('body').on('click', '.terra-submit', function () {
    clearContainer = false;
    var form = $(event.target).closest('form')[0];
    submitForm(form);
  }).ready(function () {
    if (isTouchDevice()) {
      $('form.terra').addClass('is-touch');
    } // Serialize the data of the form


    lastFormData = $('form.terra').first().serialize();
  })
  /**
   * On select change (for touch devices only) we need to trigger the form submit
   * When using not touch devices this event have to be ignored, because the styled dropdown
   * will take care of emitting the signal!
   *
   * This event has also to be triggered when not using the "styled" dropdown.
   */
  .on('change', '.terra__select', function () {
    var $this = $(this);
    var $form = $this.closest('form');

    if ($form.hasClass('is-touch') || $this.hasClass('default-style')) {
      submitForm($form.get(0));
    }
  });
  /**
   * Submit the form using AJAX
   */

  $('body').on('submit', function (event) {
    submitForm(event.target, event);
  });
  /**
   * Force select reset to placeholder
   */

  $('.terra button[type="reset"]').on('click', function () {
    $('.terra__select option').each(function () {
      var isDisabled = $(this).prop('disabled');

      if (isDisabled) {
        $(this).attr('selected', 'selected');
      } else {
        $(this).removeAttr('selected');
      }
    });
  });
  /**
   * Reset the form when using <input type="reset"> button
   */
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  document.addEventListener('reset', function (event) {
    if (isIE11) {
      var currentURL = window.location.href;
      var newURL = currentURL.substring(0, currentURL.indexOf('?'));
      window.location.href = newURL + '?f=#filters';
    } else {
      clearForm(event.target);
    }
  });
})(jQuery);
