import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // create a new wish
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto, req.user.id);
  }

  // find all wishes
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishesService.findAll();
  }
// find last wishes (40)
  @Get('last')
  async findLastWishes() {
    const lastWishes = await this.wishesService.findLastWishes();
    return lastWishes;
  }
//find the most popular wishes (20)
  @Get('top')
  async findTopWish() {
    const topWishes = await this.wishesService.findTopWishes();
    return topWishes;
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException('Переданный id не явялется числом');
    }    
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateOne(@Param('id') id: string, @Req() req, @Body() updateWishDto: UpdateWishDto) {
    if (isNaN(+id)) {
      return new BadRequestException('Переданный id не явялется числом');
    }
    return this.wishesService.updateOne(+id, req.user.id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copyLikedWish(@Req() req, @Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException('Переданный id не явялется числом');
    }
    return this.wishesService.copyLikedWish(+id, req.user.id);
  }

  // delete wish
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException('Переданный id не явялется числом');
    }
    return this.wishesService.remove(+id);
  }
}
