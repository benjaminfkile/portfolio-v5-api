import { Readable, ReadableOptions } from "stream"
import type { S3 } from "aws-sdk"

export class Stream extends Readable {
	_currentCursorPosition = 0
	_s3DataRange = 2048 * 1024
	_maxContentLength: number
	_s3: S3
	_s3StreamParams: S3.GetObjectRequest

	constructor(
		parameters: S3.GetObjectRequest,
		s3: S3,
		maxLength: number,
		nodeReadableStreamOptions?: ReadableOptions
	) {
		super(nodeReadableStreamOptions)
		this._maxContentLength = maxLength
		this._s3 = s3
		this._s3StreamParams = parameters
	}

	_read() {
		if (this._currentCursorPosition > this._maxContentLength) {
			this.push(null)
		} else {
			const range = this._currentCursorPosition + this._s3DataRange
			const adjustedRange =
				range < this._maxContentLength ? range : this._maxContentLength
			this._s3StreamParams.Range = `bytes=${this._currentCursorPosition}-${adjustedRange}`
			this._currentCursorPosition = adjustedRange + 1
			this._s3.getObject(this._s3StreamParams, (error, data) => {
				if (error) {
					this.destroy(error)
				} else {
					this.push(data.Body)
				}
			})
		}
	}
}
