import { OmitType } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/createUser.dto'

export class AuthRegistrationDto extends OmitType(CreateUserDto, ['activationLink']) {}
