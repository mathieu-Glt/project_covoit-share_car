

export const unauthorizedPayload = (message: string,code: string,) => {
  return {
    statusCode: 401,
    time: Date.now(),
    errors: {
      stage: 'gateway',
      message,
      code
    }
  }
}

export const unauthorizedPayloadWithConditions = (message: string, code: string, conditions: any ) => {
  return {
    statusCode: 401,
    time: Date.now(),
    errors: {
      stage: 'gateway',
      message,
      code,
      conditions
    }
  }
}

