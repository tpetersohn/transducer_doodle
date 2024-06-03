import crypto from "node:crypto"

const shuffleArray = (ar) => {
  let arr = ar.slice(0)
  for (let i = arr.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0,i)
      {[arr[i], arr[j]] = [arr[j], arr[i]]}
    }

    return arr;
  
  };

const concat      = (xs, x)     => xs.concat(x)
    , compose     = (...fns)    => (x) => fns.reduceRight((x,f) => f(x), x)

    , isOdd       = (x)         => x % 2 !== 0
    , isEven      = (x)         => x % 2 == 0
    , upperEven   = (x)        => isEven(x.charCodeAt(0)) ? x.toUpperCase(x) : x
    , upperOdd    = (x)        => isOdd(x.charCodeAt(0)) ? x.toUpperCase(x) : x
    , isString    = (x)         => typeof x === 'string' || x instanceof String
    , isNumber    = (x)         => typeof x === 'number' || x instanceof Number
    , removeLower = (x)         => /^[A-Z]$/.test(x)
    , removeUpper = (x)         => /^[a-z]$/.test(x)
    , fillEmpty   = (x)         => /^\s*$/.test(x) ? "ø" : x
    , toString    = (x)         => isNumber(x) ? String(x) : x


    , tap         = (fn, msg)   => (rf) => (acc, x)   => {if(acc.length>=26) {fn([...acc,x], msg)}; return rf(acc,x)}
    , filterTf    = (p)         => (rf) => (acc, x)   => p(x) ? rf(acc, x) : rf(acc, " ")
    , mapTf       = (fn)        => (rf) => (acc, x)   => rf(acc,fn(x))
    , applyTf     = (fn)        => (rf) => (acc, x)   => fn(rf(acc,x))

    , xform       = compose

                    (

                      tap(console.log, "before toString"),
                      mapTf(toString),
                      tap(console.log, "before upperOdd"),
                      mapTf(upperOdd),
                      tap(console.log, "before removeUpper"),
                      filterTf(removeLower),
                      tap(console.log, "before fillEmpty"),
                      mapTf(fillEmpty),
                      tap(console.log, "before shuffle"),
                      applyTf(shuffleArray),
         
                    )

    , transduce   = (xf, rf, init, xs) => xs.reduce(xf(rf), init)

console.log(transduce(xform,concat,[],Array.from({length:26}, (_,i) => String.fromCharCode(i + 97)).concat(Number(5) )))