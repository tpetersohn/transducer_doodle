import crypto from "node:crypto"

const shuffleArray = (ar) => {
  let arr = ar.slice(0)
  for (let i = arr.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0,ar.length)
      {[arr[i], arr[j]] = [arr[j], arr[i]]}
    }
    return arr;
};

const concat      = (xs, x)     => xs.concat(x)
    , compose     = (...fns)    => (x) => fns.reduceRight((x,f) => f(x), x)

    , isOdd       = (x)         => x % 2 !== 0
    , isEven      = (x)         => x % 2 == 0
    , upperEven   = (x)         => isEven(x.charCodeAt(0)) ? x.toUpperCase(x) : x
    , upperOdd    = (x)         => isOdd(x.charCodeAt(0)) ? x.toUpperCase(x) : x
    , isString    = (x)         => typeof x === 'string' || x instanceof String
    , isNumber    = (x)         => typeof x === 'number' || x instanceof Number
    , removeLower = (x)         => /^[A-Z]$/.test(x)
    , removeUpper = (x)         => /^[a-z]$/.test(x)
    , fillEmpty   = (x)         => /^\s*$/.test(x) ? "ø" : x
    , toString    = (x)         => isNumber(x) ? String(x) : x

    // Create objects to store intermediate results
    , intermediateResults = {

        init: [],
        afterToString: [],
        afterUpperOdd: [],
        afterRemoveLower: [],
        afterFillEmpty: [],
        afterShuffle: []
        
      }

    , tap         = (fn, stage) => (rf) => (acc, x)   => {fn(x, stage); return rf(acc,x)}
    , filterTf    = (p)         => (rf) => (acc, x)   => p(x) ? rf(acc, x) : rf(acc, " ")
    , mapTf       = (fn)        => (rf) => (acc, x)   => rf(acc,fn(x))

    , xform       = compose(

                      tap((x, stage) => intermediateResults[stage].push(x), "init"),
                      mapTf(toString),
                      tap((x, stage) => intermediateResults[stage].push(x), "afterToString"),
                      mapTf(upperOdd),
                      tap((x, stage) => intermediateResults[stage].push(x), "afterUpperOdd"),
                      filterTf(removeLower),
                      tap((x, stage) => intermediateResults[stage].push(x), "afterRemoveLower"),
                      mapTf(fillEmpty),
                      tap((x, stage) => intermediateResults[stage].push(x), "afterFillEmpty")

                    )

    , transduce   = (xf, rf, init, xs) => xs.reduce(xf(rf), init)

const result = transduce(xform, concat, [], Array.from({length:26}, (_,i) => String.fromCharCode(i + 97)).concat(Number(5)))

// Shuffle the final result
const shuffledResult = shuffleArray(result)
intermediateResults.afterShuffle = shuffledResult

// Output intermediate results
console.log("init:", intermediateResults.init)
console.log("after toString:", intermediateResults.afterToString)
console.log("after upperOdd:", intermediateResults.afterUpperOdd)
console.log("after removeLower:", intermediateResults.afterRemoveLower)
console.log("after fillEmpty:", intermediateResults.afterFillEmpty)
console.log("after shuffle:", intermediateResults.afterShuffle)