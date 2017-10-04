import Errors from './Errors'

class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor (data) {
    this.originalData = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }
  /**
   * Fetch all relevant data for the form.
   */
  data () {
    let data = {}

    for (let property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }
  /**
   * Check if send fields are empty
   * @param obj
   */
  checkIfEmptyObject (obj) {
    var err = {}
    if (Object.keys(obj).length > 0) {
      for (var key in obj) {
        if (Object.keys(obj[key]).length === 0 && obj[key].constructor === Object) {
          err[key] = 'You must select the location'
          this.errors.record(err)
        }
      }
    }
  }

}

export default Form
