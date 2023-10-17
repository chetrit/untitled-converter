import fs from 'fs'
import yaml from 'yaml'

import logger from '@middlewares/logging'

import swaggerSpec from '@config/swaggerConfig'

export function generateSwaggerDoc (outputFilePath): void {
  const yamlString = yaml.stringify(swaggerSpec)

  fs.writeFile(outputFilePath, yamlString, (err) => {
    if (err != null) {
      logger.error('Error writing Swagger YAML file:', err)
    } else {
      logger.info('Swagger YAML file generated:', outputFilePath)
    }
  })
}
