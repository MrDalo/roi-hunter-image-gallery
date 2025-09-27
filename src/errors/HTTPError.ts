export class HTTPError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HTTPError'
    this.status = status
  }

  static fromResponse(response: Response, customMessage?: string): HTTPError {
    const message = customMessage || `HTTP ${response.status}: ${response.statusText}`
    return new HTTPError(message, response.status)
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500
  }

  isServerError(): boolean {
    return this.status >= 500
  }
}