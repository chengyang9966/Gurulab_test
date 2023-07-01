import { NextFunction, Request, Response } from "express"
import { logger } from "./logger"


export const errorHandler = (error:any, request:Request, response:Response, next:NextFunction) => {
    // Error handling middleware functionality
    logger.info( `error ${error.message}`) // log the error
    logger.info('Path: ', request.path)
    logger.error(typeof error.message ==='object'?JSON.stringify(error.message):error.message)
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).send(error.message)
  }
