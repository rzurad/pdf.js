/* globals Stream, PredictorStream, Dict */

'use strict';

describe('stream', function() {
  beforeEach(function() {
    jasmine.addMatchers({
      toMatchTypedArray: function(util, customEqualityTesters) {
        return {
          compare: function (actual, expected) {
            var result = {};
            if (actual.length !== expected.length) {
              result.pass = false;
              result.message = 'Array length: ' + actual.length +
                ', expected: ' + expected.length;
              return result;
            }
            result.pass = true;
            for (var i = 0, ii = expected.length; i < ii; i++) {
              var a = actual[i], b = expected[i];
              if (a !== b) {
                result.pass = false;
                break;
              }
            }
            return result;
          }
        };
      }
    });
  });
  describe('PredictorStream', function() {
    it('should decode simple predictor data', function() {
      var dict = new Dict();
      dict.set('Predictor', 12);
      dict.set('Colors', 1);
      dict.set('BitsPerComponent', 8);
      dict.set('Columns', 2);

      var input = new Stream(new Uint8Array([2, 100, 3, 2, 1, 255, 2, 1, 255]),
                             0, 9, dict);
      var predictor = new PredictorStream(input, /* length = */ 9, dict);
      var result = predictor.getBytes(6);

      expect(result).toMatchTypedArray(
        new Uint8Array([100, 3, 101, 2, 102, 1])
      );
    });
  });
});
