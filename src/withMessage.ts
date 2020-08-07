/**
 * @since 0.4.3
 */
import * as t from 'io-ts'
import { withValidate } from './withValidate'
import { mapLeft } from 'fp-ts/Either'

/**
 * Returns a clone of the given codec that sets the given string as error messsage
 *
 * @example
 * import { withMessage } from 'io-ts-types/lib/withMessage'
 * import * as t from 'io-ts'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 * import { right } from 'fp-ts/Either'
 *
 * const T = withMessage(t.number, () => 'Invalid number')
 *
 * assert.deepStrictEqual(T.decode(1), right(1))
 * assert.deepStrictEqual(PathReporter.report(T.decode(null)), ['Invalid number'])
 *
 * @since 0.4.3
 */
export function withMessage<C extends t.Any>(codec: C, message: (i: t.InputOf<C>) => string): C {
  return withValidate(codec, (i, c) =>
    mapLeft(() => [
      {
        value: i,
        context: c,
        message: message(i),
        actual: i
      }
    ])(codec.validate(i, c))
  )
}
