import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { UserService } from './user.service'
import { PaginatedResult } from 'interfaces/paginated-result.interface'
import { User } from 'entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { isFileExtensionSafe, removeFile, saveImageToStorage } from 'helpers/imageStorage'
import { join } from 'path'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page: number): Promise<PaginatedResult> {
    return this.userService.paginate(page)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  @Patch('upload/:id')
  @UseInterceptors(FileInterceptor('avatar', saveImageToStorage))
  @HttpCode(HttpStatus.CREATED)
  async upload(@UploadedFile() file: Express.Multer.File, @Param('id') id: string): Promise<User> {
    const filename = file?.filename
    if (!filename) throw new BadRequestException('file must be valid')
    const imageFolderPath = join(process.cwd(), 'file')
    const fullFilePath = join(imageFolderPath + '/' + file.fieldname)
    if (await isFileExtensionSafe(fullFilePath)) {
      return this.userService.updateUserImageId(id, filename)
    }
    removeFile(fullFilePath)
    throw new BadRequestException('Bad imga')
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id)
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Param('email') email: string): Promise<User | undefined> {
    return this.userService.findByEmail(email)
  }
}
