import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DisenoTarjeta} from '../models';
import {DisenoTarjetaRepository} from '../repositories';

export class DisenoTarjetaController {
  constructor(
    @repository(DisenoTarjetaRepository)
    public disenoTarjetaRepository : DisenoTarjetaRepository,
  ) {}

  @post('/diseno-tarjetas')
  @response(200, {
    description: 'DisenoTarjeta model instance',
    content: {'application/json': {schema: getModelSchemaRef(DisenoTarjeta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DisenoTarjeta, {
            title: 'NewDisenoTarjeta',
            exclude: ['id'],
          }),
        },
      },
    })
    disenoTarjeta: Omit<DisenoTarjeta, 'id'>,
  ): Promise<DisenoTarjeta> {
    return this.disenoTarjetaRepository.create(disenoTarjeta);
  }

  @get('/diseno-tarjetas/count')
  @response(200, {
    description: 'DisenoTarjeta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DisenoTarjeta) where?: Where<DisenoTarjeta>,
  ): Promise<Count> {
    return this.disenoTarjetaRepository.count(where);
  }

  @get('/diseno-tarjetas')
  @response(200, {
    description: 'Array of DisenoTarjeta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DisenoTarjeta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DisenoTarjeta) filter?: Filter<DisenoTarjeta>,
  ): Promise<DisenoTarjeta[]> {
    return this.disenoTarjetaRepository.find(filter);
  }

  @patch('/diseno-tarjetas')
  @response(200, {
    description: 'DisenoTarjeta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DisenoTarjeta, {partial: true}),
        },
      },
    })
    disenoTarjeta: DisenoTarjeta,
    @param.where(DisenoTarjeta) where?: Where<DisenoTarjeta>,
  ): Promise<Count> {
    return this.disenoTarjetaRepository.updateAll(disenoTarjeta, where);
  }

  @get('/diseno-tarjetas/{id}')
  @response(200, {
    description: 'DisenoTarjeta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DisenoTarjeta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DisenoTarjeta, {exclude: 'where'}) filter?: FilterExcludingWhere<DisenoTarjeta>
  ): Promise<DisenoTarjeta> {
    return this.disenoTarjetaRepository.findById(id, filter);
  }

  @patch('/diseno-tarjetas/{id}')
  @response(204, {
    description: 'DisenoTarjeta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DisenoTarjeta, {partial: true}),
        },
      },
    })
    disenoTarjeta: DisenoTarjeta,
  ): Promise<void> {
    await this.disenoTarjetaRepository.updateById(id, disenoTarjeta);
  }

  @put('/diseno-tarjetas/{id}')
  @response(204, {
    description: 'DisenoTarjeta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() disenoTarjeta: DisenoTarjeta,
  ): Promise<void> {
    await this.disenoTarjetaRepository.replaceById(id, disenoTarjeta);
  }

  @del('/diseno-tarjetas/{id}')
  @response(204, {
    description: 'DisenoTarjeta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.disenoTarjetaRepository.deleteById(id);
  }
}
