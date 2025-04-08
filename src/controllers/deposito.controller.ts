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
import {Deposito} from '../models';
import {DepositoRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class DepositoController {
  constructor(
    @repository(DepositoRepository)
    public depositoRepository : DepositoRepository,
  ) {}

  @post('/depositos')
  @response(200, {
    description: 'Deposito model instance',
    content: {'application/json': {schema: getModelSchemaRef(Deposito)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deposito, {
            title: 'NewDeposito',
            exclude: ['id'],
          }),
        },
      },
    })
    deposito: Omit<Deposito, 'id'>,
  ): Promise<Deposito> {
    return this.depositoRepository.create(deposito);
  }

  @get('/depositos/count')
  @response(200, {
    description: 'Deposito model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Deposito) where?: Where<Deposito>,
  ): Promise<Count> {
    return this.depositoRepository.count(where);
  }

  @get('/depositos')
  @response(200, {
    description: 'Array of Deposito model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Deposito, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Deposito) filter?: Filter<Deposito>,
  ): Promise<Deposito[]> {
    return this.depositoRepository.find(filter);
  }

  @patch('/depositos')
  @response(200, {
    description: 'Deposito PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deposito, {partial: true}),
        },
      },
    })
    deposito: Deposito,
    @param.where(Deposito) where?: Where<Deposito>,
  ): Promise<Count> {
    return this.depositoRepository.updateAll(deposito, where);
  }

  @get('/depositos/{id}')
  @response(200, {
    description: 'Deposito model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deposito, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Deposito, {exclude: 'where'}) filter?: FilterExcludingWhere<Deposito>
  ): Promise<Deposito> {
    return this.depositoRepository.findById(id, filter);
  }

  @patch('/depositos/{id}')
  @response(204, {
    description: 'Deposito PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deposito, {partial: true}),
        },
      },
    })
    deposito: Deposito,
  ): Promise<void> {
    await this.depositoRepository.updateById(id, deposito);
  }

  @put('/depositos/{id}')
  @response(204, {
    description: 'Deposito PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() deposito: Deposito,
  ): Promise<void> {
    await this.depositoRepository.replaceById(id, deposito);
  }

  @del('/depositos/{id}')
  @response(204, {
    description: 'Deposito DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.depositoRepository.deleteById(id);
  }
}
