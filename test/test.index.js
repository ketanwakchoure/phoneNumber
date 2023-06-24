import { formatNumber, clearValues } from '../src/index.js'
import should from 'should'

describe('Testing the phone number input', () => {
  const events = {
    target: {
      value: ''
    }
  }

  afterEach(function (done) {
    clearValues()
    done()
  })

  it('should give proper output for input string length between 0 to 2.', function(done) {
    events.target.value = '12'
    formatNumber(events)
    events.target.value.should.equal('12')
    done()
  })

  it('should give proper output for input string length between 3 to 6.', function(done) {
    events.target.value = '1234'
    formatNumber(events)
    events.target.value.should.equal('(123) 4')
    done()
  })

  it('should give proper output for input string length above 6 less than 10.', function(done) {
    events.target.value = '1234567'
    formatNumber(events)
    events.target.value.should.equal('(123) 456-7')
    done()
  })

  it('should give proper output for input string length above 6 less than 10.', function(done) {
    events.target.value = '12345678901'
    formatNumber(events)
    events.target.value.should.equal('(123) 456-7890')
    done()
  })

  it('should give proper formatted output if the input string is removed from center.', function(done) {
    events.target.value = '12345678901'
    formatNumber(events)
    events.target.value.should.equal('(123) 456-7890')
    events.target.value = '1290'
    formatNumber(events)
    events.target.value.should.equal('(129) 0')
    done()
  })

  it('should not allow any character except numbers.', function(done) {
    events.target.value = '1290'
    formatNumber(events)
    events.target.value.should.equal('(129) 0')
    events.target.value = '(129) 0a'
    formatNumber(events)
    events.target.value.should.equal('(129) 0')
    done()
  })

  it('should format even if multiple character are added in middle.', function(done) {
    events.target.value = '123456'
    formatNumber(events)
    events.target.value.should.equal('(123) 456')
    events.target.value = '(123) 789456'
    formatNumber(events)
    events.target.value.should.equal('(123) 789-456')
    done()
  })
})
