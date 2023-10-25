class FacetFilter {
  constructor(schema, data) {
    this.schema = schema;
    this.data = data;
    this.originalData = data;
    this.filters = {};
    this.tagCounts = {};
    this.sliderRanges = {};
    this.searchFields = [];
    // this.slider
    this.handleAllMissingValues();
    // this.countAllTags();
  }

  applySearchFilter(searchString) {
    // fields tells which fields we're searching in
    let searchTerms = searchString.split(' ');
    let searchResults = [];
    this.data.forEach((object) => {
      let temp = [];
      this.searchFields.forEach((field) => {
        temp.push(object[field]);
      });
      let entry = temp.join(' ');
      let match = true;
      searchTerms.forEach((term) => {
        let regex = new RegExp(term, 'i');
        if (!entry.match(regex)) {
          match = false;
        }
      });
      if (match) {
        searchResults.push(object);
      }
    });
    this.data = searchResults;
  }
  // getSearchable(fields) {
  //   let list = [];
  //   this.data.forEach((object) => {
  //     let temp = [];
  //     fields.forEach((field) => {
  //       temp.push(object[field]);
  //     });
  //     list.push(temp.join(' '));
  //   });
  // }
  handleAllMissingValues() {
    this.schema.forEach((facet) => {
      // console.log('handling missing values for :', facet.fieldName);
      this.handleMissingValuesForField(facet.fieldName, facet.fieldType);
    });
  }

  handleMissingValuesForField(field, fieldType) {
    this.data.forEach(function (object) {
      if (object[field] == (null || '') || object[field] == undefined) {
        switch (fieldType) {
          case 'string':
            console.log('was', field, object[field]);
            object[field] = 'No Data';
            console.log('now', field, object[field]);
            break;
          case 'tag':
            object[field] = [];
            break;
        }
      }
    });
  }

  setSearchFields(fields) {
    if (Array.isArray(fields)) {
      this.searchFields = fields;
    } else {
      this.searchFields = [];
    }
  }
  setFormat(format) {
    if (format) {
      this.format = format;
    } else {
      this.format = this.defaultFormat();
    }
  }

  defaultFormat() {
    let format = '';
    this.schema.forEach((schemaEntry) => {
      format += `<div class="datum">${schemaEntry.fieldName}: <%= ${schemaEntry.fieldName} %></div>`;
    });
    format = `<li class="object default">${format}</li>`;
    return format;
  }

  reset() {
    this.data = this.originalData;
    // this.format = {};
    // this.countAllTags();
  }

  addSliderRange(fieldName, min, max) {
    this.sliderRanges[fieldName] = { min, max };
  }
  // removeSliderRange(fieldName) {
  //   delete this.sliderRanges[fieldName];
  // }
  getIncludedSliderValues(fieldName, min, max) {
    let fieldSchema = this.getFacetByFieldName(fieldName);
    let arr = fieldSchema.values;
    return arr.slice(arr.indexOf(min), arr.indexOf(max) + 1);
  }
  sharesSomeValues(needle, haystack) {
    return needle.some((h) => haystack.includes(h));
  }
  addTagFilter(fieldName, value) {
    if (this.filters[fieldName] == null) {
      this.filters[fieldName] = [];
    }
    this.filters[fieldName].push(value);
  }
  removeTagFilter(fieldName, value) {
    if (this.filters[fieldName] == null) {
      return;
    }
    const index = this.filters[fieldName].indexOf(value);
    if (index > -1) {
      this.filters[fieldName].splice(index, 1);
    }
  }
  applyAllTagFilters() {
    Object.keys(this.filters).forEach((filterName) => {
      this.applyTagFilter(filterName, this.filters[filterName]);
    });
  }

  applyTextFilter(filterName, values) {
    if (typeof values == 'string') {
      values = [values];
    }
    this.data = this.data.filter((item) => {
      return values.includes(item[filterName]);
    });
  }

  applyNumberFilter(filterName, min, max) {
    this.data = this.data.filter((item) => {
      if (max != null) {
        return item[filterName] >= min && item[filterName] <= max;
      }
      return item[filterName] >= min;
    });
  }

  applyTagFilter(filterName, values) {
    if (typeof values == 'string') {
      values = [values];
    }
    this.data = this.data.filter((item) => {
      if (item[filterName] == null) {
        return false;
      }
      return values.every((value) => {
        return item[filterName].includes(value);
      });
    });
  }

  updateDataBasedOnSlider(fieldName, min, max) {
    let permittedValues = this.getIncludedSliderValues(fieldName, min, max);
    this.applySliderFilter(fieldName, permittedValues);
  }

  applySliderFilter(fieldName, permittedValues) {
    this.data = this.data.filter((item) => {
      if (!Array.isArray(item[fieldName])) {
        item[fieldName] = [item[fieldName]];
      }
      return this.sharesSomeValues(item[fieldName], permittedValues);
    });
  }
  applyAllSliderFilters() {
    // console.log('sliderranges', this.sliderRanges);
    let sliders = this.getSliderFacetNames();
    console.log('sliders', sliders);
    sliders.forEach((slider) => {
      if (this.sliderRanges[slider] != null) {
        this.updateDataBasedOnSlider(
          slider,
          this.sliderRanges[slider].min,
          this.sliderRanges[slider].max
        );
      }
    });
  }

  compareNumbers(a, b) {
    return a - b;
  }

  getKnownValues(filterName, type) {
    let values = this.data.map((item) => {
      return item[filterName];
    });
    values = values.flat();
    if (type == 'number') {
      values = values
        .filter((item) => typeof item != 'undefined')
        .sort(this.compareNumbers);
    } else {
      values.sort(this.sortNoDataToLast);
    }
    return [...new Set(values)];
  }

  sortNoDataToLast(a, b) {
    if (a == 'No Data') {
      return 1;
    } else if (b == 'No Data') {
      return -1;
    } else if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

  countAllTags() {
    this.getTagFacetNames().forEach((fieldName) => {
      this.countTags(fieldName);
    });
  }

  countTags(fieldName) {
    // console.log('countTags for:', fieldName);
    let counts = {};
    this.data.forEach((item) => {
      // console.log('item:', item);
      if (item[fieldName] == null) {
        return;
      }
      if (typeof item[fieldName] == 'string') {
        item[fieldName] = [item[fieldName]];
      }
      item[fieldName].forEach((tag) => {
        if (counts[tag] == null) {
          counts[tag] = 1;
        } else {
          counts[tag] += 1;
        }
      });
    });
    this.tagCounts[fieldName] = counts;
  }

  getFacetsByType(type) {
    let facets = [];
    this.schema.forEach((facet) => {
      if (
        facet.fieldType == type &&
        (facet.filterable == null || facet.filterable == true)
      ) {
        facets.push(facet.fieldName);
      }
    });
    return facets;
  }
  getTextFacetNames() {
    return this.getFacetsByType('string');
  }
  getNumberFacetNames() {
    return this.getFacetsByType('number');
  }
  getTagFacetNames() {
    return this.getFacetsByType('tag');
  }
  getSliderFacetNames() {
    return this.getFacetsByType('slider');
  }

  /* sorting */

  getFacetByFieldName(fieldName) {
    return this.schema.find((facet) => facet.fieldName == fieldName);
  }

  getSortableFields() {
    let sortableFields = [];
    this.schema.forEach((facet) => {
      if (facet.sortable == true) {
        sortableFields.push(facet.fieldName);
      }
    });
    return sortableFields;
  }

  getFacetByFieldName(fieldName) {
    return this.schema.find((facet) => facet.fieldName == fieldName);
  }

  getFacetLabel(fieldName) {
    let facet = this.getFacetByFieldName(fieldName);
    if (facet.fieldLabel == null) {
      return fieldName;
    }
    return facet.fieldLabel;
  }

  sortTagsByCounts(values, fieldName) {
    values.sort((a, b) => {
      return this.tagCounts[fieldName][b] - this.tagCounts[fieldName][a];
    });
  }

  sortDataByFacet(fieldName) {
    // console.log('sortDataByFacet:', fieldName);
    const facet = this.getFacetByFieldName(fieldName);
    if (facet.type == 'number') {
      this.data.sort((a, b) => a[fieldName] - b[fieldName]);
      // console.log(ff.data);
    } else {
      // console.log('not a number');
      this.data.sort((a, b) => {
        let aCopy = a[fieldName];
        let bCopy = b[fieldName];
        if (Array.isArray(aCopy)) {
          aCopy = aCopy[0];
        }
        if (Array.isArray(bCopy)) {
          bCopy = bCopy[0];
        }
        if (a[fieldName] == null) {
          aCopy = '';
        }
        if (b[fieldName] == null) {
          bCopy = '';
        }
        try {
          aCopy = aCopy.toUpperCase() || '';
          bCopy = bCopy.toUpperCase() || '';
        } catch (e) {
          // console.log('error sorting:', e);
          // console.log('a:', aCopy);
          // console.log('b:', bCopy);
        }

        if (aCopy < bCopy) {
          return -1;
        }
        if (aCopy > bCopy) {
          return 1;
        }
        return 0;
      });
    }
  }

  /* generate Facet HTML */

  generateTextFacet(fieldName) {
    const values = this.getKnownValues(fieldName, 'text');
    const fieldLabel = this.getFacetLabel(fieldName);
    let options = values.map((value) => {
      let id = fieldName + '-' + value;
      return `<span class="checkbox-set"><label for="${id}">${value}</label><input type="checkbox" class="form-check-inline" id="${id}" value="${value}" data-field="${fieldName}" checked /></span>`;
    });
    return `<fieldset class="facet" id="facet-${fieldName}" data-facet="${fieldName}" data-type="text"><legend class="facet-name">${fieldLabel}</legend><div class="facet-options">${options.join(
      ''
    )}</div></fieldset>`;
  }

  generateNumberFacet(fieldName) {
    const values = this.getKnownValues(fieldName, 'number');
    let min = values[0];
    let max = values[values.length - 1];
    let id = fieldName;
    const fieldLabel = this.getFacetLabel(fieldName);
    return `<fieldset class="facet form-group" id="facet-${fieldName}" data-facet="${fieldName}" data-type="number">
    <legend class="facet-name">${fieldLabel}</legend>
    <label for="${id}-min">Minimum</label><input class="form-control" type="number" id="${id}-min" data-field="${fieldName}" value="${min}" />
    <label for="${id}-max">Maximum</label><input class="form-control" type="number" id="${id}-max" data-field="${fieldName}" value="${max}" />
    </fieldset>`;
  }

  generateSliderHtml(fieldName) {
    const fieldLabel = this.getFacetLabel(fieldName);
    return (
      `<fieldset class="facet"><legend class="facet-name">${fieldLabel}</legend>` +
      `<div class="facet" id="facet-${fieldName}" data-facet="${fieldName}" data-type="slider"></div>` +
      `</fieldset>` +
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.6.1/nouislider.css" />'
    );
  }

  generateSliderJavaScript(fieldName) {
    let range = this.getFacetByFieldName(fieldName).values;
    let min = range[0];
    let max = range[range.length - 1];
    let valuesArray = this.getFacetByFieldName(fieldName).values;
    let js = `<script>
    var ${fieldName}Slider = document.getElementById('facet-${fieldName}');
    var valuesFor${fieldName}Slider = ${JSON.stringify(valuesArray)};

var format = {
    to: function(value) {
        return valuesFor${fieldName}Slider[Math.round(value)];
    },
    from: function (value) {
        return valuesFor${fieldName}Slider.indexOf(value);
    }
};

noUiSlider.create(${fieldName}Slider, {
    // start values are parsed by 'format'
    start: ['${min}', '${max}'],
    range: { min: 0, max: valuesFor${fieldName}Slider.length - 1 },
    step: 1,
    tooltips: true,
    format: format,
    pips: { mode: 'steps', format: format, density: 50 },
    handleAttributes: [
      { 'aria-label': '${fieldName} minimum' },
      { 'aria-label': '${fieldName} maximum' },
    ],
});

${fieldName}Slider.noUiSlider.on('change', function () {
  let values = ${fieldName}Slider.noUiSlider.get();
  let params = { facet: '${fieldName}', facetId: 'facet-${fieldName}', values: values }
  $(document).trigger('facetChange', params);
});

var activePips = [null, null];

// this section adds classes on the current pips (the ones that are selected)
// it is written expecting non-numeric values
// may need to be re-written for numeric values
${fieldName}Slider.noUiSlider.on('update', function (values, handle) {

    // Remove the active class from the current pip
    if (activePips[handle]) {
        activePips[handle].classList.remove('active-pip');
    }
    
     // Match the formatting for the pip
     var dataValue = values[handle];
     if (! isNaN(dataValue)) {
      dataValue = Math.round(dataValue);
     }

    var indexOfValue = valuesFor${fieldName}Slider.indexOf(dataValue);

     // Find the pip matching the value
    activePips[handle] = ${fieldName}Slider.querySelector('.noUi-value[data-value="' + indexOfValue + '"]');
     
    // Add the active class
    if (activePips[handle]) {
        activePips[handle].classList.add('active-pip');
    }
});


   </script>`;
    return js;
  }

  generateSliderFacet(fieldName) {
    let contents = this.generateSliderHtml(fieldName);
    // this.generateSliderCss(fieldName);
    contents += this.generateSliderJavaScript(fieldName);
    return contents;
  }

  generateTagFacet(fieldName) {
    const values = this.getKnownValues(fieldName, 'tag').filter((item) => item);
    console.log('facet values:', values);
    let html = '';
    let addClass, itemCount, removeButton, ariaPressed, holdUntilEnd;
    const fieldLabel = this.getFacetLabel(fieldName);
    if (
      this.pageConf.hasOwnProperty('sortTagsByCount') &&
      this.pageConf.sortTagsByCount == true
    ) {
      this.sortTagsByCounts(values, fieldName);
    }
    values.map((value) => {
      addClass = '';
      removeButton = '';
      ariaPressed = false;
      if (
        this.filters.hasOwnProperty(fieldName) &&
        this.filters[fieldName].includes(value)
      ) {
        addClass = 'fw-bold';
        removeButton = `<span class="remove-tag" data-facet="${fieldName}" data-value="${value}"><span class="visually-hidden">Click to remove this filter</span><i class="bi bi-x-circle text-danger"></i></span>`;
        ariaPressed = true;
      }
      itemCount = this.tagCounts[fieldName][value];
      // if (fieldName == 'No Data') {
      //   holdUntilEnd = `<li class="${addClass}"><a href="#" class="facet-tag" data-facet="${fieldName}" data-value="${value}">${value} (${itemCount})</a> ${removeButton}</li>`;
      // }
      html += `<li class="${addClass}"><a href="#" role="button" aria-pressed="${ariaPressed}" class="facet-tag btn py-0 text-start" data-facet="${fieldName}" data-value="${value}">${value} <span class="visually-hidden">filter</span> (${itemCount}) ${removeButton}</a></li>`;
    });
    // html += holdUntilEnd;
    return `<fieldset class="facet" id="facet-${fieldName}" data-facet="${fieldName}" data-type="tag"><legend class="facet-name">${fieldLabel}</legend><ul>${html}</ul></fieldset>`;
    // let options = values.map((value) => {
    //   let id = fieldName + '-' + value;
    //   return `<span class="checkbox-set"><label for="${id}">${value}</label><input type="checkbox" class="form-check-inline" id="${id}" value="${value}" data-field="${fieldName}" checked /></span>`;
    // });
    // return `<fieldset class="facet" id="facet-${fieldName}" data-facet="${fieldName}" data-type="tag"><legend class="facet-name">${fieldName}</legend><div class="facet-options">${options.join(
    //   ''
    // )}</div></fieldset>`;
  }
}
module.exports = FacetFilter;
