import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Nota} from '../models';
import {NotaRepository} from '../repositories';

export class NotaController {
  constructor(
    @repository(NotaRepository)
    public notaRepository : NotaRepository,
  ) {}

@authenticate('jwt')
  @post('/notas')
  @response(200, {
    description: 'Nota model instance',
    content: {'application/json': {schema: getModelSchemaRef(Nota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nota, {
            title: 'NewNota',
            exclude: ['id'],
          }),
        },
      },
    })
    nota: Omit<Nota, 'id'>,
  ): Promise<Nota> {
    return this.notaRepository.create(nota);
  }

  @authenticate('jwt')
  @get('/notas/count')
  @response(200, {
    description: 'Nota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Nota) where?: Where<Nota>,
  ): Promise<Count> {
    return this.notaRepository.count(where);
  }

  @authenticate('jwt')
  @get('/notas')
  @response(200, {
    description: 'Array of Nota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Nota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Nota) filter?: Filter<Nota>,
  ): Promise<Nota[]> {
    return this.notaRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/notas')
  @response(200, {
    description: 'Nota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nota, {partial: true}),
        },
      },
    })
    nota: Nota,
    @param.where(Nota) where?: Where<Nota>,
  ): Promise<Count> {
    return this.notaRepository.updateAll(nota, where);
  }

  @authenticate('jwt')
  @get('/notas/{id}')
  @response(200, {
    description: 'Nota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Nota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Nota, {exclude: 'where'}) filter?: FilterExcludingWhere<Nota>
  ): Promise<Nota> {
    return this.notaRepository.findById(id, filter);
  }


  @get('/notas/public/{id}')
  @response(200, {
    description: 'Nota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Nota, {includeRelations: true}),
      },
    },
  })
  async findById2(
    @param.path.string('id') id: string,
    @param.filter(Nota, {exclude: 'where'}) filter?: FilterExcludingWhere<Nota>
  ): Promise<Nota> {
    return this.notaRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/notas/{id}')
  @response(204, {
    description: 'Nota PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nota, {partial: true}),
        },
      },
    })
    nota: Nota,
  ): Promise<void> {
    await this.notaRepository.updateById(id, nota);
  }

  @authenticate('jwt')
  @put('/notas/{id}')
  @response(204, {
    description: 'Nota PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() nota: Nota,
  ): Promise<void> {
    await this.notaRepository.replaceById(id, nota);
  }

  @authenticate('jwt')
  @del('/notas/{id}')
  @response(204, {
    description: 'Nota DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.notaRepository.deleteById(id);
  }

  @authenticate('jwt')
  @get('/notas/buscar', {
      responses: {
        '200': {
          description: 'Array of User model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Nota, { includeRelations: true }),
              },
            },
          },
        },
      },
    })
    async search(
      @param.query.string('query') query: string,
      @param.query.object('filter', getFilterSchemaFor(Nota))
      filter?: Filter<Nota>,
    ): Promise<Nota[]> {
      const where: Where<Nota> = {
        or: [
          { titulo: { regexp: new RegExp(query, 'i') }  },
          { texto: { regexp: new RegExp(query, 'i') }  },
        ],
      };

      return this.notaRepository.find({ where, ...filter });
    }
  }

