module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  //
  // DRAW SELECTED TRUSTS (Request new account journey)
  //
  filters.drawNewAccountSelectedTrusts = function(selectedTrustsNewAccount) {

    const selectedTrustsArray = selectedTrustsNewAccount
      ? selectedTrustsNewAccount.split('|')
      : [];
  
    let html = '';
  
    if (selectedTrustsArray.length > 0) {
  
      selectedTrustsArray.forEach(function(trust, i) {
  
        html += `
          <div class="trust-row">
            <span class="nhsuk-tag nhsuk-tag--blue trust-name" style="margin-bottom: 10px;">
              ${trust}
            </span>
            <a class="remove-link" href="new-account-select-trust?removeItem=${i}">
              Remove
            </a>
          </div>
        `;
      });
  
      html += `
        <a class="nhsuk-button" style="margin-top: 20px;" href="new-account-cya">
          Continue
        </a>
      `;
  
    } else {
      html = `
        <p>
          <span class="nhsuk-tag nhsuk-tag--red">No trusts selected</span>
        </p>
      `;
    }
  
    return html;
  };
  


  //
  // DRAW SELECTED TRUSTS (Manage trust access journey)
  //
  filters.drawSelectedTrusts = function(selectedTrusts) {

    // Convert pipe-separated string into array
    const selectedTrustsArray = selectedTrusts 
    ? selectedTrusts.split('|')
    : [];
    
    let html = '';

    if (selectedTrustsArray.length > 0) {
  
      selectedTrustsArray.forEach(function(trust, i) {
  
        html += `
          <div class="trust-row">
            <span class="nhsuk-tag nhsuk-tag--blue trust-name" style="margin-bottom: 10px;">
              ${trust}
            </span>
            <a class="remove-link" href="request-access-to-other-trusts?removeItem=${i}">
              Remove
            </a>
          </div>
        `;
      });
  
      html += `
        <a class="nhsuk-button" style="margin-top: 20px;" href="cya-request-access-to-other-trusts">
          Continue
        </a>
      `;

    } else {
      html = `
        <p>
          <span class="nhsuk-tag nhsuk-tag--red">No trusts selected</span>
        </p>
      `;
    }

    return html;
  };





  //
  // DRAW SELECTED TRUSTS EXAMPLE
  //
  filters.drawSelectedTrusts = function( selectedTrusts ) {

    // Either turn the selected trusts into an array, or use an empty one...
    const selectedTrustsArray = selectedTrusts
      ? selectedTrusts.split('|')
      : [];
  
    let html = '';
    
  
    // Gonna just output this as mucky HTML 'cause I'm a wrong 'un...
    if( selectedTrustsArray.length > 0 ){
       
      selectedTrustsArray.forEach(function( trust, i ){
        html += '<p><span class="nhsuk-tag nhsuk-tag--blue nhsuk-u-margin-right-3">' + trust + '</span><a href="?removeItem='+i+'">Remove</a></p>';
       });

      html += '<a class="nhsuk-button" style="margin-top: 20px;" href="cya-request-access-to-other-trusts">Continue</a>'

    } else {
      html = '<p><span class="nhsuk-tag nhsuk-tag--red">No trusts selected</span></p>';
    }

    return html;

  };

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
