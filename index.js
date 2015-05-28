var _ = require('lodash'),
  fs = require('fs'),
  handlebars = require('handlebars')

function APIDocMD (apidoc, opts) {
  _.extend(this, opts)
  this.apidoc = apidoc
}

APIDocMD.prototype.massage = function () {
  // group our API listing by the title of each API.
  var _this = this,
    obj = _.groupBy(this.apidoc, 'groupTitle')

  // reduce to the keys we actually care about.
  Object.keys(obj).forEach(function (key) {
    obj[key] = _.map(obj[key], function (o) {
      o = _.pick(o, ['type', 'url', 'title',
        'fields', 'success', 'error', 'parameter'])

      // turn success, error, and parameter into
      // plain-old-arrays:
      o.success = _this._massageResponseFields(o.success)
      o.error = _this._massageResponseFields(o.error)

      o.parameters = _this._massageParameters(o.parameter)
      delete o.parameter

      return o
    })
  })

  return obj
}

APIDocMD.prototype._massageResponseFields = function (response) {
  if (!response || !response.fields) return []

  return _.map(_.values(response.fields)[0], function (o) {
    return {
      field: (o.field || ''),
      type: (o.type || '').replace(/(<p>)|(<\/p> ?)/g, ''),
      description: (o.description || '').replace(/(<p>)|(<\/p> ?)/g, '')
    }
  })
}

APIDocMD.prototype._massageParameters = function (parameters) {
  if (!parameters || !parameters.fields || !parameters.fields.Parameter) return []

  return _.map(parameters.fields.Parameter, function (o) {
    return {
      type: (o.type || '').replace(/(<p>)|(<\/p> ?)/g, ''),
      field: o.field || '',
      description: (o.description || '').replace(/(<p>)|(<\/p> ?)/g, '')
    }
  })
}

APIDocMD.prototype.writeTemplate = function (done) {
  var t = handlebars.compile(fs.readFileSync(this.template, 'utf-8'))
  fs.writeFileSync(this.output, t({api: this.massage()}), 'utf-8')
  done()
}

module.exports = APIDocMD
