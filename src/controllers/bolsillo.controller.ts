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
import {Bolsillo} from '../models';
import {BolsilloRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class BolsilloController {
  constructor(
    @repository(BolsilloRepository)
    public bolsilloRepository : BolsilloRepository,
  ) {}

  @post('/bolsillos')
  @response(200, {
    description: 'Bolsillo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bolsillo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bolsillo, {
            title: 'NewBolsillo',
            exclude: ['id'],
          }),
        },
      },
    })
    bolsillo: Omit<Bolsillo, 'id'>,
  ): Promise<Bolsillo> {
    return this.bolsilloRepository.create(bolsillo);
  }

  @get('/bolsillos/count')
  @response(200, {
    description: 'Bolsillo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bolsillo) where?: Where<Bolsillo>,
  ): Promise<Count> {
    return this.bolsilloRepository.count(where);
  }

  @get('/bolsillos')
  @response(200, {
    description: 'Array of Bolsillo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bolsillo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bolsillo) filter?: Filter<Bolsillo>,
  ): Promise<Bolsillo[]> {
    return this.bolsilloRepository.find(filter);
  }

  @patch('/bolsillos')
  @response(200, {
    description: 'Bolsillo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bolsillo, {partial: true}),
        },
      },
    })
    bolsillo: Bolsillo,
    @param.where(Bolsillo) where?: Where<Bolsillo>,
  ): Promise<Count> {
    return this.bolsilloRepository.updateAll(bolsillo, where);
  }

  @get('/bolsillos/{id}')
  @response(200, {
    description: 'Bolsillo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bolsillo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bolsillo, {exclude: 'where'}) filter?: FilterExcludingWhere<Bolsillo>
  ): Promise<Bolsillo> {
    return this.bolsilloRepository.findById(id, filter);
  }

  @patch('/bolsillos/{id}')
  @response(204, {
    description: 'Bolsillo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bolsillo, {partial: true}),
        },
      },
    })
    bolsillo: Bolsillo,
  ): Promise<void> {
    await this.bolsilloRepository.updateById(id, bolsillo);
  }

  @put('/bolsillos/{id}')
  @response(204, {
    description: 'Bolsillo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bolsillo: Bolsillo,
  ): Promise<void> {
    await this.bolsilloRepository.replaceById(id, bolsillo);
  }

  @del('/bolsillos/{id}')
  @response(204, {
    description: 'Bolsillo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bolsilloRepository.deleteById(id);
  }
}
