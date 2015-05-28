/* global describe, it */

var _ = require('lodash'),
  fs = require('fs'),
  MD = require('../')

require('chai').should()
require('tap').mochaGlobals()

describe('apidoc-md', function () {
  describe('massage', function () {
    it('creates a simplified represenataion of apidoc, suitable for embedding in md', function () {
      var md = new MD(
          JSON.parse(fs.readFileSync('./test/fixtures/doc.json'), 'utf-8')
        ),
        massaged = md.massage()

      // we should group documentation by its controllers.
      ;(Array.isArray(massaged.Stripe)).should.equal(true)

      // we should have created a simplified inner-object.
      var getStripe = _.filter(massaged.Stripe, function (o) {
        return o.title === 'fetch stripe customer'
      })[0]

      getStripe.type.should.equal('get')
      getStripe.success[0].type.should.equal('String')
      getStripe.error[0].field.should.equal('CustomerNotFound')
      getStripe.parameters[0].field.should.equal('id')
    })
  })
})
