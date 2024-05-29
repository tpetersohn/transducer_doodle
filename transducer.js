const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      {[arr[i], arr[j]] = [arr[j], arr[i]]}
    }
    return arr
  };

const concat      = (xs, x)     => xs.concat(x)
    , compose     = (...fns)    => (x) => fns.reduce((x,f) => f(x), x)

    , isOdd       = (x)         => x % 2 !== 0
    , isEven      = (x)         => x % 2 == 0
    , toUpper     = (x)         => isEven(x.charCodeAt(0)) ? x.toLowerCase(x) : x.toUpperCase(x)
    , toLower     = (x)         => isOdd(x.charCodeAt(0)) ? x.toLowerCase(x) : x.toUpperCase(x)
    , isString    = (x)         => x.constructor == String
    , isNumber    = (x)         => x.constructor == Number
    , removeLower = (x)         => /^[A-Z]$/.test(x)
    , removeUpper = (x)         => /^[a-z]$/.test(x)
    , fillEmpty   = (x)         => x === " " ? "ø" : x
    , toString    = (x)         => isNumber(x) ? x = String(x) : x


    , identityTf  = (fn)        => (op) => (acc, x)    => {fn(x); return op(acc,x)}
    , filterTf    = (p)         => (op) => (acc, x)   => p(x) ? op(acc, x) : op(acc, " ")
    , mapTf       = (fn)        => (op) => (acc, x)   => op(acc, fn(x))
    , applyTf     = (fn)        => (op) => (acc, xs)  => {return fn(op(acc, xs))}

    , xform       = compose(applyTf(shuffleArray), mapTf(fillEmpty), filterTf(removeLower), mapTf(toUpper), mapTf(toString))
    , transduce   = (xf, rf, init, xs) => xs.reduce(xf(rf), init)

console.log(transduce(xform,concat,[],Array.from({length:26}, (_,i) => String.fromCharCode(i + 97)).concat(Number(7) )))